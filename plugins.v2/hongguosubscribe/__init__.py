import datetime
import html
import re
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
from app.log import logger
from app.plugins import _PluginBase
from app.utils.http import RequestUtils


class HongGuoSubscribe(_PluginBase):
    # 插件名称
    plugin_name = "红果短剧订阅"
    # 插件描述
    plugin_desc = "定时从红果短剧网站获取短剧榜单，自动搜索并下载或订阅短剧"
    # 插件图标
    plugin_icon = "hongguo.png"
    # 插件版本
    plugin_version = "1.0.0"
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
                        logger.error(f"处理榜单条目时出错: {str(e)}")
                        continue
                logger.info(f"榜单地址：{addr} 处理完成")
            except Exception as e:
                logger.error(str(e))

        # 保存历史记录
        self.save_data("history", history)
        # 缓存只清理一次
        self._clearflag = False

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
        # auto：先尝试订阅，识别失败回退搜索下载
        sub_result = self.__try_subscribe(meta, title)
        if sub_result != "识别失败":
            return sub_result
        return self.__search_download(title)

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
            exist_flag, _ = DownloadChain().get_no_exists_info(
                meta=meta, mediainfo=mediainfo
            )
            if exist_flag:
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
        subscribechain.add(
            title=mediainfo.title,
            year=mediainfo.year,
            mtype=mediainfo.type,
            tmdbid=mediainfo.tmdb_id,
            season=meta.begin_season,
            exist_ok=True,
            username="红果短剧",
        )
        logger.info(f"已添加订阅：{mediainfo.title_year}")
        return "已订阅"

    def __search_download(self, title: str) -> str:
        """
        按标题搜索并下载
        """
        searchchain = SearchChain()
        contexts = searchchain.search_by_title(title=title)
        if not contexts:
            logger.warn(f"{title} 未搜索到资源")
            return "未搜索到资源"
        # 优先下载体积最大的资源
        contexts.sort(key=lambda c: c.torrent_info.size or 0, reverse=True)
        context = contexts[0]
        # 下载
        DownloadChain().download_single(context=context)
        logger.info(f"已开始下载：{context.torrent_info.title}")
        return "已开始下载"
