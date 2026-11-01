from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

from apscheduler.triggers.cron import CronTrigger

from app.core.cache import Cache
from app.core.config import settings
from app.db.site_oper import SiteOper
from app.helper.sites import SitesHelper
from app.log import logger
from app.plugins import _PluginBase
from app.scheduler import Scheduler
from app.schemas import NotificationType
from .handlers import handler_manager


class MedalReminder(_PluginBase):
    # 插件名称
    plugin_name = "勋章购买提醒"
    # 插件描述
    plugin_desc = "定时抓取各站点勋章数据，统计勋章数量，推送可购买勋章提醒"
    # 插件图标
    plugin_icon = "medalreminder.png"
    # 插件版本
    plugin_version = "1.0.0"
    # 插件作者
    plugin_author = "shmglang"
    # 作者主页
    author_url = "https://github.com/shmglang"
    # 插件配置项ID前缀
    plugin_config_prefix = "medalreminder_"
    # 加载顺序
    plugin_order = 29
    # 可使用的用户级别
    auth_level = 2

    # 过滤的站点列表
    FILTERED_SITES = ['星空', '聆音', '朱雀', '馒头', '家园', '朋友', '彩虹岛', '天空', '听听歌', '皇后', '猫站']

    # 私有属性
    _enabled: bool = False
    _cron: Optional[str] = "0 9 * * *"
    _notify: bool = False
    _chat_sites: List[str] = []
    _use_proxy: bool = True
    _retry_times: int = 3
    _retry_interval: int = 5

    sites: SitesHelper = None
    siteoper: SiteOper = None
    _cache: Cache = None

    @staticmethod
    def _to_bool(val: Any) -> bool:
        """转换布尔值"""
        if isinstance(val, bool):
            return val
        if isinstance(val, str):
            return val.lower() == 'true'
        return bool(val)

    @staticmethod
    def _to_int(val: Any, default: int = 0) -> int:
        """转换整数"""
        try:
            return int(val)
        except Exception:
            return default

    def __init__(self):
        super().__init__()
        self.sites = SitesHelper()
        self.siteoper = SiteOper()
        # 初始化缓存，TTL 24小时 (86400秒)
        self._cache = Cache(ttl=86400)

    def init_plugin(self, config: Optional[dict] = None) -> None:
        """初始化插件"""
        try:
            self.stop_service()

            if config:
                if "enabled" in config:
                    self._enabled = self._to_bool(config["enabled"])
                self._notify = self._to_bool(config.get("notify", False))
                self._use_proxy = self._to_bool(config.get("use_proxy", True))
                self._retry_times = self._to_int(config.get("retry_times"), 3)
                self._retry_interval = self._to_int(config.get("retry_interval"), 5)
                self._chat_sites = config.get("chat_sites", [])

                # 验证 Cron 表达式
                cron = config.get("cron") or "0 9 * * *"
                try:
                    CronTrigger.from_crontab(cron)
                    self._cron = cron
                except (ValueError, Exception) as e:
                    logger.warning(f"{self.plugin_name}: Cron表达式无效 '{cron}'，使用默认值 '0 9 * * *' - {str(e)}")
                    self._cron = "0 9 * * *"

                # 过滤掉已删除的站点
                all_sites = [site.id for site in self.siteoper.list_order_by_pri()] + [site.get("id") for site in self.__custom_sites()]
                self._chat_sites = [site_id for site_id in self._chat_sites if site_id in all_sites]

            # 初始化状态日志
            if not self._enabled:
                logger.info(f"{self.plugin_name} 服务未启用")
                return
            if self._enabled and self._cron:
                logger.info(f"{self.plugin_name}: 已配置 CRON '{self._cron}'，任务将通过公共服务注册")
        except Exception as e:
            logger.error(f"{self.plugin_name} 服务启动失败: {str(e)}")
            self._enabled = False

    def get_service(self) -> List[Dict[str, Any]]:
        """注册插件公共服务"""
        services = []
        if self._enabled and self._cron:
            services.append({
                "id": "medalreminder",
                "name": "勋章购买提醒 - 定时任务",
                "trigger": CronTrigger.from_crontab(self._cron),
                "func": self.__process_all_sites,
                "kwargs": {}
            })
        return services

    def get_api(self) -> List[dict]:
        """注册插件API"""
        return [
            {
                "path": "/run",
                "endpoint": self._run_task,
                "methods": ["POST"],
                "auth": "bear",
                "summary": "立即运行勋章抓取与提醒任务"
            },
            {
                "path": "/sites",
                "endpoint": self._get_sites,
                "methods": ["GET"],
                "auth": "bear",
                "summary": "获取可用站点"
            },
            {
                "path": "/stats",
                "endpoint": self._get_stats,
                "methods": ["GET"],
                "auth": "bear",
                "summary": "获取勋章统计"
            }
        ]

    def get_form(self) -> Tuple[Optional[List[dict]], Dict[str, Any]]:
        """拼装插件配置页面"""
        form = [
            {
                "component": "VForm",
                "content": [
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
                                            "model": "notify",
                                            "label": "开启推送通知",
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
                                            "model": "use_proxy",
                                            "label": "使用代理服务器",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
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
                                            "placeholder": "5位cron表达式，留空默认每天9点",
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
                                            "model": "retry_times",
                                            "label": "请求重试次数",
                                            "placeholder": "3",
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
                                            "model": "retry_interval",
                                            "label": "请求重试间隔(秒)",
                                            "placeholder": "5",
                                        },
                                    }
                                ],
                            },
                        ],
                    },
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
                                            "model": "chat_sites",
                                            "label": "监控站点",
                                            "items": self._get_site_options(),
                                        },
                                    }
                                ],
                            },
                        ],
                    },
                ],
            }
        ]
        return form, self._get_config()

    def get_page(self) -> List[dict]:
        """表单插件无需独立页面"""
        return []

    def get_state(self) -> bool:
        """获取插件状态"""
        return self._enabled

    def stop_service(self):
        """停止插件服务"""
        try:
            Scheduler().remove_plugin_job("medalreminder")
            logger.debug(f"{self.plugin_name}: 插件服务已停止")
        except Exception as e:
            logger.debug(f"{self.plugin_name} 停止服务失败: {str(e)}")

    def _get_config(self) -> Dict[str, Any]:
        """获取配置"""
        return {
            "enabled": self._enabled,
            "cron": self._cron,
            "notify": self._notify,
            "chat_sites": self._chat_sites,
            "use_proxy": self._use_proxy,
            "retry_times": self._retry_times,
            "retry_interval": self._retry_interval
        }

    def _get_site_options(self) -> List[Dict[str, Any]]:
        """获取站点下拉选项"""
        try:
            all_sites = [site for site in self.sites.get_indexers()
                         if not site.get("public") and site.get("name") not in self.FILTERED_SITES] + self.__custom_sites()
            return [{"title": site.get("name"), "value": site.get("id")} for site in all_sites]
        except Exception as e:
            logger.error(f"获取站点列表失败: {e}")
            return []

    def _get_sites(self) -> List[Dict[str, Any]]:
        """API: 获取可用站点列表"""
        return self._get_site_options()

    def _run_task(self) -> Dict[str, Any]:
        """API: 立即运行任务"""
        try:
            self.__process_all_sites(force_refresh=True)
            return {"success": True, "message": "任务执行完成"}
        except Exception as e:
            logger.error(f"任务执行失败: {e}")
            return {"success": False, "message": f"任务执行失败: {e}"}

    def _get_stats(self) -> Dict[str, Any]:
        """API: 获取勋章统计汇总"""
        if not self._chat_sites:
            return {"success": False, "message": "未配置监控站点", "stats": {}}
        try:
            stats, _ = self.__collect_stats(force_refresh=False)
            return {"success": True, "stats": stats}
        except Exception as e:
            logger.error(f"获取勋章统计失败: {e}")
            return {"success": False, "message": f"获取勋章统计失败: {e}", "stats": {}}

    def __custom_sites(self) -> list:
        """获取自定义站点列表"""
        custom_sites = []
        custom_sites_config = self.get_config("CustomSites")
        if custom_sites_config and custom_sites_config.get("enabled"):
            custom_sites = custom_sites_config.get("sites", [])
        return custom_sites

    def __process_all_sites(self, force_refresh: bool = False):
        """处理所有选中的站点：抓取、统计、推送"""
        logger.info(f"开始处理所有站点的勋章数据 (强制刷新: {force_refresh})")
        try:
            stats, purchasable_medals = self.__collect_stats(force_refresh=force_refresh)

            # 发送通知 (如果开启了通知)
            if self._notify:
                self.__send_notification(stats, purchasable_medals)

            logger.info(f"处理完成，勋章总数 {stats.get('total_medals', 0)}，可购买 {stats.get('purchasable', 0)} 个")
        except Exception as e:
            logger.error(f"处理所有站点时发生错误: {str(e)}")

    def __collect_stats(self, force_refresh: bool = False) -> Tuple[Dict[str, Any], List[Dict]]:
        """抓取所有选中站点并汇总统计

        :return: (stats, purchasable_medals) 统计信息与当前可购买勋章列表
        """
        if not self._chat_sites:
            logger.error("未选择站点")
            return {"enabled_sites": 0, "total_medals": 0, "owned": 0, "purchasable": 0,
                    "giftable": 0, "site_stats": [], "failed_sites": []}, []

        # 统计变量
        total_sites_count = len(self._chat_sites)
        valid_sites_count = 0
        total_medals_count = 0
        owned_count = 0
        purchasable_count = 0
        giftable_count = 0
        failed_sites = []
        site_stats = []
        # 当前可购买勋章列表（按站点分组展示）
        purchasable_medals = []

        for site_id in self._chat_sites:
            try:
                site = self.siteoper.get(site_id)
                if not site:
                    continue

                site_name = site.name
                valid_sites_count += 1

                medals = self.get_medal_data(site_id)
                if force_refresh:
                    self._cache.set(str(site_id), medals, region="medalreminder")

                if not medals:
                    continue

                current_site_medals_count = len(medals)
                total_medals_count += current_site_medals_count

                site_owned = 0
                site_purchasable = 0
                site_giftable = 0
                site_purchasable_medals = []

                for medal in medals:
                    status = (medal.get('purchase_status') or '').strip()
                    # 统计已拥有
                    if status == '已拥有':
                        owned_count += 1
                        site_owned += 1
                        continue

                    # 统计可购买（仅限当前有效时间段）
                    is_purchasable = False
                    if status in ['购买', '赠送']:
                        if self.is_current_time_in_range(medal.get('saleBeginTime', ''), medal.get('saleEndTime', '')):
                            purchasable_count += 1
                            site_purchasable += 1
                            is_purchasable = True
                            purchasable_medals.append(medal)
                            site_purchasable_medals.append(medal)

                    # 统计可赠送
                    if (medal.get('gift_status') or '').strip() in ['赠送', '购买']:
                        if is_purchasable:
                            giftable_count += 1
                            site_giftable += 1

                site_stats.append({
                    "site_id": site_id,
                    "site_name": site_name,
                    "total": current_site_medals_count,
                    "owned": site_owned,
                    "purchasable": site_purchasable,
                    "giftable": site_giftable,
                })
                logger.info(f"站点【{site_name}】统计：共 {current_site_medals_count} 个勋章，"
                            f"已拥有 {site_owned}，可购买 {site_purchasable}")

            except Exception as e:
                logger.error(f"处理站点 {site_id} 时发生错误: {str(e)}")
                site_name_err = site_id
                try:
                    s = self.siteoper.get(site_id)
                    if s:
                        site_name_err = s.name
                except Exception:
                    pass
                failed_sites.append(site_name_err)
                continue

        stats = {
            'total_sites': total_sites_count,
            'enabled_sites': valid_sites_count,
            'total_medals': total_medals_count,
            'owned': owned_count,
            'purchasable': purchasable_count,
            'giftable': giftable_count,
            'site_stats': site_stats,
            'failed_sites': failed_sites
        }
        return stats, purchasable_medals

    def get_medal_data(self, site_id: str) -> List[Dict]:
        """获取站点勋章数据（商店勋章 + 用户已拥有勋章合并）"""
        try:
            site = self.siteoper.get(site_id)
            if not site:
                return []

            handler = handler_manager.get_handler(site)
            # 配置handler
            if handler:
                handler._use_proxy = self._use_proxy
                handler._retry_times = self._retry_times
                handler._retry_interval = self._retry_interval

            if not handler:
                logger.error(f"未找到适配的站点处理器: {site.name}")
                return []

            medals = handler.fetch_medals(site)
            for medal in medals:
                medal['site_id'] = site_id
                medal['use_image_proxy'] = handler.should_use_image_proxy()

            # 获取用户已拥有的勋章
            try:
                user_medals = handler.fetch_user_medals(site)
                if user_medals:
                    logger.info(f"获取到 {len(user_medals)} 个用户已拥有勋章，开始合并数据...")
                    # 创建勋章ID/名称映射，兼容不同站点接口字段差异
                    user_medal_id_map = {
                        str(m.get('medal_id')): m
                        for m in user_medals
                        if m.get('medal_id') not in (None, '')
                    }
                    user_medal_name_map = {
                        self.__normalize_medal_name(m.get('name')): m
                        for m in user_medals
                        if self.__normalize_medal_name(m.get('name'))
                    }

                    # 遍历商店勋章，更新状态
                    for medal in medals:
                        medal_name = medal.get('name')
                        medal_id = medal.get('medal_id')
                        normalized_name = self.__normalize_medal_name(medal_name)

                        matched_user_medal = None
                        if medal_id not in (None, ''):
                            matched_user_medal = user_medal_id_map.get(str(medal_id))
                        if not matched_user_medal and normalized_name:
                            matched_user_medal = user_medal_name_map.get(normalized_name)

                        if matched_user_medal:
                            # 更新状态为已拥有
                            medal['purchase_status'] = "已拥有"
                            if matched_user_medal.get('medal_id') and not medal.get('medal_id'):
                                medal['medal_id'] = matched_user_medal.get('medal_id')
                            if matched_user_medal.get('wear_status'):
                                medal['wear_status'] = matched_user_medal.get('wear_status')

                            # 从映射中移除，标记为已匹配
                            matched_id = matched_user_medal.get('medal_id')
                            matched_name = self.__normalize_medal_name(matched_user_medal.get('name'))
                            if matched_id not in (None, ''):
                                user_medal_id_map.pop(str(matched_id), None)
                            if matched_name:
                                user_medal_name_map.pop(matched_name, None)

                    # 将剩余的用户勋章（商店未列出的）添加到列表
                    remaining_user_medals = []
                    processed_keys = set()
                    for m in user_medal_id_map.values():
                        key = str(m.get('medal_id'))
                        if key and key not in processed_keys:
                            remaining_user_medals.append(m)
                            processed_keys.add(key)
                    for name, m in user_medal_name_map.items():
                        key = str(m.get('medal_id')) or name
                        if key and key not in processed_keys:
                            remaining_user_medals.append(m)
                            processed_keys.add(key)

                    if remaining_user_medals and handler.should_append_unmatched_user_medals():
                        logger.info(f"添加 {len(remaining_user_medals)} 个商店未列出的用户勋章")
                        medals.extend(remaining_user_medals)

            except Exception as e:
                logger.error(f"合并用户勋章数据失败: {str(e)}")

            for medal in medals:
                medal['site_id'] = site_id
                medal['use_image_proxy'] = handler.should_use_image_proxy()

            return medals
        except Exception as e:
            logger.error(f"获取勋章数据失败: {str(e)}")
            return []

    @staticmethod
    def __normalize_medal_name(name: str) -> str:
        """规范化勋章名称，减少接口字段格式差异导致的匹配失败"""
        if not name:
            return ""
        return "".join(str(name).split()).strip().lower()

    def is_current_time_in_range(self, start_time, end_time):
        """判断当前时间是否在给定的时间范围内"""
        try:
            if start_time is None or end_time is None:
                return False
            if not str(start_time).strip() or not str(end_time).strip():
                return False
            # 处理"不限""长期"等特殊时间标记
            if "不限" in str(start_time) or "不限" in str(end_time):
                return True
            if "长期" in str(end_time) or "长期" in str(start_time):
                return True
            if "~" in str(start_time):
                start_time = str(start_time).split("~")[0].strip()
            if "~" in str(end_time):
                end_time = str(end_time).split("~")[0].strip()

            current_time = datetime.now()

            # 尝试两种时间格式
            time_formats = ["%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M"]
            start_datetime = None
            end_datetime = None

            for fmt in time_formats:
                try:
                    start_datetime = datetime.strptime(str(start_time), fmt)
                    break
                except ValueError:
                    continue

            for fmt in time_formats:
                try:
                    end_datetime = datetime.strptime(str(end_time), fmt)
                    break
                except ValueError:
                    continue

            if start_datetime is None or end_datetime is None:
                logger.warning(f"无法解析时间格式: start={start_time}, end={end_time}")
                return False

            return start_datetime <= current_time <= end_datetime
        except Exception as e:
            logger.error(f"解析时间范围时发生错误: {e}")
            return False

    def __format_time(self, time_str):
        if not time_str:
            return ""
        return str(time_str).split(" ")[0]

    def __send_notification(self, stats: Dict, purchasable_medals: List[Dict]):
        """发送通知：勋章统计 + 可购买勋章列表"""
        # 1. 统计部分
        text_message = "──────────\n"
        text_message += "📈 勋章统计：\n"
        text_message += f"🌐 站点数量：已启用 {stats.get('enabled_sites', 0)} / 配置 {stats.get('total_sites', 0)} 个站点\n"
        text_message += f"🏅 勋章总数：{stats.get('total_medals', 0)}\n"
        text_message += f"✅ 已拥有：{stats.get('owned', 0)}\n"
        text_message += f"🛒 可购买：{stats.get('purchasable', 0)}\n"
        text_message += f"🎁 可赠送：{stats.get('giftable', 0)}\n"

        # 各站点统计
        site_stats = stats.get('site_stats', [])
        if site_stats:
            text_message += "──────────\n"
            for item in site_stats:
                text_message += (f"· {item.get('site_name', '')}：共 {item.get('total', 0)} 个，"
                                 f"已拥有 {item.get('owned', 0)}，可购买 {item.get('purchasable', 0)}\n")
        text_message += "──────────\n"

        # 2. 可购买勋章部分（按站点分组）
        if purchasable_medals:
            site_medals = {}
            for medal in purchasable_medals:
                site = medal.get('site', '')
                if site not in site_medals:
                    site_medals[site] = []
                site_medals[site].append(medal)

            text_message += "🛒 当前可购买勋章：\n"
            for site, medals in site_medals.items():
                text_message += f"【{site}】\n"
                for medal in medals:
                    text_message += f"🏅 {medal.get('name', '')}（{medal.get('price', 0):,} {medal.get('currency', '魔力')}）\n"
                    begin_time = self.__format_time(medal.get('saleBeginTime', '不限'))
                    end_time = self.__format_time(medal.get('saleEndTime', '长期'))
                    text_message += f"⏰ 开售：{begin_time} | 截止：{end_time}\n"
                    text_message += f"📅 有效期：{medal.get('validity', '')} | 📦 库存：{medal.get('stock', '未知')}\n"
                text_message += "──────────\n"
        else:
            text_message += "🛒 当前无在售勋章\n"
            text_message += "──────────\n"

        # 3. 失败站点部分
        failed_sites = stats.get('failed_sites', [])
        if failed_sites:
            text_message += f"❌ 失败站点：{', '.join(failed_sites)}\n"
            text_message += "──────────\n"

        text_message += f"⏰ 推送时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"

        self.post_message(
            mtype=NotificationType.SiteMessage,
            title="【🏅 勋章购买提醒】勋章日报",
            text=text_message)
