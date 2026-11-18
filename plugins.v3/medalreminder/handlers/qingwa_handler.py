from typing import Dict, List, Optional
import re
from app.log import logger
from lxml import etree
from .base import BaseMedalHandler
from urllib.parse import urljoin

class QingwaMedalReminderHandler(BaseMedalHandler):
    """青蛙站点勋章处理器"""
    
    def match(self, site) -> bool:
        """判断是否为qingwa.me站点"""
        site_name = site.name.lower()
        site_url = site.url.lower()
        return "qingwa" in site_name or "qingwa" in site_url or "青蛙" in site_name or "青蛙" in site_url

    def fetch_user_medals(self, site) -> List[Dict]:
        """获取 青蛙 Qingwa 用户已拥有勋章"""
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
            logger.error(f"获取 青蛙 Qingwa 用户已拥有勋章失败: {e}")
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
            logger.error(f"解析 青蛙 Qingwa 用户勋章HTML出错: {e}")
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
            'currency': '蝌蚪',
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
        """获取青蛙站点勋章数据"""
        try:
            site_name = site.name
            site_url = site.url
            site_cookie = site.cookie
            
            # 获取勋章页面数据
            url = f"{site_url.rstrip('/')}/medal.php?type=-1"
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
            
            # 获取所有勋章类型header
            medal_headers = html.xpath("//div[@class='medal-type-header']")
            if not medal_headers:
                logger.error("未找到勋章类型header！")
                return []
            
            logger.info(f"找到 {len(medal_headers)} 个勋章类型")
            
            # 处理所有勋章数据
            medals = []
            
            # 遍历所有勋章类型
            for header in medal_headers:
                try:
                    # 获取类型名称
                    type_name: List[str] = header.xpath(".//span[@class='centered-text']/text()")
                    group_name = "默认分组"
                    if type_name:
                        group_name = type_name[0].strip()
                        logger.info(f"处理勋章类型: {group_name}")
                    
                    # 获取对应的container
                    container = header.xpath("following-sibling::div[@class='medal-type-container'][1]")
                    if not container:
                        continue
                        
                    # 获取该类型下的所有勋章项
                    medal_items = container[0].xpath(".//div[@class='medal-item']")
                    logger.info(f"找到 {len(medal_items)} 个勋章")
                    
                    for item in medal_items:
                        try:
                            medal = self._process_medal_item(item, site_name, site_url, group_name)
                            if medal:
                                medals.append(medal)
                        except Exception as e:
                            logger.error(f"处理勋章数据时发生错误：{str(e)}")
                            continue
                            
                except Exception as e:
                    logger.error(f"处理勋章类型时发生错误：{str(e)}")
                    continue
            
            logger.info(f"共获取到 {len(medals)} 个勋章数据")
            return medals
            
        except Exception as e:
            logger.error(f"处理青蛙站点勋章数据时发生错误: {str(e)}")
            return []

    def _process_medal_item(self, item, site_name: str, site_url: str, group_name: str = "") -> Dict:
        """处理单个勋章项数据"""
        medal = {}
        
        try:
            # 获取medal-info区域
            info_div = item.xpath(".//div[@class='medal-info']")[0]
            
            # 名称
            name = info_div.xpath(".//h2/text()")
            if name:
                medal['name'] = name[0].strip()
                
            # 图片 - 优先获取h2中的图片
            img = info_div.xpath(".//h2//img/@src")
            if not img:
                # 如果没有找到h2中的图片，则使用preview图片
                img = item.xpath(".//img[contains(@class, 'preview')]/@src")
                    
            if img:
                img_url = img[0]
                # 如果不是http/https开头，补全为完整站点URL
                if not img_url.startswith(('http://', 'https://')):
                    img_url = urljoin(site_url, img_url.lstrip('/'))
                medal['imageSmall'] = img_url
                
            # 描述
            description = info_div.xpath(".//p[contains(@style, 'display: flex')]/text()")
            if description:
                medal['description'] = description[0].strip()
                
            # 有效期
            validity = info_div.xpath(".//p[not(@style)]/text()")
            if validity:
                medal['validity'] = validity[0].strip()
                
            # 解析属性表格
            medal_details = info_div.xpath(".//table[@class='medal-details']//tr")
            for row in medal_details:
                cells = row.xpath(".//td/text()")
                if len(cells) == 2:
                    key, value = cells[0].strip(), cells[1].strip()
                    
                    if "蝌蚪加成" in key:
                        medal['bonus_rate'] = value
                    elif "加成有效期" in key:
                        medal['validity_period'] = value
                    elif "价格" in key:
                        try:
                            medal['price'] = int(value.replace(',', ''))
                        except ValueError:
                            medal['price'] = 0
                    elif "库存" in key:
                        medal['stock'] = value
                    elif "赠送手续费" in key:
                        medal['gift_fee'] = value
                        
            # 购买状态
            buy_btn = info_div.xpath(".//input[@type='button']/@value")
            if buy_btn:
                medal['purchase_status'] = buy_btn[0]
                
            # 站点信息
            medal['site'] = site_name
            # 货币单位
            medal['currency'] = '蝌蚪'
            # 分组信息
            if group_name:
                medal['group'] = group_name
            
            return self._format_medal_data(medal)
            
        except Exception as e:
            logger.error(f"处理勋章项数据时发生错误: {str(e)}")
            return None 