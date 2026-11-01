from typing import Dict, List, Optional
import re
from app.log import logger
from lxml import etree
from .base import BaseMedalHandler
from urllib.parse import urljoin, parse_qs, urlparse

class OffMedalReminderHandler(BaseMedalHandler):
    """自由农场站点勋章处理器"""
    
    def match(self, site) -> bool:
        """判断是否为自由农场站点"""
        site_name = site.name.lower()
        site_url = site.url.lower()
        return "自由农场" in site_name or "自由农场" in site_url

    def fetch_user_medals(self, site) -> List[Dict]:
        """获取 自由农场 Off 用户已拥有勋章"""
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
            logger.error(f"获取 自由农场 Off 用户已拥有勋章失败: {e}")
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
            logger.error(f"解析 自由农场 Off 用户勋章HTML出错: {e}")
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
        """获取自由农场站点勋章数据"""
        try:
            site_name = site.name
            site_url = site.url
            site_cookie = site.cookie
            
            # 获取所有页面的勋章数据
            medals = []
            current_page = 0  # 从第0页开始
            
            while True:
                # 构建分页URL
                url = f"{site_url.rstrip('/')}/medal.php"
                logger.info(f"正在获取【{site_name}】站点勋章数据")

                if current_page > 0:
                    url = f"{url}?page={current_page}"
                
                logger.info(f"正在获取第 {current_page + 1} 页勋章数据")
                
                # 发送请求获取勋章页面
                res = self._request_with_retry(
                    url=url,
                    cookies=site_cookie
                )
                
                if not res:
                    logger.error(f"请求勋章页面失败！站点：{site_name}")
                    break
                    
                # 使用lxml解析HTML
                html = etree.HTML(res.text)
                
                # 获取勋章表格
                medal_table = html.xpath("//table[@class='main']//table[contains(@border, '1')]")
                if not medal_table:
                    logger.error("未找到勋章表格！")
                    break
                
                # 处理当前页面的勋章数据
                for row in medal_table[0].xpath(".//tr")[1:]:
                    try:
                        medal = self._process_medal_row(row, site_name, site_url)
                        if medal:
                            medals.append(medal)
                    except Exception as e:
                        logger.error(f"处理行数据时发生错误：{str(e)}")
                        continue
                
                # 检查是否有下一页
                next_page = html.xpath("//p[@class='nexus-pagination']//a[contains(., '下一页')]")
                if not next_page:
                    logger.info("未找到下一页链接，已到达最后一页")
                    break
                
                logger.info("找到下一页链接，准备获取下一页数据")
                    
                # 从href中提取页码
                next_href = next_page[0].get('href')
                if not next_href:
                    logger.error("下一页链接没有href属性")
                    break
                
                logger.info(f"下一页链接: {next_href}")
                    
                # 解析URL参数
                try:
                    parsed = urlparse(next_href)
                    params = parse_qs(parsed.query)
                    next_page_num = int(params.get('page', [0])[0])
                    
                    logger.info(f"解析到下一页页码: {next_page_num}")
                    
                    if next_page_num <= current_page:
                        logger.info("下一页页码小于等于当前页码，已到达最后一页")
                        break  # 防止循环
                    current_page = next_page_num
                except (ValueError, IndexError, AttributeError) as e:
                    logger.error(f"解析页码时发生错误: {str(e)}")
                    break
            
            logger.info(f"共获取到 {len(medals)} 个勋章数据")
            return medals
            
        except Exception as e:
            logger.error(f"处理自由农场站点勋章数据时发生错误: {str(e)}")
            return []

    def _process_medal_row(self, row, site_name: str, site_url: str) -> Dict:
        """处理单个勋章行数据"""
        cells = row.xpath(".//td")
        if len(cells) < 10:  # 确保有足够的列
            return None
            
        medal = {}
        
        # ID
        medal['id'] = cells[0].text.strip()
        
        # 图片
        img = cells[1].xpath(".//img/@src")
        if img:
            img_url = img[0]
            # 如果不是http/https开头，补全为完整站点URL
            if not img_url.startswith('http'):
                img_url = urljoin(site_url, img_url.lstrip('/'))
            medal['imageSmall'] = img_url
            
        # 名称和描述
        name = ''
        description = ''
        h1_nodes = cells[2].xpath('./h1')
        if h1_nodes:
            name = h1_nodes[0].text.strip() if h1_nodes[0].text else ''
            description = h1_nodes[0].tail.strip() if h1_nodes[0].tail and h1_nodes[0].tail.strip() else ''
        else:
            description = ''.join(cells[2].xpath('.//text()')).strip()
        medal['name'] = name
        medal['description'] = description
        
        # 可购买时间
        time_text = cells[3].xpath(".//text()")
        if time_text:
            time_text = [t.strip() for t in time_text if t.strip()]
            if len(time_text) >= 2:
                medal['saleBeginTime'] = time_text[0]
                medal['saleEndTime'] = time_text[1]
                
        # 有效期
        validity = cells[4].xpath(".//text()")
        if validity:
            medal['validity'] = validity[0].strip()
            
        # 魔力加成
        bonus = cells[5].xpath(".//text()")
        if bonus:
            medal['bonus_rate'] = bonus[0].strip()
            
        # 价格
        price = cells[6].xpath(".//text()")
        if price:
            price_text = price[0].strip().replace(',', '')
            try:
                medal['price'] = int(price_text)
            except ValueError:
                medal['price'] = 0
                
        # 库存
        stock = cells[7].xpath(".//text()")
        if stock:
            medal['stock'] = stock[0].strip()
            
        # 购买状态
        buy_btn = cells[8].xpath(".//input/@value")
        if buy_btn:
            medal['purchase_status'] = buy_btn[0]
            
        # 赠送状态
        gift_btn = cells[9].xpath(".//input/@value")
        if gift_btn:
            medal['gift_status'] = gift_btn[0]
            
        # 站点信息
        medal['site'] = site_name
        
        return self._format_medal_data(medal) 