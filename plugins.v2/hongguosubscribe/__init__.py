import datetime
import difflib
import fcntl
import functools
import html
import json
import os
import re
import traceback
from threading import Event
from typing import Tuple, List, Dict, Any

import pytz
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from app import schemas
from app.chain.download import DownloadChain
from app.chain.search import SearchChain
from app.chain.subscribe import SubscribeChain
from app.core.config import settings
from app.core.metainfo import MetaInfo
from app.domain.context import MediaInfo
from app.log import logger
from app.plugins import _PluginBase
from app.schemas.types import MediaType
from app.utils.http import RequestUtils


def _single_instance(func):
    """
    跨进程互斥装饰器：同一时刻只允许一个插件实例执行，
    防止插件被多次初始化/调度时并发运行导致重复下载与历史互相覆盖。
    """

    @functools.wraps(func)
    def wrapper(self, *args, **kwargs):
        lock_path = os.path.join(settings.CONFIG_PATH, "hongguosubscribe.lock")
        lock_fd = None
        try:
            lock_fd = open(lock_path, "w")
            fcntl.flock(lock_fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError:
            logger.info("红果短剧订阅已有实例正在运行，本轮跳过")
            if lock_fd:
                lock_fd.close()
            return
        try:
            return func(self, *args, **kwargs)
        finally:
            try:
                fcntl.flock(lock_fd, fcntl.LOCK_UN)
            except Exception:
                pass
            lock_fd.close()

    return wrapper


class HongGuoSubscribe(_PluginBase):
    # 插件名称
    plugin_name = "红果短剧订阅"
    # 插件描述
    plugin_desc = "定时从红果短剧网站获取短剧榜单，自动搜索并下载或订阅短剧"
    # 插件图标
    plugin_icon = "hongguo.png"
    # 插件版本
    plugin_version = "1.0.3"
    # 插件作者
    plugin_author = "shmglang"
    # 作者主页
    author_url = "https://github.com/shmglang"
    # 插件配置项ID前缀
    plugin_config_prefix = "hongguosubscribe_"
    # 加载顺序
    plugin_order = 7
    # 可使用的用户级别
    auth_level = 2

    # 退出事件
    _event = Event()
    # 私有属性
    _scheduler = None
    _enabled = False
    _proxy = False
    _onlyonce = False
    _cron = ""
    _action = "auto"
    _base_url = "https://hongguoduanju.com"
    _ranks = []
    _rss_addrs = []
    _min_heat = 0.0
    _min_vote = 0.0
    _title_blacklist = []
    _clear = False
    _clearflag = False

    # 内置榜单地址（红果短剧官网）
    _rank_address = {
        "hot-drama": "/rank/hot-drama",          # 短剧热播榜
        "hot-real": "/rank/hot-real-drama",      # 真人剧热播榜
        "hot-comic": "/rank/hot-comic-drama",    # 漫剧热播榜
        "hot-ai": "/rank/hot-ai-drama",          # AI剧热播榜
    }

    def init_plugin(self, config: dict = None):

        if config:
            self._enabled = config.get("enabled")
            self._proxy = config.get("proxy")
            self._onlyonce = config.get("onlyonce")
            self._cron = config.get("cron")
            self._action = config.get("action") or "auto"
            self._base_url = config.get("base_url") or "https://hongguoduanju.com"
            self._ranks = config.get("ranks") or []
            rss_addrs = config.get("rss_addrs")
            if rss_addrs:
                if isinstance(rss_addrs, str):
                    self._rss_addrs = [
                        addr.strip()
                        for addr in rss_addrs.split("\n")
                        if addr.strip()
                    ]
                else:
                    self._rss_addrs = rss_addrs
            else:
                self._rss_addrs = []
            try:
                self._min_heat = float(config.get("min_heat") or 0)
            except (ValueError, TypeError):
                self._min_heat = 0.0
            try:
                self._min_vote = float(config.get("min_vote") or 0)
            except (ValueError, TypeError):
                self._min_vote = 0.0
            # 加载标题黑名单
            title_blacklist_str = config.get("title_blacklist")
            if title_blacklist_str:
                if isinstance(title_blacklist_str, str):
                    self._title_blacklist = [
                        keyword.strip()
                        for keyword in title_blacklist_str.split(",")
                        if keyword.strip()
                    ]
                else:
                    self._title_blacklist = title_blacklist_str
            else:
                self._title_blacklist = []
            self._clear = config.get("clear")

        # 停止现有任务
        self.stop_service()

        # 启动服务
        if self._enabled or self._onlyonce:
            if self._onlyonce:
                self._scheduler = BackgroundScheduler(timezone=settings.TZ)
                logger.info("红果短剧订阅服务启动，立即运行一次")
                self._scheduler.add_job(
                    func=self.__refresh,
                    trigger="date",
                    run_date=datetime.datetime.now(tz=pytz.timezone(settings.TZ))
                    + datetime.timedelta(seconds=3),
                )

                if self._scheduler.get_jobs():
                    # 启动服务
                    self._scheduler.print_jobs()
                    self._scheduler.start()

            # 定时任务
            if self._enabled and self._cron:
                self._scheduler = BackgroundScheduler(timezone=settings.TZ)
                try:
                    self._scheduler.add_job(
                        func=self.__refresh,
                        trigger=CronTrigger.from_crontab(self._cron),
                    )
                    if self._scheduler.get_jobs():
                        self._scheduler.print_jobs()
                        self._scheduler.start()
                except Exception as e:
                    logger.error(f"定时任务配置错误：{e}")

            if self._onlyonce or self._clear:
                # 关闭一次性开关
                self._onlyonce = False
                # 记录缓存清理标志
                self._clearflag = self._clear
                # 关闭清理缓存
                self._clear = False
                # 保存配置
                self.__update_config()

    def get_state(self) -> bool:
        return self._enabled

    @staticmethod
    def get_command() -> List[Dict[str, Any]]:
        pass

    def get_api(self) -> List[Dict[str, Any]]:
        """
        获取插件API
        """
        return [
            {
                "path": "/delete_history",
                "endpoint": self.delete_history,
                "methods": ["GET"],
                "summary": "删除一条历史记录",
            }
        ]

    def get_form(self) -> Tuple[List[dict], Dict[str, Any]]:
        """
        拼装插件配置页面，需要返回两块数据：新增配置、修改配置
        """
        # 编历选项
        action_options = [
            {"title": "自动（先订阅，识别失败回退搜索下载）", "value": "auto"},
            {"title": "仅搜索下载", "value": "search"},
            {"title": "仅添加订阅", "value": "subscribe"},
        ]
        # 榜单选项
        rank_options = [
            {"title": "短剧热播榜", "value": "hot-drama"},
            {"title": "真人剧热播榜", "value": "hot-real"},
            {"title": "漫剧热播榜", "value": "hot-comic"},
            {"title": "AI剧热播榜", "value": "hot-ai"},
        ]
        # 表单
        form = [
            {
                "component": "VForm",
                "content": [
                    # 开关
                    {
                        "component": "VRow",
                        "content": [
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VSwitch",
                                        "props": {
                                            "model": "enabled",
                                            "label": "启用插件",
                                        },
                                    }
                                ],
                            },
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VSwitch",
                                        "props": {
                                            "model": "proxy",
                                            "label": "使用代理服务器",
                                        },
                                    }
                                ],
                            },
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VSwitch",
                                        "props": {
                                            "model": "onlyonce",
                                            "label": "立即运行一次",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                    # 周期 / 处理方式 / 数据源
                    {
                        "component": "VRow",
                        "content": [
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VCronField",
                                        "props": {
                                            "model": "cron",
                                            "label": "执行周期",
                                            "placeholder": "5位cron表达式，留空自动",
                                        },
                                    }
                                ],
                            },
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VSelect",
                                        "props": {
                                            "model": "action",
                                            "label": "处理方式",
                                            "items": action_options,
                                        },
                                    }
                                ],
                            },
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VTextField",
                                        "props": {
                                            "model": "base_url",
                                            "label": "红果短剧网站地址",
                                            "placeholder": "https://hongguoduanju.com",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                    # 监控榜单
                    {
                        "component": "VRow",
                        "content": [
                            {
                                "component": "VCol",
                                "content": [
                                    {
                                        "component": "VSelect",
                                        "props": {
                                            "chips": True,
                                            "multiple": True,
                                            "model": "ranks",
                                            "label": "监控榜单",
                                            "items": rank_options,
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                    # 自定义榜单地址
                    {
                        "component": "VRow",
                        "content": [
                            {
                                "component": "VCol",
                                "content": [
                                    {
                                        "component": "VTextarea",
                                        "props": {
                                            "model": "rss_addrs",
                                            "label": "自定义榜单地址",
                                            "placeholder": "每行一个完整URL，将附加到内置榜单后，如 https://hongguoduanju.com/rank/hot-drama",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                    # 过滤条件
                    {
                        "component": "VRow",
                        "content": [
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VTextField",
                                        "props": {
                                            "model": "min_heat",
                                            "label": "最小热度（万）",
                                            "placeholder": "0表示不限制",
                                        },
                                    }
                                ],
                            },
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VTextField",
                                        "props": {
                                            "model": "min_vote",
                                            "label": "最小评分",
                                            "placeholder": "0表示不限制",
                                        },
                                    }
                                ],
                            },
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VTextField",
                                        "props": {
                                            "model": "title_blacklist",
                                            "label": "标题黑名单",
                                            "placeholder": "逗号分隔，命中则跳过",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                    # 清理历史
                    {
                        "component": "VRow",
                        "content": [
                            {
                                "component": "VCol",
                                "props": {"cols": 12, "md": 4},
                                "content": [
                                    {
                                        "component": "VSwitch",
                                        "props": {
                                            "model": "clear",
                                            "label": "清理历史记录",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                ],
            }
        ]
        # 配置
        config = {
            "enabled": False,
            "proxy": False,
            "onlyonce": False,
            "cron": "",
            "action": "auto",
            "base_url": "https://hongguoduanju.com",
            "ranks": ["hot-drama", "hot-real"],
            "rss_addrs": "",
            "min_heat": "",
            "min_vote": "",
            "title_blacklist": "",
            "clear": False,
        }
        return form, config

    def get_page(self) -> List[dict]:
        """
        拼装插件详情页面，需要返回页面配置，同时附带数据
        """
        # 查询历史记录
        historys = self.get_data("history")
        if not historys:
            return [
                {
                    "component": "div",
                    "text": "暂无数据",
                    "props": {
                        "class": "text-center",
                    },
                }
            ]
        # 数据按时间降序排序
        historys = sorted(historys, key=lambda x: x.get("time"), reverse=True)
        # 拼装页面
        contents = []
        for history in historys:
            title = history.get("title")
            time_str = history.get("time")
            action = history.get("action")
            heat = history.get("heat")
            vote = history.get("vote")
            series_id = history.get("series_id")
            contents.append(
                {
                    "component": "VCard",
                    "content": [
                        {
                            "component": "VDialogCloseBtn",
                            "props": {
                                "innerClass": "absolute top-0 right-0",
                            },
                            "events": {
                                "click": {
                                    "api": "plugin/HongGuoSubscribe/delete_history",
                                    "method": "get",
                                    "params": {
                                        "key": f"hongguosubscribe: {series_id}",
                                        "apikey": settings.API_TOKEN,
                                    },
                                }
                            },
                        },
                        {
                            "component": "div",
                            "props": {
                                "class": "d-flex justify-space-start flex-nowrap flex-row",
                            },
                            "content": [
                                {
                                    "component": "div",
                                    "content": [
                                        {
                                            "component": "VCardTitle",
                                            "props": {
                                                "class": "ps-1 pe-5 break-words whitespace-break-spaces"
                                            },
                                            "text": title,
                                        },
                                        {
                                            "component": "VCardText",
                                            "props": {"class": "pa-0 px-2"},
                                            "text": f"热度：{heat}万 | 评分：{vote}",
                                        },
                                        {
                                            "component": "VCardText",
                                            "props": {"class": "pa-0 px-2"},
                                            "text": f"处理：{action}",
                                        },
                                        {
                                            "component": "VCardText",
                                            "props": {"class": "pa-0 px-2"},
                                            "text": f"时间：{time_str}",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                }
            )

        return [
            {
                "component": "div",
                "props": {
                    "class": "grid gap-3 grid-info-card",
                },
                "content": contents,
            }
        ]

    def stop_service(self):
        """
        退出插件
        """
        try:
            if self._scheduler:
                self._scheduler.remove_all_jobs()
                if self._scheduler.running:
                    self._event.set()
                    self._scheduler.shutdown()
                    self._event.clear()
                self._scheduler = None
        except Exception as e:
            print(str(e))

    def delete_history(self, key: str, apikey: str):
        """
        删除同步历史记录
        """
        if apikey != settings.API_TOKEN:
            return schemas.Response(success=False, message="API密钥错误")
        # 历史记录
        historys = self.get_data("history")
        if not historys:
            return schemas.Response(success=False, message="未找到历史记录")
        # 删除指定记录
        historys = [h for h in historys if h.get("unique") != key]
        self.save_data("history", historys)
        return schemas.Response(success=True, message="删除成功")

    def __update_config(self):
        """
        更新配置
        """
        self.update_config(
            {
                "enabled": self._enabled,
                "proxy": self._proxy,
                "onlyonce": self._onlyonce,
                "cron": self._cron,
                "action": self._action,
                "base_url": self._base_url,
                "ranks": self._ranks,
                "rss_addrs": "\n".join(map(str, self._rss_addrs)),
                "min_heat": self._min_heat,
                "min_vote": self._min_vote,
                "title_blacklist": ",".join(self._title_blacklist),
                "clear": self._clear,
            }
        )

    @_single_instance
    def __refresh(self):
        """
        刷新红果短剧榜单
        """
        logger.info(f"开始刷新红果短剧榜单 ...")
        # 构建完整榜单地址
        base_url = self._base_url.rstrip("/")
        rank_addrs = [
            f"{base_url}{self._rank_address.get(rank)}"
            for rank in self._ranks
            if self._rank_address.get(rank)
        ]
        addr_list = self._rss_addrs + rank_addrs
        if not addr_list:
            logger.info(f"未设置榜单地址")
            return
        else:
            logger.info(f"共 {len(addr_list)} 个榜单地址需要刷新")

        # 读取历史记录
        if self._clearflag:
            history = []
        else:
            history: List[dict] = self.get_data("history") or []

        for addr in addr_list:
            if not addr:
                continue
            try:
                logger.info(f"获取榜单：{addr} ...")
                rank_items = self.__get_rank_list(addr)
                if not rank_items:
                    logger.error(f"榜单地址：{addr} ，未查询到数据")
                    continue
                else:
                    logger.info(f"榜单地址：{addr} ，共 {len(rank_items)} 条数据")
                # 仅处理热播榜前10条
                rank_items = rank_items[:10]
                logger.info(f"榜单地址：{addr} ，处理前 {len(rank_items)} 条")
                for idx, item in enumerate(rank_items, 1):
                    try:
                        if self._event.is_set():
                            logger.info(f"订阅服务停止")
                            return
                        title = item.get("title")
                        series_id = item.get("series_id")
                        logger.info(
                            f"正在处理第 {idx}/{len(rank_items)} 条数据: {title}"
                        )
                        unique_flag = f"hongguosubscribe: {series_id}"
                        # 检查是否已处理过（集合加速查询）
                        if unique_flag in {h.get("unique") for h in history}:
                            logger.info(f"{title} 历史记录中已处理过，跳过")
                            continue
                        # 检查标题黑名单
                        blacklisted = False
                        if self._title_blacklist:
                            title_lower = title.lower()
                            for keyword in self._title_blacklist:
                                if keyword.lower() in title_lower:
                                    logger.info(
                                        f"{title} 标题包含黑名单关键字 '{keyword}'，跳过"
                                    )
                                    blacklisted = True
                                    break
                        if blacklisted:
                            continue
                        # 热度过滤
                        heat = float(item.get("heat") or 0)
                        if self._min_heat and heat < self._min_heat:
                            logger.info(f"{title} 热度 {heat}万 不符合要求，跳过")
                            continue
                        # 评分过滤
                        vote = float(item.get("vote") or 0)
                        if self._min_vote and vote < self._min_vote:
                            logger.info(f"{title} 评分 {vote} 不符合要求，跳过")
                            continue
                        # 处理条目
                        action_result = self.__process_item(item)
                        # 存储历史记录
                        history.append(
                            {
                                "title": title,
                                "series_id": series_id,
                                "heat": heat,
                                "vote": vote,
                                "action": action_result,
                                "time": datetime.datetime.now().strftime(
                                    "%Y-%m-%d %H:%M:%S"
                                ),
                                "unique": unique_flag,
                            }
                        )
                    except Exception as e:
                        logger.error(
                            f"处理榜单条目时出错: {str(e)}\n{traceback.format_exc()}"
                        )
                        continue
                logger.info(f"榜单地址：{addr} 处理完成")
            except Exception as e:
                logger.error(str(e))

        # 保存历史记录：读取最新数据合并去重后写入，防止并发实例互相覆盖丢失
        try:
            latest = self.get_data("history") or []
            merged = {h.get("unique"): h for h in latest}
            for h in history:
                merged[h.get("unique")] = h
            self.save_data("history", list(merged.values()))
        except Exception as e:
            logger.error(f"合并保存历史记录失败：{str(e)}，回退直接保存")
            self.save_data("history", history)
        # 缓存只清理一次
        self._clearflag = False

    @staticmethod
    def __extract_rank_list(obj: Any, depth: int = 0) -> List[dict]:
        """
        递归从路由数据中提取 rankList，兼容字符串内嵌 JSON
        """
        if depth > 8:
            return []
        if isinstance(obj, dict):
            rl = obj.get("rankList")
            if isinstance(rl, list) and rl:
                return rl
            for v in obj.values():
                r = HongGuoSubscribe.__extract_rank_list(v, depth + 1)
                if r:
                    return r
        elif isinstance(obj, list):
            for v in obj:
                r = HongGuoSubscribe.__extract_rank_list(v, depth + 1)
                if r:
                    return r
        elif isinstance(obj, str):
            s = obj.strip()
            if s.startswith(("{", "[")):
                try:
                    return HongGuoSubscribe.__extract_rank_list(
                        json.loads(s), depth + 1
                    )
                except Exception:
                    pass
        return []

    def __get_rank_list(self, addr: str) -> List[dict]:
        """
        获取榜单条目
        """
        try:
            if self._proxy:
                res = RequestUtils(proxies=settings.PROXY).get_res(addr)
            else:
                res = RequestUtils().get_res(addr)
            if not res or res.status_code != 200:
                logger.error(
                    f"获取榜单失败：{addr}，状态码：{res.status_code if res else 'None'}"
                )
                return []
            page_text = html.unescape(res.text)
            # 首选解析：页面内嵌结构化 JSON（data-fn-args，站点为双引号+HTML实体包裹）
            fn_args = re.search(r"data-fn-args=(\"[^\"]*\"|'[^']*')", res.text, re.S)
            if fn_args:
                try:
                    args = json.loads(html.unescape(fn_args.group(1)[1:-1]))
                    rank_list = self.__extract_rank_list(args)
                    if not rank_list:
                        raise ValueError("rankList为空")
                    items = []
                    for rk in rank_list:
                        if not isinstance(rk, dict):
                            continue
                        sid = str(rk.get("seriesId") or rk.get("id") or "")
                        title = (rk.get("title") or "").strip()
                        if not sid or not title:
                            continue
                        item = {"series_id": sid, "title": title, "addr": addr}
                        mh = re.search(
                            r"(\d+(?:\.\d+)?)", rk.get("heatText") or ""
                        )
                        item["heat"] = float(mh.group(1)) if mh else 0
                        mv = re.search(
                            r"(\d+(?:\.\d+)?)", rk.get("scoreText") or ""
                        )
                        item["vote"] = float(mv.group(1)) if mv else 0
                        items.append(item)
                    if items:
                        logger.info(
                            f"榜单地址：{addr} ，JSON解析到 {len(items)} 条"
                        )
                        return items
                except Exception as e:
                    logger.warn(f"JSON解析失败，回退HTML解析：{e}")
            # 匹配标题与详情ID（红果短剧榜单页：<h2 id="rank-title-{series_id}">标题</h2>）
            items = []
            seen = set()
            for m in re.finditer(
                r'<h2[^>]*id="rank-title-(\d+)"[^>]*>([^<]+)</h2>', page_text
            ):
                sid, title = m.group(1), m.group(2).strip()
                if not sid or sid in seen or not title:
                    continue
                seen.add(sid)
                items.append({"series_id": sid, "title": title})
            # 兼容普通HTML链接形式
            if not items:
                for m in re.finditer(
                    r'href="/detail\?series_id=(\d+)"[^>]*>([^<]+)</a>', page_text
                ):
                    sid, title = m.group(1), m.group(2).strip()
                    if not sid or sid in seen or not title:
                        continue
                    seen.add(sid)
                    items.append({"series_id": sid, "title": title})
            # 兼容markdown链接形式
            if not items:
                for m in re.finditer(
                    r'\[([^\]]+)\]\(/detail\?series_id=(\d+)\)', page_text
                ):
                    title, sid = m.group(1).strip(), m.group(2)
                    if not sid or sid in seen or not title:
                        continue
                    seen.add(sid)
                    items.append({"series_id": sid, "title": title})
            if not items:
                logger.warn(f"榜单页未解析到条目：{addr}")
                return []
            # 热度与评分（同一模板渲染，顺序与条目一一对应）
            heats = [
                float(x)
                for x in re.findall(r"(\d+(?:\.\d+)?)万热度", page_text)
            ]
            votes = [
                float(x)
                for x in re.findall(r"评分\s*(\d+(?:\.\d+)?)", page_text)
            ]
            for idx, item in enumerate(items):
                item["heat"] = heats[idx] if idx < len(heats) else 0
                item["vote"] = votes[idx] if idx < len(votes) else 0
                item["addr"] = addr
            return items
        except Exception as e:
            logger.error(f"获取榜单失败：{addr} - {str(e)}")
            return []

    def __process_item(self, item: dict) -> str:
        """
        处理单个条目，返回处理结果描述
        """
        title = item.get("title")
        # 元数据
        meta = MetaInfo(title)
        if self._action == "search":
            return self.__search_download(title)
        if self._action == "subscribe":
            return self.__try_subscribe(meta, title)
        # auto：先尝试订阅，识别失败或订阅失败时回退搜索下载
        sub_result = self.__try_subscribe(meta, title)
        if sub_result.startswith(("识别失败", "订阅失败")):
            return self.__search_download(title)
        return sub_result

    def __try_subscribe(self, meta: MetaInfo, title: str) -> str:
        """
        尝试识别媒体信息并添加订阅
        """
        mediainfo = self.chain.recognize_media(meta=meta)
        if not mediainfo:
            logger.warn(f"未识别到媒体信息，无法订阅：{title}")
            return "识别失败"
        # 查询媒体库中是否已存在
        try:
            exist_flag, no_exists = DownloadChain().get_no_exists_info(
                meta=meta, mediainfo=mediainfo
            )
            if exist_flag and not no_exists:
                # 当明确指定了季，但 TMDB 中该季无有效集数信息（如红果短剧
                # “第十季”在 TMDB 常无集数元数据）时，存在判定不可靠，
                # 回退到站点搜索下载，避免漏下站点实际存在的资源
                unreliable = []
                if meta.season_list:
                    seasons_map = mediainfo.seasons or {}
                    unreliable = [
                        s
                        for s in meta.season_list
                        if s not in seasons_map or not seasons_map.get(s)
                    ]
                if unreliable:
                    logger.info(
                        f"{mediainfo.title_year} 第{unreliable}季缺少有效集数信息，"
                        f"媒体库存在判定不可靠，改走搜索下载：{title}"
                    )
                    return self.__search_download(title)
                logger.info(f"{mediainfo.title_year} 媒体库中已存在")
                return "媒体库已存在"
        except Exception as e:
            logger.warn(f"查询媒体库存在状态失败：{str(e)}")
        # 判断用户是否已经添加订阅
        subscribechain = SubscribeChain()
        if subscribechain.exists(mediainfo=mediainfo, meta=meta):
            logger.info(f"{mediainfo.title_year} 订阅已存在")
            return "订阅已存在"
        # 添加订阅
        sub_id, sub_err = subscribechain.add(
            title=mediainfo.title,
            year=mediainfo.year,
            mtype=mediainfo.type,
            tmdbid=mediainfo.tmdb_id,
            season=meta.begin_season,
            exist_ok=True,
            username="红果短剧",
        )
        if not sub_id:
            logger.warn(f"订阅添加失败：{sub_err}：{mediainfo.title_year}")
            return f"订阅失败：{sub_err or '未知原因'}"
        logger.info(f"已添加订阅：{mediainfo.title_year}")
        return "已订阅"

    def __search_download(self, title: str) -> str:
        """
        按标题搜索并下载
        """
        searchchain = SearchChain()
        # 搜索词剥离季信息：站点对“持械入宋：第十季”这类完整标题常搜不到，
        # 用纯剧名搜索后，再由下方标题相关度匹配挑选对应季的资源
        search_title = re.sub(r"第[零一二两三四五六七八九十百]+季", "", title)
        search_title = re.sub(r"[\s:：·\-_\[\]（）()【】,，。]+$", "", search_title).strip()
        if not search_title:
            search_title = title
        contexts = searchchain.search_by_title(title=search_title)
        if not contexts:
            logger.warn(f"{title} 未搜索到资源")
            return "未搜索到资源"
        # 过滤无种子信息的空壳结果
        valid = [c for c in contexts if getattr(c, "torrent_info", None)]
        if not valid:
            logger.warn(f"{title} 搜索结果均为空壳（无种子信息）")
            return "未搜索到有效资源"
        # 标题相关度匹配：优先选标题与搜索词相关的资源
        # 归一化：去除空白、括号、中英文标点（逗号/句号/感叹号/问号/顿号等），
        # 避免“婆婆装瘫七年，我高调离婚！”的拼音串残留中文逗号导致匹配失败
        _PUNCT = r"[\s:：·\-_\[\]（）()【】,，。!！?？、;；'\"“”‘’…~～/\\|]"
        def _norm(s: str) -> str:
            return re.sub(_PUNCT, "", s or "").lower()

        # 中文数字季转阿拉伯（如“第十季”→S10），提升与站点 S10/S01 类标题的匹配
        _CN_NUM = {"零": 0, "一": 1, "二": 2, "两": 2, "三": 3, "四": 4,
                   "五": 5, "六": 6, "七": 7, "八": 8, "九": 9}
        def _cn2int(s: str) -> int:
            total = 0
            if not s:
                return 0
            if "百" in s:
                idx = s.index("百")
                total += (_CN_NUM.get(s[idx - 1], 1) * 100 if idx > 0 else 100)
                s = s[idx + 1:]
            if "十" in s:
                idx = s.index("十")
                tens = _CN_NUM.get(s[idx - 1], 1) if idx > 0 else 1
                total += tens * 10
                s = s[idx + 1:]
                if s:
                    total += _CN_NUM.get(s[0], 0)
            elif s:
                total += _CN_NUM.get(s[-1], 0)
            return total
        _seasoned_title = re.sub(
            r"第([零一二两三四五六七八九十百]+)季",
            lambda m: f"S{_cn2int(m.group(1))}",
            title,
        )
        base = _norm(_seasoned_title)
        # 中文转拼音全拼（用于匹配拼音/英文种子标题，如 Bei Yong Lian Xi Ren Wan）
        try:
            from pypinyin import lazy_pinyin
            py_list = lazy_pinyin(_seasoned_title)
            base_py = "".join(py_list).lower()
            # 拼音全拼同样过滤标点（lazy_pinyin 会保留中文标点字符）
            base_py = re.sub(_PUNCT, "", base_py)
            initials = re.sub(
                r"[^a-z]", "", "".join([p[0] for p in py_list]).lower()
            )
        except Exception:
            base_py, initials = "", ""
        scored = []
        for c in valid:
            t = _norm(getattr(c.torrent_info, "title", ""))
            # 中文标题包含匹配（如种子标题含中文剧名）
            hit = 1.0 if (base and base in t) else 0.0
            # 拼音全拼匹配：搜索词拼音是种子标题拼音的子串（如 helihouwodainv...）
            if hit <= 0 and len(base_py) >= 4 and base_py in t:
                hit = max(hit, 0.9)
            # 拼音剧名前缀 + 季号组合匹配（如 Chi Xie Ru Song 2026 S10 1080p ...）
            if hit <= 0 and base_py:
                _s_tag = re.search(r"s\d{1,2}", base)
                if _s_tag:
                    _core_py = base_py.split(_s_tag.group(0), 1)[0]
                    if len(_core_py) >= 3 and _s_tag.group(0) in t and _core_py in t:
                        hit = max(hit, 0.85)
            # 拼音首字母匹配：搜索词拼音首字母是种子标题子串（如 hlhwodnv...）
            if hit <= 0 and len(initials) >= 3 and initials in t:
                hit = max(hit, 0.7)
            # difflib 相似度兜底
            if hit <= 0:
                ratio = difflib.SequenceMatcher(None, base, t).ratio()
                if ratio >= 0.6 or (base and t and (base[:2] in t or t[:2] in base)):
                    hit = max(hit, ratio)
            scored.append((hit, c.torrent_info.size or 0, c))
        scored.sort(key=lambda x: (x[0], x[1]), reverse=True)
        best_hit = scored[0][0]
        if best_hit <= 0:
            logger.warn(f"{title} 未找到标题匹配的资源，跳过下载（避免误下不相关资源）")
            return "未找到匹配资源"
        context = scored[0][2]
        # 补全媒体与元数据（search_by_title 不识别媒体信息，download_single 校验三字段齐全）
        if not context.meta_info:
            context.meta_info = MetaInfo(title)
        if not context.media_info:
            media_type = context.meta_info.type
            # meta_info.type 可能是 MediaType 枚举或字符串（如 "电视剧"/"电影"），兼容处理
            if isinstance(media_type, MediaType) and media_type != MediaType.UNKNOWN:
                media_type_obj = media_type
            elif media_type and str(media_type) in [t.value for t in MediaType]:
                media_type_obj = MediaType(str(media_type))
            else:
                media_type_obj = MediaType.TV
            context.media_info = MediaInfo(
                type=media_type_obj,
                title=context.meta_info.cn_name or context.meta_info.name or title,
                year=str(context.meta_info.year) if context.meta_info.year else None,
            )
        # 下载
        result = DownloadChain().download_single(context=context, return_detail=True)
        if isinstance(result, tuple):
            save_path, err_msg = result
            if not save_path:
                logger.error(f"下载失败：{err_msg}：{context.torrent_info.title}")
                return f"下载失败：{err_msg or '未知原因'}"
        logger.info(f"已开始下载：{context.torrent_info.title}")
        return "已开始下载"
