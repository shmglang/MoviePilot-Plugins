from typing import List, Optional
from .base import BaseMedalHandler
from .zm_handler import ZmMedalReminderHandler
from .php_handler import PhpMedalReminderHandler
from .qingwa_handler import QingwaMedalReminderHandler
from .audiences_handler import AudiencesMedalReminderHandler
from .ubits_handler import UbitsMedalReminderHandler
from .off_handler import OffMedalReminderHandler
from .hhan_handler import HHanMedalReminderHandler
from .ourbits_handler import OurbitsMedalReminderHandler
from .hddolby_handler import HddolbyMedalReminderHandler
from .longpt_handler import LongptMedalReminderHandler
from .playlet_handler import PlayletMedalReminderHandler
from .moment_handler import MomentMedalReminderHandler
from .hxpt_handler import HxptMedalReminderHandler
from .dubhe_handler import DubheMedalReminderHandler
from .siqi_handler import SiqiMedalReminderHandler
from .rousipro_handler import RousiProMedalReminderHandler
from .city13_handler import City13MedalReminderHandler
from .agsvpt_handler import AgsvptMedalReminderHandler


class MedalHandlerManager:
    """勋章处理器管理器"""

    def __init__(self):
        # 注册所有处理器
        self._handlers: List[BaseMedalHandler] = [
            AudiencesMedalReminderHandler(),  # 优先处理观众站点
            UbitsMedalReminderHandler(),  # 优先处理UBits站点
            QingwaMedalReminderHandler(),  # 优先处理qingwa站点
            LongptMedalReminderHandler(),  # 优先处理LongPT站点
            PlayletMedalReminderHandler(),  # 优先处理PlayLet站点
            MomentMedalReminderHandler(),  # 优先处理Moment站点
            HxptMedalReminderHandler(),  # 优先处理好学站点
            DubheMedalReminderHandler(),  # 优先处理天枢站点
            SiqiMedalReminderHandler(),  # 优先处理思齐站点
            City13MedalReminderHandler(),  # 优先处理 13City 站点
            AgsvptMedalReminderHandler(),  # 优先处理 AGSVPT 站点
            RousiProMedalReminderHandler(),  # 优先处理 Rousi Pro 站点
            OffMedalReminderHandler(),  # 优先处理自由农场站点
            HHanMedalReminderHandler(),  # 优先处理憨憨站点
            HddolbyMedalReminderHandler(),  # 优先处理高清杜比站点
            OurbitsMedalReminderHandler(),  # 优先处理OurBits站点
            ZmMedalReminderHandler(),  # 优先处理织梦站点
            PhpMedalReminderHandler(),  # 最后使用PHP通用处理器
        ]
        # 记录已匹配的站点
        self._matched_sites = set()

    def get_handler(self, site) -> Optional[BaseMedalHandler]:
        """获取适配的处理器"""
        # 清空已匹配站点记录
        self._matched_sites.clear()

        # 遍历所有处理器
        for handler in self._handlers:
            if handler.match(site):
                # 记录已匹配的站点
                if hasattr(site, 'name'):
                    self._matched_sites.add(site.name.lower())
                return handler
        return None

    def register_handler(self, handler: BaseMedalHandler):
        """注册新的处理器"""
        if handler not in self._handlers:
            self._handlers.append(handler)

    def unregister_handler(self, handler: BaseMedalHandler):
        """注销处理器"""
        if handler in self._handlers:
            self._handlers.remove(handler)

    def is_site_matched(self, site_name: str) -> bool:
        """检查站点是否已被其他处理器匹配"""
        return site_name.lower() in self._matched_sites


# 创建全局管理器实例
handler_manager = MedalHandlerManager()
