# 自动订阅助手 (AutomaticSubscriptionAssistant)

统一聚合豆瓣榜单、猫眼榜单、热门媒体、Mikan 季度新番、奈飞 Top10、AniList 动画榜以及主流音乐榜单，
按来源独立调度、过滤、通知，并自动走 MoviePilot 订阅管线落地。支持订阅历史、黑名单与多身份查重。

- 作者：shmglang
- 版本：v3.4.2
- 插件 ID：`AutomaticSubscriptionAssistant`
- 适用：MoviePilot >= 3.0.3（v3 插件结构）
- 仓库：https://github.com/shmglang/MoviePilot-Plugins

## 安装

插件市场添加仓库地址：

```
https://github.com/shmglang/MoviePilot-Plugins
```

随后在「订阅」分类中找到「自动订阅助手」安装即可。

## 主要能力

- 多来源聚合：豆瓣、猫眼、热门媒体、Mikan、奈飞、AniList、Spotify/Apple Music/网易云/腾讯音乐
- 各来源独立 Cron 调度、独立规则与启停、独立运行通知开关
- 榜单规则弹窗配置：筛选条件、获取数量、年份与类型限制
- 订阅历史管理：搜索、编辑、重置、退订与订阅活动查看
- 黑名单：手动添加、从历史加入、退订并加入黑名单
- 多身份归一查重：TMDB / 豆瓣 / Bangumi 跨源去重，避免重复订阅
- 配置异常隔离：单个来源异常不影响其他来源运行，异常来源单独暂停
- 一键还原默认配置：还原前自动备份，保留历史、黑名单与已有订阅

## 更新记录

见仓库 `package.v3.json` 中该插件的 `history` 字段。
