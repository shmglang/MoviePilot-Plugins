from typing import Dict, List, Optional
import re
from app.log import logger
from lxml import etree
from .base import BaseMedalHandler
from urllib.parse import urljoin

class HxptMedalReminderHandler(BaseMedalHandler):
    """好学站点勋章处理器"""
    
    def match(self, site) -> bool:
        """判断是否为好学站点"""
        site_name = site.name.lower()
        site_url = site.url.lower()
        return "hxpt" in site_name or "hxpt" in site_url or "好学" in site_name

    def fetch_user_medals(self, site) -> List[Dict]:
        """获取 好学 HXPT 用户已拥有勋章"""
        try:
            site_name = site.name
            site_url = site.url
            site_cookie = site.cookie
            site_ua = getattr(site, "ua", None)

            user_id = self._get_user_id(site_url, site_cookie, site_ua)
            if not user_id:
                logger.error(f"无法获取站点 {site_name} 的用户ID")
                return []

            detail_url = f"{site_url.rstrip('/')}/userdetails.php?id={user_id}"
            logger.info(f"正在获取 {site_name} 用户详情页")

            res = self._request_with_retry(url=detail_url, cookies=site_cookie, ua=site_ua)
            if not res:
                logger.error(f"请求 {site_name} 用户详情页失败！站点：{site_name}")
                return []

            html = etree.HTML(res.text)
            medals = self._parse_user_medals(html, site_name, site_url)
            logger.info(f"共获取到 {len(medals)} 个 {site_name} 用户已拥有勋章")
            return medals
        except Exception as e:
            logger.error(f"获取 好学 HXPT 用户已拥有勋章失败: {e}")
            return []

    def _get_user_id(self, site_url: str, cookies: str, ua: str = None) -> Optional[str]:
        """从首页获取用户ID"""
        try:
            res = self._request_with_retry(
                url=f"{site_url.rstrip('/')}/index.php",
                cookies=cookies,
                ua=ua,
            )
            if not res:
                return None

            match = re.search(r"userdetails\.php\?id=(\d+)", res.text)
            if match:
                return match.group(1)
            return None
        except Exception:
            return None

    def _parse_user_medals(self, html, site_name: str, site_url: str) -> List[Dict]:
        """解析用户详情页中的已拥有勋章"""
        medals: List[Dict] = []
        seen_keys = set()

        try:
            medal_blocks = html.xpath('//form[.//input[@id="save-user-medal-btn"]]//div[contains(@style, "float: left") or contains(@style, "flex-direction: column")]')
            if medal_blocks:
                for block in medal_blocks:
                    medal = self._build_user_medal_from_block(block, site_name, site_url)
                    if not medal:
                        continue
                    key = self._build_user_medal_key(medal)
                    if key in seen_keys:
                        continue
                    seen_keys.add(key)
                    medals.append(medal)
                return medals

            medal_images = html.xpath(
                '//h1//img[contains(@class, "nexus-username-medal")]'
                ' | //h1//img[contains(@class, "nexus-username-medal-big")]'
                ' | //span//img[contains(@class, "nexus-username-medal")]'
                ' | //img[contains(@src, "medals/") or contains(@src, "pic/medals/")]'
            )

            for img in medal_images:
                medal = self._build_user_medal_from_image(img, site_name, site_url)
                if not medal:
                    continue
                key = self._build_user_medal_key(medal)
                if key in seen_keys:
                    continue
                seen_keys.add(key)
                medals.append(medal)

            return medals
        except Exception as e:
            logger.error(f"解析 好学 HXPT 用户勋章HTML出错: {e}")
            return []

    def _build_user_medal_from_block(self, block, site_name: str, site_url: str) -> Optional[Dict]:
        imgs = block.xpath('.//img[@class="preview"] | .//img')
        if not imgs:
            return None

        medal = self._build_user_medal_from_image(imgs[0], site_name, site_url)
        if not medal:
            return None

        info_texts = block.xpath('.//span/text() | .//table//text() | ./div[last()]//text()')
        info_text = ' '.join([text.strip() for text in info_texts if text.strip()])

        expire_match = re.search(r'过期时间[：:]\s*(.+?)(?:\s+(?:魔力|电力|火花|蝌蚪|冰晶)加成|$)', info_text)
        if expire_match:
            medal['validity'] = expire_match.group(1).strip()

        bonus_match = re.search(r'(?:魔力|电力|火花|蝌蚪|冰晶)加成(?:系数)?[：:]\s*([\d.]+%?)', info_text)
        if bonus_match:
            medal['bonus_rate'] = bonus_match.group(1).strip()

        status_input = block.xpath('.//input[starts-with(@name, "status_")]')
        if status_input:
            medal['wear_status'] = '已佩戴' if status_input[0].get('checked') is not None else '未佩戴'

        wear_text = ''.join(block.xpath('.//*[contains(text(), "已佩戴")]/text() | .//*[contains(text(), "未佩戴")]/text()')).strip()
        if wear_text:
            medal['wear_status'] = wear_text

        return self._format_medal_data(medal)

    def _build_user_medal_from_image(self, img, site_name: str, site_url: str) -> Optional[Dict]:
        img_src = (img.get('src') or '').strip()
        if not img_src:
            return None

        if not img_src.startswith(('http://', 'https://')):
            img_src = urljoin(f"{site_url.rstrip('/')}/", img_src.lstrip('/'))

        medal = {
            'imageSmall': img_src,
            'original_image_url': img_src,
            'name': (img.get('title') or img.get('alt') or '').strip(),
            'site': site_name,
            'purchase_status': '已拥有',
            'currency': '火花',
        }

        parent_text = ' '.join([text.strip() for text in img.xpath('./ancestor::*[1]//text()') if text.strip()])
        if '已佩戴' in parent_text:
            medal['wear_status'] = '已佩戴'
        elif '未佩戴' in parent_text:
            medal['wear_status'] = '未佩戴'

        return self._format_medal_data(medal)

    def _build_user_medal_key(self, medal: Dict) -> str:
        name = (medal.get('name') or '').strip().lower()
        image = (medal.get('imageSmall') or '').strip().lower()
        return f"{name}|{image}"

    def fetch_medals(self, site) -> List[Dict]:
        """获取好学站点勋章数据"""
        try:
            site_name = site.name
            site_url = site.url
            site_cookie = site.cookie
            
            # 获取勋章页面数据
            url = f"{site_url.rstrip('/')}/medal.php"
            logger.info(f"正在获取【{site_name}】站点勋章数据")
            
            # 发送请求获取勋章页面
            res = self._request_with_retry(
                url=url,
                cookies=site_cookie
            )
            
            if not res:
                logger.error(f"请求勋章页面失败！站点：{site_name}")
                return []
                
            # 使用lxml解析HTML
            html = etree.HTML(res.text)
            
            # 获取所有分组section
            sections = html.xpath("//div[@class='category-section']")
            if not sections:
                logger.error("未找到勋章分组section！")
                return []
            
            logger.info(f"找到 {len(sections)} 个勋章分组")
            
            # 处理所有勋章数据
            medals = []
            
            # 遍历所有分组
            for section in sections:
                try:
                    # 获取分组名称
                    group_title = section.xpath(".//h2[@class='category-title']/text()")
                    group_name = "默认分组"
                    if group_title:
                        group_name = group_title[0].strip()
                        logger.info(f"处理勋章分组: {group_name}")
                    
                    # 获取勋章网格（可能包含hidden类）
                    medal_grids = section.xpath(".//div[contains(@class, 'medal-grid')]")
                    if not medal_grids:
                        continue
                    
                    # 获取该分组下的所有勋章卡片
                    medal_cards = medal_grids[0].xpath(".//div[@class='medal-card']")
                    logger.info(f"找到 {len(medal_cards)} 个勋章")
                    
                    for card in medal_cards:
                        try:
                            medal = self._process_medal_card(card, site_name, site_url, group_name)
                            if medal:
                                medals.append(medal)
                        except Exception as e:
                            logger.error(f"处理勋章卡片时发生错误：{str(e)}")
                            continue
                            
                except Exception as e:
                    logger.error(f"处理勋章分组时发生错误：{str(e)}")
                    continue
            
            logger.info(f"共获取到 {len(medals)} 个勋章数据")
            return medals
            
        except Exception as e:
            logger.error(f"处理好学站点勋章数据时发生错误: {str(e)}")
            return []

    def _process_medal_card(self, card, site_name: str, site_url: str, group_name: str = "") -> Dict:
        """处理单个勋章卡片数据"""
        medal = {}
        
        try:
            # 从 view-detail 按钮获取完整数据（data-* 属性）
            detail_btns = card.xpath(".//button[contains(@class, 'view-detail')]")
            if not detail_btns:
                logger.warning("未找到详情按钮，跳过该勋章")
                return None
                
            detail_btn = detail_btns[0]
            
            # 提取所有 data-* 属性
            medal_id = detail_btn.get('data-id')
            if medal_id:
                medal['id'] = medal_id
                
            name = detail_btn.get('data-name')
            if name:
                medal['name'] = name.strip()
                
            description = detail_btn.get('data-description')
            if description:
                medal['description'] = description.strip()
                
            # 图片URL
            img_url = detail_btn.get('data-image')
            if img_url:
                # 如果不是http/https开头，补全为完整站点URL
                if not img_url.startswith(('http://', 'https://')):
                    img_url = urljoin(site_url, img_url.lstrip('/'))
                medal['imageSmall'] = img_url
                
            # 价格
            price = detail_btn.get('data-price')
            if price:
                try:
                    medal['price'] = int(price.replace(',', ''))
                except ValueError:
                    medal['price'] = 0
                    
            # 有效期/时长
            duration = detail_btn.get('data-duration')
            if duration:
                medal['validity'] = duration.strip()
                
            # 加成比例
            bonus = detail_btn.get('data-bonus')
            if bonus:
                medal['bonus_rate'] = bonus.strip()
                
            # 赠送手续费
            gift_fee = detail_btn.get('data-gift-fee')
            if gift_fee:
                medal['gift_fee'] = gift_fee.strip()
                
            # 可购买开始时间
            sale_begin = detail_btn.get('data-sale-begin')
            if sale_begin:
                medal['saleBeginTime'] = sale_begin.strip()
                
            # 可购买结束时间
            sale_end = detail_btn.get('data-sale-end')
            if sale_end:
                medal['saleEndTime'] = sale_end.strip()
                
            # 库存
            inventory = detail_btn.get('data-inventory')
            if inventory:
                medal['stock'] = inventory.strip()
            
            # 从购买按钮获取购买状态
            buy_btns = card.xpath(".//button[contains(@class, 'buy')]")
            if buy_btns:
                buy_btn = buy_btns[0]
                # 获取按钮的值或文本作为状态
                status = buy_btn.get('value')
                if not status:
                    status = buy_btn.text
                if status:
                    medal['purchase_status'] = status.strip()
                    
            # 站点信息
            medal['site'] = site_name
            # 货币单位
            medal['currency'] = '火花'
            # 分组信息
            if group_name:
                medal['group'] = group_name
            
            return self._format_medal_data(medal)
            
        except Exception as e:
            logger.error(f"处理勋章卡片数据时发生错误: {str(e)}")
            return None
