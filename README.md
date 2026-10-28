# MoviePilot-Plugins

自用 MoviePilot 插件仓库，基于 [WChangfei/MoviePilot-Plugins](https://github.com/WChangfei/MoviePilot-Plugins) 同步并修复优化。

## 插件列表

| 插件 | 说明 | 版本 |
|------|------|------|
| DoubanRankV3 | 豆瓣榜单订阅V3：监控豆瓣热门榜单，自动添加订阅。修复官方插件无法识别媒体信息的问题，支持豆瓣ID精确识别（失败自动回退标题识别） | 1.1.7 |
| PlexComplete | Plex剧集补全：检查媒体库中的电视剧，对比TMDB集数，自动添加订阅补全缺失剧集 | 1.1.7 |

## 安装方法

1. 打开 MoviePilot，进入「插件市场」页面；
2. 点击右上角「自定义插件仓库」，添加本仓库地址：

   ```
   https://github.com/shmglang/MoviePilot-Plugins
   ```

3. 刷新插件市场，找到对应插件安装启用。

## 修复与优化说明

- 统一插件版本号（DoubanRankV3 / PlexComplete 均为 1.1.7）
- 移除无对应代码的 `HongGuoSubscribe` 无效声明，避免插件市场加载报错
- 恢复 DoubanRankV3 的豆瓣ID精确识别逻辑，识别失败时自动回退标题匹配，降低误识别率
- 历史记录查重由列表遍历优化为集合查询，处理大批量榜单时性能提升
- 补齐作者主页等元信息

## 目录结构

```
├── package.v2.json          # 插件市场清单
├── icons/                   # 插件图标
└── plugins.v2/
    ├── doubanrankv3/        # 豆瓣榜单订阅V3
    └── plexcomplete/        # Plex剧集补全
```
