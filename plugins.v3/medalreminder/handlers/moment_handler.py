import re
from typing import Dict, List, Optional
from urllib.parse import urljoin

from lxml import etree

from app.log import logger
from .base import BaseMedalHandler

class MomentMedalReminderHandler(BaseMedalHandler):
    """Moment站点勋章处理器"""
    
    def match(self, site) -> bool:
        """判断是否为Moment站点"""
        site_name = site.name.lower()
        site_url = site.url.lower()
        return "moment" in site_name or "momentpt.top" in site_url
    
    def fetch_user_medals(self, site) -> List[Dict]:
        """获取 Moment 用户已拥有勋章"""
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
            logger.error(f"获取 Moment 用户已拥有勋章失败: {e}")
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
            logger.error(f"解析 Moment 用户勋章HTML出错: {e}")
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
            'currency': '魔力',
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
        """获取Moment站点勋章数据（含分组）"""
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
            
            # 获取所有分组标题
            category_headers = html.xpath("//div[@class='table-category-header']")
            if not category_headers:
                logger.error("未找到勋章分组标题！")
                return []
            
            logger.info(f"找到 {len(category_headers)} 个勋章分组")
            
            # 处理所有勋章数据
            medals = []
            
            # 遍历所有分组
            for header in category_headers:
                try:
                    # 获取分组名称
                    group_name_elements = header.xpath(".//div[@class='table-category-text']/h4/text()")
                    group_name = "默认分组"
                    if group_name_elements:
                        group_name = group_name_elements[0].strip()
                        logger.info(f"处理勋章分组: {group_name}")
                    
                    # 获取对应的表格
                    tables = header.xpath("following-sibling::table[@class='medal-table'][1]")
                    if not tables:
                        logger.warning(f"分组 [{group_name}] 未找到对应的表格")
                        continue
                        
                    # 获取该分组下的所有勋章行
                    medal_rows = tables[0].xpath(".//tbody/tr")
                    logger.info(f"分组 [{group_name}] 找到 {len(medal_rows)} 个勋章")
                    
                    for row in medal_rows:
                        try:
                            medal = self._process_medal_row(row, site_name, site_url, group_name)
                            if medal:
                                medals.append(medal)
                        except Exception as e:
                            logger.error(f"处理勋章数据时发生错误：{str(e)}")
                            continue
                            
                except Exception as e:
                    logger.error(f"处理勋章分组时发生错误：{str(e)}")
                    continue
            
            logger.info(f"共获取到 {len(medals)} 个勋章数据")
            return medals
            
        except Exception as e:
            logger.error(f"处理Moment站点勋章数据时发生错误: {str(e)}")
            return []
    
    def _process_medal_row(self, row, site_name: str, site_url: str, group_name: str = "") -> Dict:
        """处理单个勋章行数据"""
        cells = row.xpath(".//td")
        if len(cells) < 10:
            return None
        
        medal = {}
        
        # ID（第0列）
        medal_id = cells[0].xpath(".//text()")
        if medal_id:
            medal['medal_id'] = medal_id[0].strip()
        
        # 图片（第1列）
        img = cells[1].xpath(".//img/@src")
        if img:
            img_url = img[0]
            if not img_url.startswith('http'):
                img_url = urljoin(site_url + '/', img_url.lstrip('/'))
            medal['imageSmall'] = img_url
        
        # 名称和描述（第2列）
        h1_nodes = cells[2].xpath('./h1')
        if h1_nodes:
            name = h1_nodes[0].text.strip() if h1_nodes[0].text else ''
            medal['name'] = name
            # 描述在h1之后
            description = h1_nodes[0].tail.strip() if h1_nodes[0].tail and h1_nodes[0].tail.strip() else ''
            medal['description'] = description
        else:
            # 没有h1标签，整个内容作为描述
            description = ''.join(cells[2].xpath('.//text()')).strip()
            medal['description'] = description
        
        # 可购买时间（第3列）- 使用<br>分隔
        time_texts = cells[3].xpath(".//text()")
        if time_texts:
            time_texts = [t.strip() for t in time_texts if t.strip()]
            if len(time_texts) >= 2:
                # 第一个通常是 "不限 ~"
                medal['saleBeginTime'] = time_texts[0].replace(' ~', '').strip()
                medal['saleEndTime'] = time_texts[1].strip()
        
        # 有效期（第4列）
        validity = cells[4].xpath(".//text()")
        if validity:
            medal['validity'] = validity[0].strip()
        
        # 魔力加成（第5列）
        bonus = cells[5].xpath(".//text()")
        if bonus:
            medal['bonus_rate'] = bonus[0].strip()
        
        # 价格（第6列）
        price = cells[6].xpath(".//text()")
        if price:
            price_text = price[0].strip().replace(',', '')
            try:
                medal['price'] = int(price_text)
            except ValueError:
                medal['price'] = 0
        
        # 库存（第7列）
        stock = cells[7].xpath(".//text()")
        if stock:
            stock_text = stock[0].strip()
            medal['stock'] = stock_text
            # 如果显示库存数字，设置库存状态
            if stock_text.isdigit() and int(stock_text) <= 10 and int(stock_text) > 0:
                medal['stock_status'] = '库存紧张'
        
        # 购买状态（第8列）
        buy_btn = cells[8].xpath(".//input/@value")
        if buy_btn:
            medal['purchase_status'] = buy_btn[0]
        
        # 赠送状态和手续费（第9列）
        gift_btn = cells[9].xpath(".//input/@value")
        if gift_btn:
            medal['gift_status'] = gift_btn[0]
        
        # 手续费
        gift_fee = cells[9].xpath(".//span[@class='medal-gift-fee']/text()")
        if gift_fee:
            # 提取百分比: "手续费: 1000%" -> "1000%"
            fee_text = gift_fee[0].replace('手续费:', '').replace('手续费：', '').strip()
            medal['gift_fee'] = fee_text
        
        # 站点信息
        medal['site'] = site_name
        
        # 设置分组信息
        if group_name:
            medal['group'] = group_name
        
        return self._format_medal_data(medal)
