import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {resolveComponent:_resolveComponent,createVNode:_createVNode,toDisplayString:_toDisplayString,createElementVNode:_createElementVNode,normalizeClass:_normalizeClass,openBlock:_openBlock,createElementBlock:_createElementBlock,createCommentVNode:_createCommentVNode,createBlock:_createBlock,renderList:_renderList,Fragment:_Fragment,createTextVNode:_createTextVNode,normalizeStyle:_normalizeStyle} = await importShared('vue');


const _hoisted_1 = { class: "asa-dash" };
const _hoisted_2 = {
  key: 0,
  class: "asa-dash__head"
};
const _hoisted_3 = { class: "asa-dash__brand" };
const _hoisted_4 = { class: "asa-dash__head-copy" };
const _hoisted_5 = { class: "asa-dash__title" };
const _hoisted_6 = { class: "asa-dash__subtitle" };
const _hoisted_7 = { class: "asa-dash__head-actions" };
const _hoisted_8 = ["aria-label"];
const _hoisted_9 = { class: "asa-dash__metrics" };
const _hoisted_10 = {
  key: 2,
  class: "asa-dash__state",
  role: "alert"
};
const _hoisted_11 = { class: "asa-state-ico asa-state-ico--error" };
const _hoisted_12 = { class: "asa-state__text" };
const _hoisted_13 = {
  key: 3,
  class: "asa-dash__body"
};
const _hoisted_14 = {
  key: 0,
  class: "asa-dash__notice",
  role: "alert"
};
const _hoisted_15 = { class: "asa-dash__metrics" };
const _hoisted_16 = ["title"];
const _hoisted_17 = { class: "asa-dash__metric-value" };
const _hoisted_18 = {
  key: 0,
  class: "asa-dash__metric-hint"
};
const _hoisted_19 = ["aria-label"];
const _hoisted_20 = { class: "asa-dash__running-title" };
const _hoisted_21 = {
  key: 2,
  class: "asa-donut"
};
const _hoisted_22 = ["aria-label"];
const _hoisted_23 = { class: "asa-donut__hole" };
const _hoisted_24 = { class: "asa-donut__num" };
const _hoisted_25 = { class: "asa-donut__cap" };
const _hoisted_26 = { class: "asa-legend" };
const _hoisted_27 = { class: "asa-legend__label" };
const _hoisted_28 = { class: "asa-legend__val" };
const _hoisted_29 = {
  key: 3,
  class: "asa-dash__empty-history"
};
const _hoisted_30 = { class: "asa-sources" };
const _hoisted_31 = { class: "asa-sources__head" };
const _hoisted_32 = { class: "asa-sources__title" };
const _hoisted_33 = { class: "asa-sources__count" };
const _hoisted_34 = { class: "asa-sources__chips" };
const _hoisted_35 = {
  key: 0,
  class: "asa-sources__empty"
};
const _hoisted_36 = {
  key: 4,
  class: "asa-recent"
};
const _hoisted_37 = { class: "asa-recent__head" };
const _hoisted_38 = { class: "asa-recent__list" };
const _hoisted_39 = ["src", "onError"];
const _hoisted_40 = {
  key: 1,
  class: "asa-recent__poster asa-recent__poster--ph"
};
const _hoisted_41 = { class: "asa-recent__meta" };
const _hoisted_42 = ["title"];
const _hoisted_43 = { class: "asa-recent__sub" };
const _hoisted_44 = { class: "asa-dash__footer" };
const _hoisted_45 = ["href"];
const _hoisted_46 = ["datetime"];

const {computed,getCurrentInstance,onMounted,onUnmounted,reactive,ref,watch} = await importShared('vue');


const PLUGIN = 'plugin/AutomaticSubscriptionAssistant';

const _sfc_main = {
  __name: 'Dashboard',
  props: {
  config: { type: Object, default: () => ({}) },
  allowRefresh: { type: Boolean, default: true },
  api: { type: Object, default: () => ({}) },
},
  setup(__props) {

const props = __props;
const MSG = {
  'zh-CN': {
    title: '自动订阅助手', subtitle: '订阅概览', cap: '保留历史', sources: '来源', subscriptions: '插件订阅', blacklist: '黑名单', history: '历史记录',
    enabled: '已启用', disabled: '已停用', enabledOf: '{a} / {b} 启用', noSources: '无可用来源', recent: '最近订阅',
    emptyHint: '暂无处理历史，启用来源并运行后展示结果分布', running: '正在运行', processedN: '已处理 {n} 项', pausedN: '已暂停 {n} 项', historyN: '当前保留 {n} 条历史记录',
    open: '打开插件', updated: '更新于', loading: '正在加载概览', retry: '重试', refresh: '刷新', apiUnavailable: 'API 不可用', loadError: '数据加载失败：',
    movie: '电影', tv: '剧集', group: '剧集组', unknown: '未知',
    'provider.douban': '豆瓣榜单', 'provider.maoyan': '猫眼榜单', 'provider.popular': '热门媒体', 'provider.mikan': 'Mikan 季度新番', 'provider.netflix': '奈飞榜单',
    'st.subscribed': '已订阅', 'st.media_exists': '媒体库已存在', 'st.subscription_exists': '订阅已存在', 'st.blacklisted': '已忽略',
    'st.filtered': '被过滤', 'st.unrecognized': '未识别', 'st.already_handled': '已处理', 'st.error': '异常', 'st.other': '其他',
  },
  'zh-TW': {
    title: '自動訂閱助手', subtitle: '訂閱概覽', cap: '保留歷史', sources: '來源', subscriptions: '外掛訂閱', blacklist: '黑名單', history: '歷史記錄',
    enabled: '已啟用', disabled: '已停用', enabledOf: '{a} / {b} 啟用', noSources: '無可用來源', recent: '最近訂閱',
    emptyHint: '暫無處理歷史，啟用來源並執行後顯示結果分布', running: '正在執行', processedN: '已處理 {n} 項', pausedN: '已暫停 {n} 項', historyN: '目前保留 {n} 筆歷史記錄',
    open: '開啟外掛', updated: '更新於', loading: '正在載入概覽', retry: '重試', refresh: '重新整理', apiUnavailable: 'API 無法使用', loadError: '資料載入失敗：',
    movie: '電影', tv: '劇集', group: '劇集組', unknown: '未知',
    'provider.douban': '豆瓣榜單', 'provider.maoyan': '貓眼榜單', 'provider.popular': '熱門媒體', 'provider.mikan': 'Mikan 季度新番', 'provider.netflix': '奈飛榜單',
    'st.subscribed': '已訂閱', 'st.media_exists': '媒體庫已存在', 'st.subscription_exists': '訂閱已存在', 'st.blacklisted': '已忽略',
    'st.filtered': '被過濾', 'st.unrecognized': '未識別', 'st.already_handled': '已處理', 'st.error': '異常', 'st.other': '其他',
  },
  'en-US': {
    title: 'Auto Subscribe', subtitle: 'Overview', cap: 'History', sources: 'Sources', subscriptions: 'Subscriptions', blacklist: 'Blacklist', history: 'History',
    enabled: 'Enabled', disabled: 'Disabled', enabledOf: '{a} / {b} enabled', noSources: 'No sources', recent: 'Recent subscriptions',
    emptyHint: 'No history yet. Enable and run a source to see the result distribution.', running: 'Running', processedN: '{n} processed', pausedN: '{n} paused', historyN: '{n} retained history records',
    open: 'Open plugin', updated: 'Updated', loading: 'Loading overview', retry: 'Retry', refresh: 'Refresh', apiUnavailable: 'API unavailable', loadError: 'Failed to load data: ',
    movie: 'Movie', tv: 'TV series', group: 'Episode group', unknown: 'Unknown',
    'provider.douban': 'Douban', 'provider.maoyan': 'Maoyan', 'provider.popular': 'Popular media', 'provider.mikan': 'Mikan seasonal anime', 'provider.netflix': 'Netflix',
    'st.subscribed': 'Subscribed', 'st.media_exists': 'In library', 'st.subscription_exists': 'Already subscribed', 'st.blacklisted': 'Ignored',
    'st.filtered': 'Filtered', 'st.unrecognized': 'Unrecognized', 'st.already_handled': 'Handled', 'st.error': 'Error', 'st.other': 'Other',
  },
};
const inst = getCurrentInstance();
const locale = computed(() => {
  const raw = inst?.appContext?.config?.globalProperties?.$i18n?.locale;
  const lang = String(raw?.value || raw || '').toLowerCase();
  return lang.startsWith('en') ? 'en-US' : /tw|hant|hk/.test(lang) ? 'zh-TW' : 'zh-CN'
});
function t(key, params) {
  let text = MSG[locale.value][key] || key;
  if (params) for (const key in params) text = text.replaceAll(`{${key}}`, params[key]);
  return text
}
const STATUS_COLORS = { subscribed: 'success', media_exists: 'info', subscription_exists: 'primary', blacklisted: 'secondary', filtered: 'warning', unrecognized: 'secondary', already_handled: 'secondary', error: 'error' };
const loading = ref(true);
const error = ref('');
const hasData = ref(false);
const enabled = ref(false);
const counts = ref({ history: 0, subscriptions: 0, paused: 0, blacklist: 0 });
const byStatus = ref({});
const providers = ref([]);
const running = ref([]);
const recent = ref([]);
const failed = reactive({});
const lastUpdated = ref(0);
const bordered = computed(() => props.config?.attrs?.border !== false);
const refreshSecs = computed(() => number(props.config?.attrs?.refresh));
const pluginHref = computed(() => `#/plugin-app/${encodeURIComponent(props.config?.id || 'AutomaticSubscriptionAssistant')}/main`);
const updatedLabel = computed(() => lastUpdated.value ? new Date(lastUpdated.value).toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' }) : '');
const historyCount = computed(() => counts.value.history);
const enabledProviders = computed(() => providers.value.filter(provider => provider.enabled));
const metrics = computed(() => [
  { key: 'subscriptions', label: t('subscriptions'), count: counts.value.subscriptions, icon: 'mdi-bell-ring-outline' },
  { key: 'blacklist', label: t('blacklist'), count: counts.value.blacklist, icon: 'mdi-cancel' },
  { key: 'history', label: t('history'), count: historyCount.value, icon: 'mdi-history' },
]);
function number(value) {
  const result = Number(value);
  return Number.isFinite(result) && result > 0 ? result : 0
}
const segments = computed(() => {
  const rows = Object.entries(STATUS_COLORS).map(([key, color]) => ({ key, color, count: number(byStatus.value[key]), label: t('st.' + key) })).filter(row => row.count);
  const known = rows.reduce((sum, row) => sum + row.count, 0);
  if (historyCount.value > known) rows.push({ key: 'other', color: 'secondary', count: historyCount.value - known, label: t('st.other') });
  return { rows, sum: rows.reduce((sum, row) => sum + row.count, 0) }
});
function cssColor(color) { return `rgb(var(--v-theme-${color}))` }
const donutStyle = computed(() => {
  if (!segments.value.sum) return { background: 'rgba(var(--v-theme-on-surface), 0.08)' }
  let position = 0;
  const stops = segments.value.rows.map(row => {
    const start = position / segments.value.sum * 100;
    position += row.count;
    return `${cssColor(row.color)} ${start}% ${position / segments.value.sum * 100}%`
  });
  return { background: `conic-gradient(${stops.join(', ')})` }
});
function pct(count) { return segments.value.sum ? Math.round(count / segments.value.sum * 100) : 0 }
function providerName(provider) {
  const key = 'provider.' + provider.provider_id;
  return MSG[locale.value][key] || provider.provider_name || provider.name || provider.provider_id
}
function mediaName(item) {
  const parts = [item.title || t('unknown')];
  if (item.type === '电视剧' && item.season != null) parts.push(`S${String(item.season).padStart(2, '0')}`);
  if (item.episode_group) parts.push(`${t('group')}: ${item.episode_group}`);
  return parts.join(' · ')
}
function recentInfo(item) {
  const type = item.type === '电视剧' ? t('tv') : item.type === '电影' ? t('movie') : item.type;
  return [item.year, type, item.time].filter(Boolean).join(' · ') || '—'
}
let timer = null;
let inFlight = false;
let disposed = false;
function clearTimer() { if (timer !== null) clearTimeout(timer); timer = null; }
function setupTimer() {
  clearTimer();
  if (!disposed && !inFlight && props.allowRefresh && refreshSecs.value) timer = setTimeout(fetchData, refreshSecs.value * 1000);
}
function stopRefresh() { disposed = true; clearTimer(); }
async function fetchData() {
  if (inFlight || disposed) return
  clearTimer();
  inFlight = true;
  loading.value = true;
  error.value = '';
  try {
    if (typeof props.api?.get !== 'function') throw new Error(t('apiUnavailable'))
    const result = await props.api.get(`${PLUGIN}/dashboard?lang=${encodeURIComponent(locale.value)}`);
    if (disposed) return
    if (result?.code !== 0) throw new Error(result?.message || t('unknown'))
    counts.value = Object.fromEntries(['history', 'subscriptions', 'paused', 'blacklist'].map(key => [key, number(result.counts?.[key])]));
    byStatus.value = result.stats?.by_status || {};
    providers.value = Array.isArray(result.providers) ? result.providers : [];
    running.value = Array.isArray(result.running) ? result.running : [];
    recent.value = Array.isArray(result.recent) ? result.recent.slice(0, 5) : [];
    enabled.value = !!result.enabled;
    Object.keys(failed).forEach(key => delete failed[key]);
    lastUpdated.value = Date.now();
    hasData.value = true;
  } catch (e) { if (!disposed) error.value = t('loadError') + (e?.message || String(e)); }
  finally {
    inFlight = false;
    if (!disposed) { loading.value = false; setupTimer(); }
  }
}
watch([() => props.allowRefresh, refreshSecs], setupTimer);
onMounted(fetchData);
onUnmounted(stopRefresh);

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent("v-icon");
  const _component_v_btn = _resolveComponent("v-btn");

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      class: _normalizeClass(["asa-dash__surface", { 'asa-dash__surface--flat': !bordered.value }])
    }, [
      (bordered.value)
        ? (_openBlock(), _createElementBlock("header", _hoisted_2, [
            _createElementVNode("div", _hoisted_3, [
              _createVNode(_component_v_icon, {
                icon: "mdi-rss",
                size: "22",
                color: "primary"
              }),
              _createElementVNode("div", _hoisted_4, [
                _createElementVNode("h3", _hoisted_5, _toDisplayString(t('title')), 1),
                _createElementVNode("p", _hoisted_6, _toDisplayString(t('subtitle')), 1)
              ])
            ]),
            _createElementVNode("div", _hoisted_7, [
              (hasData.value)
                ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: _normalizeClass(["asa-chip", { 'asa-chip--on': enabled.value }])
                  }, _toDisplayString(t(enabled.value ? 'enabled' : 'disabled')), 3))
                : _createCommentVNode("", true),
              (__props.allowRefresh)
                ? (_openBlock(), _createBlock(_component_v_btn, {
                    key: 1,
                    loading: loading.value,
                    "aria-label": t('refresh'),
                    class: "asa-dash__refresh",
                    icon: "mdi-refresh",
                    size: "small",
                    variant: "text",
                    onClick: fetchData
                  }, null, 8, ["loading", "aria-label"]))
                : _createCommentVNode("", true)
            ])
          ]))
        : _createCommentVNode("", true),
      (loading.value && !hasData.value)
        ? (_openBlock(), _createElementBlock("div", {
            key: 1,
            class: "asa-dash__body",
            "aria-label": t('loading'),
            "aria-busy": "true"
          }, [
            _createElementVNode("div", _hoisted_9, [
              (_openBlock(), _createElementBlock(_Fragment, null, _renderList(3, (n) => {
                return _createElementVNode("div", {
                  key: n,
                  class: "asa-skel asa-skel--metric"
                })
              }), 64))
            ]),
            _cache[0] || (_cache[0] = _createElementVNode("div", { class: "asa-skel asa-skel--line" }, null, -1)),
            _cache[1] || (_cache[1] = _createElementVNode("div", { class: "asa-skel asa-skel--line short" }, null, -1))
          ], 8, _hoisted_8))
        : (!hasData.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_10, [
              _createElementVNode("div", _hoisted_11, [
                _createVNode(_component_v_icon, {
                  icon: "mdi-alert-circle-outline",
                  size: "22"
                })
              ]),
              _createElementVNode("p", _hoisted_12, _toDisplayString(error.value), 1),
              _createElementVNode("button", {
                class: "asa-state__btn",
                type: "button",
                onClick: fetchData
              }, _toDisplayString(t('retry')), 1)
            ]))
          : (_openBlock(), _createElementBlock("div", _hoisted_13, [
              (error.value)
                ? (_openBlock(), _createElementBlock("div", _hoisted_14, _toDisplayString(error.value), 1))
                : _createCommentVNode("", true),
              _createElementVNode("div", _hoisted_15, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(metrics.value, (metric) => {
                  return (_openBlock(), _createElementBlock("div", {
                    key: metric.key,
                    class: "asa-dash__metric"
                  }, [
                    _createElementVNode("div", {
                      class: "asa-dash__metric-label",
                      title: metric.label
                    }, [
                      _createVNode(_component_v_icon, {
                        icon: metric.icon,
                        size: "15"
                      }, null, 8, ["icon"]),
                      _createTextVNode(_toDisplayString(metric.label), 1)
                    ], 8, _hoisted_16),
                    _createElementVNode("strong", _hoisted_17, _toDisplayString(metric.count), 1),
                    (metric.key === 'subscriptions' && counts.value.paused)
                      ? (_openBlock(), _createElementBlock("span", _hoisted_18, _toDisplayString(t('pausedN', { n: counts.value.paused })), 1))
                      : _createCommentVNode("", true)
                  ]))
                }), 128))
              ]),
              (running.value.length)
                ? (_openBlock(), _createElementBlock("section", {
                    key: 1,
                    class: "asa-dash__running",
                    "aria-label": t('running')
                  }, [
                    _createElementVNode("div", _hoisted_20, [
                      _createVNode(_component_v_icon, {
                        icon: "mdi-progress-clock",
                        size: "16"
                      }),
                      _createTextVNode(_toDisplayString(t('running')), 1)
                    ]),
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(running.value, (task) => {
                      return (_openBlock(), _createElementBlock("div", {
                        key: task.provider_id,
                        class: "asa-dash__running-row"
                      }, [
                        _createElementVNode("span", null, _toDisplayString(providerName(task)), 1),
                        _createElementVNode("strong", null, _toDisplayString(t('processedN', { n: number(task.processed) })), 1)
                      ]))
                    }), 128))
                  ], 8, _hoisted_19))
                : _createCommentVNode("", true),
              (historyCount.value)
                ? (_openBlock(), _createElementBlock("div", _hoisted_21, [
                    _createElementVNode("div", {
                      class: "asa-donut__ring",
                      style: _normalizeStyle(donutStyle.value),
                      role: "img",
                      "aria-label": t('historyN', { n: historyCount.value })
                    }, [
                      _createElementVNode("div", _hoisted_23, [
                        _createElementVNode("span", _hoisted_24, _toDisplayString(historyCount.value), 1),
                        _createElementVNode("span", _hoisted_25, _toDisplayString(t('cap')), 1)
                      ])
                    ], 12, _hoisted_22),
                    _createElementVNode("ul", _hoisted_26, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(segments.value.rows, (row) => {
                        return (_openBlock(), _createElementBlock("li", {
                          key: row.key,
                          class: "asa-legend__item"
                        }, [
                          _createElementVNode("span", {
                            class: "asa-legend__dot",
                            style: _normalizeStyle({ background: cssColor(row.color) })
                          }, null, 4),
                          _createElementVNode("span", _hoisted_27, _toDisplayString(row.label), 1),
                          _createElementVNode("span", _hoisted_28, _toDisplayString(row.count) + " · " + _toDisplayString(pct(row.count)) + "%", 1)
                        ]))
                      }), 128))
                    ])
                  ]))
                : (_openBlock(), _createElementBlock("p", _hoisted_29, _toDisplayString(t('emptyHint')), 1)),
              _createElementVNode("section", _hoisted_30, [
                _createElementVNode("div", _hoisted_31, [
                  _createElementVNode("span", _hoisted_32, _toDisplayString(t('sources')), 1),
                  _createElementVNode("span", _hoisted_33, _toDisplayString(t('enabledOf', { a: enabledProviders.value.length, b: providers.value.length })), 1)
                ]),
                _createElementVNode("div", _hoisted_34, [
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(providers.value, (provider) => {
                    return (_openBlock(), _createElementBlock("span", {
                      key: provider.provider_id,
                      class: _normalizeClass(["asa-chip", { 'asa-chip--on': provider.enabled }])
                    }, [
                      _createVNode(_component_v_icon, {
                        icon: provider.enabled ? 'mdi-check-circle' : 'mdi-circle-outline',
                        size: "13"
                      }, null, 8, ["icon"]),
                      _createTextVNode(_toDisplayString(providerName(provider)), 1)
                    ], 2))
                  }), 128)),
                  (!providers.value.length)
                    ? (_openBlock(), _createElementBlock("span", _hoisted_35, _toDisplayString(t('noSources')), 1))
                    : _createCommentVNode("", true)
                ])
              ]),
              (recent.value.length)
                ? (_openBlock(), _createElementBlock("section", _hoisted_36, [
                    _createElementVNode("div", _hoisted_37, _toDisplayString(t('recent')), 1),
                    _createElementVNode("ul", _hoisted_38, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(recent.value.slice(0, 5), (item) => {
                        return (_openBlock(), _createElementBlock("li", {
                          key: item.unique,
                          class: "asa-recent__item"
                        }, [
                          (item.poster && !failed[item.unique])
                            ? (_openBlock(), _createElementBlock("img", {
                                key: 0,
                                class: "asa-recent__poster",
                                src: item.poster,
                                alt: "",
                                loading: "lazy",
                                onError: $event => (failed[item.unique] = true)
                              }, null, 40, _hoisted_39))
                            : (_openBlock(), _createElementBlock("span", _hoisted_40, [
                                _createVNode(_component_v_icon, {
                                  icon: "mdi-movie-open-outline",
                                  size: "16"
                                })
                              ])),
                          _createElementVNode("div", _hoisted_41, [
                            _createElementVNode("span", {
                              class: "asa-recent__name",
                              title: mediaName(item)
                            }, _toDisplayString(mediaName(item)), 9, _hoisted_42),
                            _createElementVNode("span", _hoisted_43, _toDisplayString(recentInfo(item)), 1)
                          ])
                        ]))
                      }), 128))
                    ])
                  ]))
                : _createCommentVNode("", true)
            ])),
      _createElementVNode("footer", _hoisted_44, [
        _createElementVNode("a", {
          class: "asa-dash__open",
          href: pluginHref.value
        }, [
          _createVNode(_component_v_icon, {
            icon: "mdi-open-in-new",
            size: "15"
          }),
          _createTextVNode(_toDisplayString(t('open')), 1)
        ], 8, _hoisted_45),
        (lastUpdated.value)
          ? (_openBlock(), _createElementBlock("time", {
              key: 0,
              datetime: new Date(lastUpdated.value).toISOString(),
              class: "asa-dash__updated"
            }, _toDisplayString(t('updated')) + " " + _toDisplayString(updatedLabel.value), 9, _hoisted_46))
          : _createCommentVNode("", true),
        (!bordered.value && __props.allowRefresh)
          ? (_openBlock(), _createBlock(_component_v_btn, {
              key: 1,
              loading: loading.value,
              "aria-label": t('refresh'),
              icon: "mdi-refresh",
              size: "small",
              variant: "text",
              onClick: fetchData
            }, null, 8, ["loading", "aria-label"]))
          : _createCommentVNode("", true)
      ])
    ], 2)
  ]))
}
}

};
const DashboardComponent = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-934c3db5"]]);

export { DashboardComponent as default };
