# MoviePilot-Plugins

自用 MoviePilot 插件仓库。

`package.v2.json` + `plugins.v2/` 供 MoviePilot v2 使用，`package.v3.json` + `plugins.v3/` 供 MoviePilot v3 使用；v3 只读取 v3 清单位置。

## 插件列表

| 插件 | 说明 | 版本 |
|------|------|------|
| delete | 自动删除：删除 qb、tr 中 tracker 长期无法访问的下载任务 | 1.1.3 |
| hongguosubscribe | 红果短剧订阅：定时从红果短剧网站获取短剧榜单，自动搜索并下载或订阅短剧 | 1.1.0 |
| medalreminder | 勋章购买提醒：定时抓取各站点勋章数据，统计勋章数量，推送可购买勋章提醒 | 1.1.0 |
| sitedailystatistic | 站点每日数据统计：站点统计数据图表及当天累计站点数据通知 | 4.0.1 |
| AutomaticSubscriptionAssistant | 自动订阅助手：聚合豆瓣/猫眼/Mikan/奈飞/AniList 及主流音乐榜单，按来源独立调度、过滤、通知并自动订阅 | 3.4.2 |

## 安装方法

1. 打开 MoviePilot，进入「插件市场」页面；
2. 点击右上角「自定义插件仓库」，添加本仓库地址：

   ```
   https://github.com/shmglang/MoviePilot-Plugins
   ```

3. 刷新插件市场，找到目标插件安装启用。

> MoviePilot v3 请确保添加的是本仓库地址：插件市场会读取 `package.v3.json` 与 `plugins.v3/`。v3 下未登记在 `package.v3.json` 的插件会显示「文件丢失」。

## 插件说明

红果短剧订阅（hongguosubscribe）定时抓取红果短剧官网（https://hongguoduanju.com）的榜单页面，解析短剧标题、热度与评分，并按配置自动处理：

- **数据源**：默认监控短剧热播榜，每次仅处理榜单前10条；可切换/追加真人剧、漫剧、AI剧热播榜及自定义榜单地址；
- **处理方式**：
  - 自动：先识别媒体信息添加订阅，识别失败时回退按标题搜索并下载；
  - 仅搜索下载：直接按短剧标题在PT站点搜索资源并下载（优先体积最大的资源）；
  - 仅添加订阅：仅识别成功的短剧添加订阅；
- **过滤**：支持标题黑名单、最小热度（万）、最小评分过滤；
- **查重**：按短剧 series_id 记录处理历史，避免重复搜索下载；可在插件详情页手动删除单条历史后重试。

## 目录结构

```
├── package.v2.json          # v2 插件市场清单
├── package.v3.json          # v3 插件市场清单
├── icons/                   # 插件图标
├── plugins.v2/              # v2 插件源码
│   ├── hongguosubscribe/
│   └── medalreminder/
└── plugins.v3/              # v3 插件源码
    ├── automaticsubscriptionassistant/
    ├── delete/
    ├── hongguosubscribe/
    ├── medalreminder/
    └── sitedailystatistic/
```
