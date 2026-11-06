import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-pcqpp-6-.js';

const {createElementVNode:_createElementVNode$8,resolveComponent:_resolveComponent$8,openBlock:_openBlock$8,createBlock:_createBlock$6,createCommentVNode:_createCommentVNode$7,withModifiers:_withModifiers,createElementBlock:_createElementBlock$8,createVNode:_createVNode$8,toDisplayString:_toDisplayString$8,createTextVNode:_createTextVNode$6,normalizeStyle:_normalizeStyle$1,renderList:_renderList$5,Fragment:_Fragment$6,renderSlot:_renderSlot$1,withCtx:_withCtx$6,normalizeClass:_normalizeClass$4} = await importShared('vue');


const _hoisted_1$8 = ["checked"];
const _hoisted_2$8 = { class: "mc__checkbox" };
const _hoisted_3$7 = { class: "mc__poster" };
const _hoisted_4$5 = ["src", "alt"];
const _hoisted_5$4 = {
  key: 1,
  class: "mc__ph"
};
const _hoisted_6$4 = { class: "mc__body" };
const _hoisted_7$4 = ["title"];
const _hoisted_8$4 = { class: "mc__meta" };
const _hoisted_9$4 = ["title"];
const _hoisted_10$4 = { class: "mc__row-k" };
const _hoisted_11$3 = { class: "mc__row-v" };

const {ref: ref$7} = await importShared('vue');



const _sfc_main$8 = {
  __name: 'MediaCard',
  props: {
  poster: { type: String, default: '' },
  name: { type: String, default: '' },
  // 元数据行：[{ icon, label, value }]，value 已由父级填好（缺失为「未知」）
  lines: { type: Array, default: () => [] },
  // 状态徽标：{ label, color, icon }
  status: { type: Object, default: null },
  selectable: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  // 「更多」菜单按钮的无障碍名（父级按语言传入）
  moreLabel: { type: String, default: '更多' },
},
  emits: ['toggle'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const imgFailed = ref$7(false);

function onCardClick() {
  // 多选模式下，点整卡即切换选择（操作按钮区已 stop）
  if (props.selectable) emit('toggle');
}

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent$8("v-icon");
  const _component_v_btn = _resolveComponent$8("v-btn");
  const _component_v_list = _resolveComponent$8("v-list");
  const _component_v_menu = _resolveComponent$8("v-menu");

  return (_openBlock$8(), _createElementBlock$8("article", {
    class: _normalizeClass$4(['mc', { 'mc--selectable': __props.selectable, 'mc--selected': __props.selected }]),
    onClick: onCardClick
  }, [
    (__props.selectable)
      ? (_openBlock$8(), _createElementBlock$8("label", {
          key: 0,
          class: "mc__check",
          onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ["stop"]))
        }, [
          _createElementVNode$8("input", {
            type: "checkbox",
            checked: __props.selected,
            onChange: _cache[0] || (_cache[0] = $event => (emit('toggle')))
          }, null, 40, _hoisted_1$8),
          _createElementVNode$8("span", _hoisted_2$8, [
            (__props.selected)
              ? (_openBlock$8(), _createBlock$6(_component_v_icon, {
                  key: 0,
                  icon: "mdi-check",
                  size: "13"
                }))
              : _createCommentVNode$7("", true)
          ])
        ]))
      : _createCommentVNode$7("", true),
    _createElementVNode$8("div", _hoisted_3$7, [
      (__props.poster && !imgFailed.value)
        ? (_openBlock$8(), _createElementBlock$8("img", {
            key: 0,
            src: __props.poster,
            alt: __props.name,
            class: "mc__img",
            loading: "lazy",
            onError: _cache[2] || (_cache[2] = $event => (imgFailed.value = true))
          }, null, 40, _hoisted_4$5))
        : (_openBlock$8(), _createElementBlock$8("div", _hoisted_5$4, [
            _createVNode$8(_component_v_icon, {
              icon: "mdi-movie-open-outline",
              size: "26"
            })
          ])),
      (__props.status)
        ? (_openBlock$8(), _createElementBlock$8("span", {
            key: 2,
            class: "mc__badge",
            style: _normalizeStyle$1({ background: __props.status.color })
          }, [
            _createVNode$8(_component_v_icon, {
              icon: __props.status.icon,
              size: "11"
            }, null, 8, ["icon"]),
            _createTextVNode$6(" " + _toDisplayString$8(__props.status.label), 1)
          ], 4))
        : _createCommentVNode$7("", true)
    ]),
    _createElementVNode$8("div", _hoisted_6$4, [
      _createElementVNode$8("div", {
        class: "mc__title",
        title: __props.name
      }, _toDisplayString$8(__props.name), 9, _hoisted_7$4),
      _createElementVNode$8("ul", _hoisted_8$4, [
        (_openBlock$8(true), _createElementBlock$8(_Fragment$6, null, _renderList$5(__props.lines, (ln, i) => {
          return (_openBlock$8(), _createElementBlock$8("li", {
            key: i,
            class: "mc__row",
            title: `${ln.label}：${ln.value}`
          }, [
            _createVNode$8(_component_v_icon, {
              icon: ln.icon,
              size: "13",
              class: "mc__row-ico"
            }, null, 8, ["icon"]),
            _createElementVNode$8("span", _hoisted_10$4, _toDisplayString$8(ln.label), 1),
            _createElementVNode$8("span", _hoisted_11$3, _toDisplayString$8(ln.value), 1)
          ], 8, _hoisted_9$4))
        }), 128))
      ])
    ]),
    (_ctx.$slots.actions && !__props.selectable)
      ? (_openBlock$8(), _createElementBlock$8("div", {
          key: 1,
          class: "mc__more",
          onClick: _cache[3] || (_cache[3] = _withModifiers(() => {}, ["stop"]))
        }, [
          _createVNode$8(_component_v_btn, {
            "aria-label": __props.moreLabel,
            class: "mc__more-btn",
            icon: "mdi-dots-horizontal",
            size: "small",
            variant: "text"
          }, null, 8, ["aria-label"]),
          _createVNode$8(_component_v_menu, {
            activator: "parent",
            location: "top end",
            "close-on-content-click": true
          }, {
            default: _withCtx$6(() => [
              _createVNode$8(_component_v_list, {
                class: "mc__more-list",
                density: "compact",
                nav: ""
              }, {
                default: _withCtx$6(() => [
                  _renderSlot$1(_ctx.$slots, "actions", {}, undefined, true)
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]))
      : _createCommentVNode$7("", true)
  ], 2))
}
}

};
const MediaCard = /*#__PURE__*/_export_sfc(_sfc_main$8, [['__scopeId',"data-v-5c942846"]]);

const {renderList:_renderList$4,Fragment:_Fragment$5,openBlock:_openBlock$7,createElementBlock:_createElementBlock$7,toDisplayString:_toDisplayString$7,createCommentVNode:_createCommentVNode$6,resolveComponent:_resolveComponent$7,createVNode:_createVNode$7,createElementVNode:_createElementVNode$7,normalizeClass:_normalizeClass$3} = await importShared('vue');


const _hoisted_1$7 = {
  key: 0,
  class: "fp-item fp-item--search"
};
const _hoisted_2$7 = ["for"];
const _hoisted_3$6 = {
  key: 1,
  class: "fp-item fp-item--input"
};
const _hoisted_4$4 = ["for"];
const _hoisted_5$3 = {
  key: 1,
  class: "fp-hint"
};
const _hoisted_6$3 = {
  key: 2,
  class: "fp-item fp-item--year"
};
const _hoisted_7$3 = ["for"];
const _hoisted_8$3 = { class: "fp-year" };
const _hoisted_9$3 = {
  key: 3,
  class: "fp-item fp-item--select"
};
const _hoisted_10$3 = ["for"];

const {useId} = await importShared('vue');

/**
 * 通用筛选面板（内联横排 / 弹窗堆叠两种布局）。
 *
 * 设计约定：`state` 是父级拥有的**响应式对象**，本组件按 `fields` 配置对其字段做
 * 就地赋值（单一数据源，避免 draft 拷贝在多层来回同步）；每次变更后 `emit('change', field)`，
 * 由父级决定副作用（历史→防抖重取；管理→客户端 computed 自动响应 + 复位页码）。
 * 「留空即不过滤（全部）」：搜索='' / 年份=null / 多选=[] / 单选=null。
 */

const _sfc_main$7 = {
  __name: 'FilterPanel',
  props: {
  // 响应式筛选状态对象（父级 reactive），本组件就地写入其字段
  state: { type: Object, required: true },
  // 字段配置：
  //  { type:'search',     key, label, placeholder }
  //  { type:'text'|'number', key, label, placeholder, hint, icon, min, max, step, clearable }
  //  { type:'year-range', keyMin, keyMax, label, minText, maxText }
  //  { type:'select',     key, label, items:[{title,value}], multi, icon, allText }
  fields: { type: Array, default: () => [] },
  // 堆叠布局（弹窗内每字段独占一行并带标题），否则内联横排
  stacked: { type: Boolean, default: false },
},
  emits: ['change'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;

// 为控件生成稳定唯一 id，供可见 <label for> 关联（无障碍：每个筛选控件有可区分的可访问名）
const uid = useId();
const fid = k => `${uid}-${k}`;

function set(key, value, field) {
  props.state[key] = value;
  emit('change', field);
}

// 空串/NaN → null（不过滤）；否则取整年份
function toYear(v) {
  if (v === null || v === undefined || v === '') return null
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null
}

// 多选：v-select 清空时可能给 null，统一规整为数组；单选清空给 null
function normalize(v, field) {
  if (field.multi) return Array.isArray(v) ? v : (v == null ? [] : [v])
  return v ?? null
}

return (_ctx, _cache) => {
  const _component_v_text_field = _resolveComponent$7("v-text-field");
  const _component_v_select = _resolveComponent$7("v-select");

  return (_openBlock$7(), _createElementBlock$7("div", {
    class: _normalizeClass$3(["fp", { 'fp--stacked': __props.stacked }])
  }, [
    (_openBlock$7(true), _createElementBlock$7(_Fragment$5, null, _renderList$4(__props.fields, (field) => {
      return (_openBlock$7(), _createElementBlock$7(_Fragment$5, {
        key: field.key || field.keyMin
      }, [
        (field.type === 'search')
          ? (_openBlock$7(), _createElementBlock$7("div", _hoisted_1$7, [
              (__props.stacked)
                ? (_openBlock$7(), _createElementBlock$7("label", {
                    key: 0,
                    class: "fp-label",
                    for: fid(field.key)
                  }, _toDisplayString$7(field.label), 9, _hoisted_2$7))
                : _createCommentVNode$6("", true),
              _createVNode$7(_component_v_text_field, {
                id: fid(field.key),
                "model-value": __props.state[field.key],
                "aria-label": field.label || field.placeholder,
                class: "fp-ctl",
                clearable: "",
                density: "compact",
                "hide-details": "",
                placeholder: field.placeholder,
                "prepend-inner-icon": "mdi-magnify",
                variant: "outlined",
                "onUpdate:modelValue": v => set(field.key, v || '', field)
              }, null, 8, ["id", "model-value", "aria-label", "placeholder", "onUpdate:modelValue"])
            ]))
          : (field.type === 'text' || field.type === 'number')
            ? (_openBlock$7(), _createElementBlock$7("div", _hoisted_3$6, [
                (__props.stacked)
                  ? (_openBlock$7(), _createElementBlock$7("label", {
                      key: 0,
                      class: "fp-label",
                      for: fid(field.key)
                    }, _toDisplayString$7(field.label), 9, _hoisted_4$4))
                  : _createCommentVNode$6("", true),
                _createVNode$7(_component_v_text_field, {
                  id: fid(field.key),
                  "model-value": __props.state[field.key],
                  "aria-label": field.label,
                  class: "fp-ctl",
                  clearable: field.clearable !== false,
                  density: "compact",
                  "hide-details": "",
                  inputmode: field.type === 'number' ? 'numeric' : undefined,
                  type: field.type,
                  min: field.min,
                  max: field.max,
                  step: field.step,
                  placeholder: field.placeholder,
                  "prepend-inner-icon": field.icon,
                  variant: "outlined",
                  "onUpdate:modelValue": v => set(field.key, v ?? '', field)
                }, null, 8, ["id", "model-value", "aria-label", "clearable", "inputmode", "type", "min", "max", "step", "placeholder", "prepend-inner-icon", "onUpdate:modelValue"]),
                (field.hint)
                  ? (_openBlock$7(), _createElementBlock$7("p", _hoisted_5$3, _toDisplayString$7(field.hint), 1))
                  : _createCommentVNode$6("", true)
              ]))
            : (field.type === 'year-range')
              ? (_openBlock$7(), _createElementBlock$7("div", _hoisted_6$3, [
                  (__props.stacked)
                    ? (_openBlock$7(), _createElementBlock$7("label", {
                        key: 0,
                        class: "fp-label",
                        for: fid(field.keyMin)
                      }, _toDisplayString$7(field.label), 9, _hoisted_7$3))
                    : _createCommentVNode$6("", true),
                  _createElementVNode$7("div", _hoisted_8$3, [
                    _createVNode$7(_component_v_text_field, {
                      id: fid(field.keyMin),
                      "model-value": __props.state[field.keyMin],
                      "aria-label": `${field.label} ${field.minText}`,
                      class: "fp-ctl fp-year__in",
                      clearable: "",
                      density: "compact",
                      "hide-details": "",
                      inputmode: "numeric",
                      placeholder: field.minText,
                      type: "number",
                      variant: "outlined",
                      "onUpdate:modelValue": v => set(field.keyMin, toYear(v), field)
                    }, null, 8, ["id", "model-value", "aria-label", "placeholder", "onUpdate:modelValue"]),
                    _cache[0] || (_cache[0] = _createElementVNode$7("span", { class: "fp-year__sep" }, "–", -1)),
                    _createVNode$7(_component_v_text_field, {
                      id: fid(field.keyMax),
                      "model-value": __props.state[field.keyMax],
                      "aria-label": `${field.label} ${field.maxText}`,
                      class: "fp-ctl fp-year__in",
                      clearable: "",
                      density: "compact",
                      "hide-details": "",
                      inputmode: "numeric",
                      placeholder: field.maxText,
                      type: "number",
                      variant: "outlined",
                      "onUpdate:modelValue": v => set(field.keyMax, toYear(v), field)
                    }, null, 8, ["id", "model-value", "aria-label", "placeholder", "onUpdate:modelValue"])
                  ])
                ]))
              : (field.type === 'select')
                ? (_openBlock$7(), _createElementBlock$7("div", _hoisted_9$3, [
                    (__props.stacked)
                      ? (_openBlock$7(), _createElementBlock$7("label", {
                          key: 0,
                          class: "fp-label",
                          for: fid(field.key)
                        }, _toDisplayString$7(field.label), 9, _hoisted_10$3))
                      : _createCommentVNode$6("", true),
                    _createVNode$7(_component_v_select, {
                      id: fid(field.key),
                      "model-value": __props.state[field.key],
                      "aria-label": field.label,
                      class: "fp-ctl",
                      chips: !!field.multi,
                      clearable: field.clearable !== false,
                      "closable-chips": !!field.multi,
                      density: "compact",
                      "hide-details": "",
                      items: field.items,
                      "item-title": "title",
                      "item-value": "value",
                      label: __props.stacked ? undefined : field.label,
                      multiple: !!field.multi,
                      placeholder: field.allText,
                      "prepend-inner-icon": field.icon,
                      variant: "outlined",
                      "onUpdate:modelValue": v => set(field.key, normalize(v, field), field)
                    }, null, 8, ["id", "model-value", "aria-label", "chips", "clearable", "closable-chips", "items", "label", "multiple", "placeholder", "prepend-inner-icon", "onUpdate:modelValue"])
                  ]))
                : _createCommentVNode$6("", true)
      ], 64))
    }), 128))
  ], 2))
}
}

};
const FilterPanel = /*#__PURE__*/_export_sfc(_sfc_main$7, [['__scopeId',"data-v-ae7c9eaf"]]);

const {resolveComponent:_resolveComponent$6,createVNode:_createVNode$6,toDisplayString:_toDisplayString$6,createTextVNode:_createTextVNode$5,withCtx:_withCtx$5,openBlock:_openBlock$6,createBlock:_createBlock$5,createCommentVNode:_createCommentVNode$5,createElementBlock:_createElementBlock$6,createElementVNode:_createElementVNode$6} = await importShared('vue');


const _hoisted_1$6 = { class: "bl-form" };
const _hoisted_2$6 = {
  key: 1,
  class: "bl-target"
};
const _hoisted_3$5 = { class: "bl-form__hint" };

const {computed: computed$4,getCurrentInstance: getCurrentInstance$5,reactive: reactive$4,ref: ref$6,watch: watch$5} = await importShared('vue');

const _sfc_main$6 = {
  __name: 'BlacklistDialog',
  props: { api: { type: Object, default: () => ({}) }, modelValue: Boolean, target: { type: Object, default: () => ({}) } },
  emits: ['update:modelValue', 'saved'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const MSG = {
  'zh-CN': { music: '音乐', artists: '艺术家（逗号分隔）', musicType: '音乐类型', recordingType: '单曲', albumType: '专辑', reset: '重置', title: '加入黑名单', name: '媒体名称（必填）', type: '类型', year: '发行年份（可选）', source: '媒体来源（可选）', mediaId: '媒体 ID（可选）', idHint: '填写 ID 可准确匹配；不填则按名称、类型及可选年份精确匹配。', scope: '忽略范围', all: '全部季', current: '指定季', season: '季号（0 为特别篇）', selected: '已选 {n} 个订阅', hint: '阻止插件以后自动订阅。现有订阅保留；清理历史不会清除黑名单。', unsubHint: '先保存黑名单，再取消选中的订阅，以后插件将跳过这些影视。', cancel: '取消', add: '加入黑名单', unsub: '取消订阅并加入黑名单', movie: '电影', tv: '剧集', failed: '操作失败', required: '请填写媒体名称', api: 'API 不可用' },
  'zh-TW': { music: '音樂', artists: '藝術家（逗號分隔）', musicType: '音樂類型', recordingType: '單曲', albumType: '專輯', reset: '重設', title: '加入黑名單', name: '媒體名稱（必填）', type: '類型', year: '發行年份（可選）', source: '媒體來源（可選）', mediaId: '媒體 ID（可選）', idHint: '填寫 ID 可準確匹配；不填則按名稱、類型及可選年份精確匹配。', scope: '忽略範圍', all: '全部季', current: '指定季', season: '季號（0 為特別篇）', selected: '已選 {n} 個訂閱', hint: '阻止外掛以後自動訂閱。現有訂閱保留；清理歷史不會清除黑名單。', unsubHint: '先儲存黑名單，再取消選中的訂閱，以後外掛將略過這些影視。', cancel: '取消', add: '加入黑名單', unsub: '取消訂閱並加入黑名單', movie: '電影', tv: '劇集', failed: '操作失敗', required: '請填寫媒體名稱', api: 'API 無法使用' },
  'en-US': { music: 'Music', artists: 'Artists (comma separated)', musicType: 'Music type', recordingType: 'Song', albumType: 'Album', reset: 'Reset', title: 'Add to blacklist', name: 'Media title (required)', type: 'Type', year: 'Release year (optional)', source: 'Media source (optional)', mediaId: 'Media ID (optional)', idHint: 'An ID gives an exact match. Otherwise match the exact title, type and optional year.', scope: 'Ignore', all: 'All seasons', current: 'Specific season', season: 'Season (0 for specials)', selected: '{n} selected subscriptions', hint: 'Prevents future automatic subscriptions. Existing subscriptions remain. Clearing history keeps this rule.', unsubHint: 'Save blacklist rules, then cancel the selected subscriptions to prevent automatic resubscription.', cancel: 'Cancel', add: 'Add to blacklist', unsub: 'Unsubscribe and blacklist', movie: 'Movie', tv: 'TV series', failed: 'Action failed', required: 'Enter a media title', api: 'API unavailable' },
};
const inst = getCurrentInstance$5();
function t(key, params) {
  const raw = inst?.appContext?.config?.globalProperties?.$i18n?.locale;
  const lang = String(raw?.value || raw || '').toLowerCase();
  const locale = lang.startsWith('en') ? 'en-US' : /tw|hant|hk/.test(lang) ? 'zh-TW' : 'zh-CN';
  let text = MSG[locale][key] || key;
  if (params) for (const key in params) text = text.replaceAll(`{${key}}`, params[key]);
  return text
}
const form = reactive$4({ title: '', type: '电视剧', year: '', media_source: null, media_id: '', season: '', music_type: 'recording', artistsText: '' });
const scopeState = reactive$4({ scope: 'all' });
const scope = computed$4({ get: () => scopeState.scope, set: value => { scopeState.scope = value; } });
const saving = ref$6(false);
const error = ref$6('');
const pendingIds = ref$6([]);
const manual = computed$4(() => !props.target.kind || props.target.kind === 'manual');
const unsubscribe = computed$4(() => props.target.kind === 'unsubscribe');
const isTV = computed$4(() => manual.value ? form.type === '电视剧' : props.target.type === '电视剧');
const types = computed$4(() => [{ title: t('movie'), value: '电影' }, { title: t('tv'), value: '电视剧' }, { title: t('music'), value: '音乐' }]);
const sources = [{ title: 'TMDB', value: 'themoviedb' }, { title: 'Douban', value: 'douban' }, { title: 'Bangumi', value: 'bangumi' }, { title: 'AniList', value: 'anilist' }, { title: 'MusicBrainz', value: 'musicbrainz' }, { title: 'TheAudioDB', value: 'theaudiodb' }, { title: 'Douban Music', value: 'doubanmusic' }];
const scopes = computed$4(() => [{ title: t('all'), value: 'all' }, { title: t('current') + (!manual.value && props.target.season != null ? ` (S${String(props.target.season).padStart(2, '0')})` : ''), value: 'season', props: { disabled: !manual.value && props.target.season == null } }]);
const manualFields = computed$4(() => [
  { type: 'text', key: 'title', label: t('name'), icon: 'mdi-movie-open-outline' },
  { type: 'select', key: 'type', label: t('type'), items: types.value, clearable: false, icon: 'mdi-shape-outline' },
  ...(form.type === '音乐' ? [{ type: 'text', key: 'artistsText', label: t('artists') }, { type: 'select', key: 'music_type', label: t('musicType'), clearable: false, items: [{ title: t('recordingType'), value: 'recording' }, { title: t('albumType'), value: 'album' }] }] : []),
  { type: 'number', key: 'year', label: t('year'), min: 1800, max: 2999, step: 1 },
  { type: 'select', key: 'media_source', label: t('source'), items: sources, icon: 'mdi-database-outline' },
  { type: 'text', key: 'media_id', label: t('mediaId'), hint: t('idHint') },
]);
const scopeFields = computed$4(() => [
  { type: 'select', key: 'scope', label: t('scope'), items: scopes.value, clearable: false, icon: 'mdi-television' },
]);
const seasonFields = computed$4(() => [
  { type: 'number', key: 'season', label: t('season'), min: 0, step: 1 },
]);
function resetForm() {
  Object.assign(form, { title: '', type: '电视剧', year: '', media_source: null, media_id: '', season: '', music_type: 'recording', artistsText: '' });
  scope.value = 'all';
  error.value = '';
}
watch$5(() => props.modelValue, open => {
  if (!open) return
  resetForm();
  pendingIds.value = [...(props.target.ids || [])];
});
async function save() {
  if (saving.value) return
  if (manual.value && !form.title.trim()) { error.value = t('required'); return }
  saving.value = true;
  error.value = '';
  try {
    if (typeof props.api.post !== 'function') throw new Error(t('api'))
    const selectedScope = isTV.value ? scope.value : 'all';
    const body = unsubscribe.value ? { ids: pendingIds.value, scope: selectedScope }
      : manual.value ? { kind: 'manual', scope: selectedScope, media: { ...form, artists: form.artistsText.split(/[,，]/).map(name => name.trim()).filter(Boolean), title: form.title.trim(), media_source: form.media_source || '', media_id: form.media_id.trim() } }
      : { kind: props.target.kind, unique: props.target.unique, id: props.target.id, scope: selectedScope };
    const result = await props.api.post(`plugin/AutomaticSubscriptionAssistant/${unsubscribe.value ? 'subscribes/block' : 'blacklist/add'}`, body);
    if (result?.code !== 0) throw new Error(result?.message || t('failed'))
    emit('saved', result);
    if (result.failed) {
      pendingIds.value = Array.isArray(result.failed_ids) ? result.failed_ids : pendingIds.value;
      error.value = result.message || t('failed');
    } else emit('update:modelValue', false);
  } catch (e) { error.value = e?.message || String(e); }
  finally { saving.value = false; }
}

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent$6("v-icon");
  const _component_v_card_title = _resolveComponent$6("v-card-title");
  const _component_v_alert = _resolveComponent$6("v-alert");
  const _component_v_card_text = _resolveComponent$6("v-card-text");
  const _component_v_btn = _resolveComponent$6("v-btn");
  const _component_v_spacer = _resolveComponent$6("v-spacer");
  const _component_v_card_actions = _resolveComponent$6("v-card-actions");
  const _component_v_card = _resolveComponent$6("v-card");
  const _component_v_dialog = _resolveComponent$6("v-dialog");

  return (_openBlock$6(), _createBlock$5(_component_v_dialog, {
    "model-value": __props.modelValue,
    "max-width": "440",
    scrollable: "",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = v => !saving.value && emit('update:modelValue', v))
  }, {
    default: _withCtx$5(() => [
      _createVNode$6(_component_v_card, { class: "asa-filter-dlg" }, {
        default: _withCtx$5(() => [
          _createVNode$6(_component_v_card_title, { class: "asa-filter-dlg__title" }, {
            default: _withCtx$5(() => [
              _createVNode$6(_component_v_icon, {
                icon: "mdi-cancel",
                size: "20"
              }),
              _createTextVNode$5(_toDisplayString$6(t('title')), 1)
            ]),
            _: 1
          }),
          _createVNode$6(_component_v_card_text, { class: "asa-filter-dlg__body" }, {
            default: _withCtx$5(() => [
              (error.value)
                ? (_openBlock$6(), _createBlock$5(_component_v_alert, {
                    key: 0,
                    type: "error",
                    variant: "tonal",
                    density: "compact",
                    class: "mb-3"
                  }, {
                    default: _withCtx$5(() => [
                      _createTextVNode$5(_toDisplayString$6(error.value), 1)
                    ]),
                    _: 1
                  }))
                : _createCommentVNode$5("", true),
              _createElementVNode$6("div", _hoisted_1$6, [
                (manual.value)
                  ? (_openBlock$6(), _createBlock$5(FilterPanel, {
                      key: 0,
                      state: form,
                      fields: manualFields.value,
                      stacked: ""
                    }, null, 8, ["state", "fields"]))
                  : (_openBlock$6(), _createElementBlock$6("p", _hoisted_2$6, _toDisplayString$6(__props.target.title || t('selected', { n: pendingIds.value.length })), 1)),
                (isTV.value)
                  ? (_openBlock$6(), _createBlock$5(FilterPanel, {
                      key: 2,
                      state: scopeState,
                      fields: scopeFields.value,
                      stacked: ""
                    }, null, 8, ["state", "fields"]))
                  : _createCommentVNode$5("", true),
                (manual.value && isTV.value && scope.value === 'season')
                  ? (_openBlock$6(), _createBlock$5(FilterPanel, {
                      key: 3,
                      state: form,
                      fields: seasonFields.value,
                      stacked: ""
                    }, null, 8, ["state", "fields"]))
                  : _createCommentVNode$5("", true),
                _createElementVNode$6("p", _hoisted_3$5, _toDisplayString$6(t(unsubscribe.value ? 'unsubHint' : 'hint')), 1)
              ])
            ]),
            _: 1
          }),
          _createVNode$6(_component_v_card_actions, null, {
            default: _withCtx$5(() => [
              (manual.value)
                ? (_openBlock$6(), _createBlock$5(_component_v_btn, {
                    key: 0,
                    disabled: saving.value,
                    variant: "text",
                    onClick: resetForm
                  }, {
                    default: _withCtx$5(() => [
                      _createTextVNode$5(_toDisplayString$6(t('reset')), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"]))
                : _createCommentVNode$5("", true),
              _createVNode$6(_component_v_spacer),
              _createVNode$6(_component_v_btn, {
                disabled: saving.value,
                variant: "text",
                onClick: _cache[0] || (_cache[0] = $event => (emit('update:modelValue', false)))
              }, {
                default: _withCtx$5(() => [
                  _createTextVNode$5(_toDisplayString$6(t('cancel')), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              _createVNode$6(_component_v_btn, {
                loading: saving.value,
                color: unsubscribe.value ? 'error' : 'primary',
                variant: "flat",
                onClick: save
              }, {
                default: _withCtx$5(() => [
                  _createTextVNode$5(_toDisplayString$6(t(unsubscribe.value ? 'unsub' : 'add')), 1)
                ]),
                _: 1
              }, 8, ["loading", "color"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["model-value"]))
}
}

};
const BlacklistDialog = /*#__PURE__*/_export_sfc(_sfc_main$6, [['__scopeId',"data-v-0fa19f26"]]);

const {renderSlot:_renderSlot,resolveComponent:_resolveComponent$5,createVNode:_createVNode$5,toDisplayString:_toDisplayString$5,createElementVNode:_createElementVNode$5,Fragment:_Fragment$4,openBlock:_openBlock$5,createElementBlock:_createElementBlock$5,createCommentVNode:_createCommentVNode$4,createTextVNode:_createTextVNode$4,withCtx:_withCtx$4,createBlock:_createBlock$4,normalizeClass:_normalizeClass$2} = await importShared('vue');


const _hoisted_1$5 = { role: "alert" };
const _hoisted_2$5 = { key: 3 };

const {getCurrentInstance: getCurrentInstance$4,nextTick: nextTick$1,onBeforeUnmount: onBeforeUnmount$4,ref: ref$5,watch: watch$4} = await importShared('vue');



const _sfc_main$5 = {
  __name: 'ProgressiveList',
  props: {
  progressive: Boolean,
  loading: Boolean,
  hasMore: Boolean,
  count: { type: Number, default: 0 },
  error: { type: String, default: '' },
},
  emits: ['load'],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;
const emit = __emit;
const scrollRef = ref$5(null);
const sentinelRef = ref$5(null);
const inst = getCurrentInstance$4();
const messages = {
  'zh-CN': { loading: '加载中…', more: '加载更多', retry: '重试', finished: '已全部加载' },
  'zh-TW': { loading: '載入中…', more: '載入更多', retry: '重試', finished: '已全部載入' },
  'en-US': { loading: 'Loading…', more: 'Load more', retry: 'Retry', finished: 'All loaded' },
};
function t(key) {
  const raw = inst?.appContext?.config?.globalProperties?.$i18n?.locale;
  const lang = String(raw?.value || raw || '').toLowerCase();
  return messages[lang.startsWith('en') ? 'en-US' : /tw|hant|hk/.test(lang) ? 'zh-TW' : 'zh-CN'][key]
}

let observer = null;
let generation = 0;
function disconnect() { observer?.disconnect(); observer = null; }
// 每批完成后重新观察，列表不足一屏时也会继续填充；错误后只接受手动重试。
watch$4(() => [props.progressive, props.loading, props.hasMore, props.count, props.error], async () => {
  const current = ++generation;
  disconnect();
  await nextTick$1();
  if (current !== generation || !props.progressive || props.loading || !props.hasMore || props.error
      || !scrollRef.value || !sentinelRef.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(entries => {
    if (current === generation && entries.some(entry => entry.isIntersecting)
        && !props.loading && props.hasMore && !props.error) emit('load');
  }, { root: scrollRef.value, rootMargin: '0px 0px 160px 0px' });
  observer.observe(sentinelRef.value);
}, { immediate: true, flush: 'post' });

function scrollToTop() { if (scrollRef.value) scrollRef.value.scrollTop = 0; }
__expose({ scrollToTop });
onBeforeUnmount$4(() => { generation++; disconnect(); });

return (_ctx, _cache) => {
  const _component_v_progress_circular = _resolveComponent$5("v-progress-circular");
  const _component_v_btn = _resolveComponent$5("v-btn");

  return (_openBlock$5(), _createElementBlock$5("div", {
    ref_key: "scrollRef",
    ref: scrollRef,
    class: _normalizeClass$2(["asa-results", { 'asa-results--progressive': __props.progressive }])
  }, [
    _renderSlot(_ctx.$slots, "default", {}, undefined, true),
    (__props.progressive && (__props.count || __props.loading))
      ? (_openBlock$5(), _createElementBlock$5("div", {
          key: 0,
          ref_key: "sentinelRef",
          ref: sentinelRef,
          class: "asa-results__end",
          "aria-live": "polite"
        }, [
          (__props.loading)
            ? (_openBlock$5(), _createElementBlock$5(_Fragment$4, { key: 0 }, [
                _createVNode$5(_component_v_progress_circular, {
                  indeterminate: "",
                  size: "20",
                  width: "2",
                  "aria-label": t('loading')
                }, null, 8, ["aria-label"]),
                _createElementVNode$5("span", null, _toDisplayString$5(t('loading')), 1)
              ], 64))
            : (__props.error)
              ? (_openBlock$5(), _createElementBlock$5(_Fragment$4, { key: 1 }, [
                  _createElementVNode$5("span", _hoisted_1$5, _toDisplayString$5(__props.error), 1),
                  _createVNode$5(_component_v_btn, {
                    variant: "text",
                    size: "small",
                    onClick: _cache[0] || (_cache[0] = $event => (emit('load')))
                  }, {
                    default: _withCtx$4(() => [
                      _createTextVNode$4(_toDisplayString$5(t('retry')), 1)
                    ]),
                    _: 1
                  })
                ], 64))
              : (__props.hasMore)
                ? (_openBlock$5(), _createBlock$4(_component_v_btn, {
                    key: 2,
                    variant: "text",
                    size: "small",
                    onClick: _cache[1] || (_cache[1] = $event => (emit('load')))
                  }, {
                    default: _withCtx$4(() => [
                      _createTextVNode$4(_toDisplayString$5(t('more')), 1)
                    ]),
                    _: 1
                  }))
                : (_openBlock$5(), _createElementBlock$5("span", _hoisted_2$5, _toDisplayString$5(t('finished')), 1))
        ], 512))
      : _createCommentVNode$4("", true)
  ], 2))
}
}

};
const ProgressiveList = /*#__PURE__*/_export_sfc(_sfc_main$5, [['__scopeId',"data-v-3dc89259"]]);

const {toDisplayString:_toDisplayString$4,openBlock:_openBlock$4,createElementBlock:_createElementBlock$4,createCommentVNode:_createCommentVNode$3,createTextVNode:_createTextVNode$3,resolveComponent:_resolveComponent$4,withCtx:_withCtx$3,createVNode:_createVNode$4,createBlock:_createBlock$3,createElementVNode:_createElementVNode$4,renderList:_renderList$3,Fragment:_Fragment$3} = await importShared('vue');


const _hoisted_1$4 = { class: "sv" };
const _hoisted_2$4 = { class: "asa-pg-controls" };
const _hoisted_3$4 = { class: "sv-tools" };
const _hoisted_4$3 = {
  key: 0,
  class: "sv-tools__badge"
};
const _hoisted_5$2 = {
  key: 0,
  class: "sv-batch"
};
const _hoisted_6$2 = { class: "sv-batch__count" };
const _hoisted_7$2 = {
  key: 0,
  class: "asa-grid"
};
const _hoisted_8$2 = {
  key: 1,
  class: "sv-empty"
};
const _hoisted_9$2 = { class: "sv-empty__ico" };
const _hoisted_10$2 = { class: "sv-empty__text" };
const _hoisted_11$2 = { class: "sv-empty__hint" };
const _hoisted_12$2 = {
  key: 2,
  class: "asa-grid"
};

const {computed: computed$3,getCurrentInstance: getCurrentInstance$3,inject: inject$1,onBeforeUnmount: onBeforeUnmount$3,onMounted: onMounted$3,reactive: reactive$3,ref: ref$4,watch: watch$3} = await importShared('vue');

const PLUGIN$1 = 'plugin/AutomaticSubscriptionAssistant';
const UNKNOWN_PROVIDER = '__unknown__';

const _sfc_main$4 = {
  __name: 'SubscribeView',
  props: {
  api: { type: Object, default: () => ({}) },
  pageSize: { type: Number, default: 12 },
  page: { type: Number, default: 1 },
  progressive: Boolean,
},
  emits: ['changed', 'update:page', 'update:pageCount'],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;
const emit = __emit;
const subscriptionManager = inject$1('moviepilot:subscriptionManager', null);
const nativePending = reactive$3(new Set());
let disposed = false;
const THEME_COLORS = { primary: 1, secondary: 1, success: 1, info: 1, warning: 1, error: 1 };

const STATE_META = {
  R: { color: 'success', icon: 'mdi-bell-ring-outline' },
  N: { color: 'info', icon: 'mdi-bell-plus-outline' },
  P: { color: 'warning', icon: 'mdi-bell-sleep-outline' },
  S: { color: 'grey', icon: 'mdi-pause-circle-outline' },
};

const MSG = {
  'zh-CN': { artist: '艺术家', albumType: '专辑', recordingType: '单曲',
    edit: '编辑', search: '搜索', reset: '重置', activity: '订阅活动', detail: '媒体详情', nativeUnavailable: '当前主程序未提供原生订阅管理入口，请升级主程序前端。',
    select: '多选', exitSelect: '退出多选', selectedN: '已选 {n} 项', searchPh: '搜索名称…',
    selLoaded: '选择已加载', selPage: '选本页', selAll: '选全部（{n}）', selClear: '清除选择',
    block: '取消订阅并加入黑名单', resume: '恢复', pause: '暂停', unsub: '取消订阅', cancel: '取消', ok: '确定', unknown: '未知', more: '更多',
    all: '全部', 'st.R': '订阅中', 'st.N': '新建', 'st.P': '待定', 'st.S': '已暂停',
    filter: '筛选', filterTitle: '筛选与搜索', filterType: '类型', filterStatus: '状态', filterYear: '发行年份',
    yearFrom: '起始年', yearTo: '结束年', filterAll: '全部', searchLabel: '搜索', applyFilter: '应用', resetFilter: '重置',
    clearFilters: '清除筛选', 'mt.music': '音乐', 'mt.movie': '电影', 'mt.tv': '电视剧',
    kType: '类型', kGroup: '剧集组', kSource: '榜单来源', kTime: '订阅时间', kYear: '发行年份',
    emptyNone: '暂无本插件创建的订阅', emptyFiltered: '没有符合条件的订阅', emptyHint: '启用来源运行后，订阅会出现在这里',
    error: '获取订阅失败：', actionFailed: '操作失败：',
    confirmDelete: '确认取消选中的 {n} 个订阅？此操作不可撤销。',
    confirmPause: '确认暂停选中的 {n} 个订阅？', confirmResume: '确认恢复选中的 {n} 个订阅？',
    titleDelete: '取消订阅确认', titlePause: '暂停确认', titleResume: '恢复确认',
  },
  'zh-TW': { artist: '藝術家', albumType: '專輯', recordingType: '單曲',
    edit: '編輯', search: '搜尋', reset: '重設', activity: '訂閱活動', detail: '媒體詳情', nativeUnavailable: '目前主程式未提供原生訂閱管理入口，請升級主程式前端。',
    select: '多選', exitSelect: '退出多選', selectedN: '已選 {n} 項', searchPh: '搜尋名稱…',
    selLoaded: '選擇已載入', selPage: '選本頁', selAll: '選全部（{n}）', selClear: '清除選擇',
    block: '取消訂閱並加入黑名單', resume: '恢復', pause: '暫停', unsub: '取消訂閱', cancel: '取消', ok: '確定', unknown: '未知', more: '更多',
    all: '全部', 'st.R': '訂閱中', 'st.N': '新建', 'st.P': '待定', 'st.S': '已暫停',
    filter: '篩選', filterTitle: '篩選與搜尋', filterType: '類型', filterStatus: '狀態', filterYear: '發行年份',
    yearFrom: '起始年', yearTo: '結束年', filterAll: '全部', searchLabel: '搜尋', applyFilter: '套用', resetFilter: '重設',
    clearFilters: '清除篩選', 'mt.music': '音樂', 'mt.movie': '電影', 'mt.tv': '電視劇',
    kType: '類型', kGroup: '劇集組', kSource: '榜單來源', kTime: '訂閱時間', kYear: '發行年份',
    emptyNone: '暫無本外掛建立的訂閱', emptyFiltered: '沒有符合條件的訂閱', emptyHint: '啟用來源執行後，訂閱會出現在這裡',
    error: '取得訂閱失敗：', actionFailed: '操作失敗：',
    confirmDelete: '確認取消選中的 {n} 個訂閱？此操作不可復原。',
    confirmPause: '確認暫停選中的 {n} 個訂閱？', confirmResume: '確認恢復選中的 {n} 個訂閱？',
    titleDelete: '取消訂閱確認', titlePause: '暫停確認', titleResume: '恢復確認',
  },
  'en-US': { artist: 'Artist', albumType: 'Album', recordingType: 'Song',
    edit: 'Edit', search: 'Search', reset: 'Reset', activity: 'Subscription activity', detail: 'Media details', nativeUnavailable: 'Update the MoviePilot frontend to use native subscription management.',
    select: 'Select', exitSelect: 'Done', selectedN: '{n} selected', searchPh: 'Search name…',
    selLoaded: 'Loaded items', selPage: 'This page', selAll: 'All ({n})', selClear: 'Clear',
    block: 'Unsubscribe and blacklist', resume: 'Resume', pause: 'Pause', unsub: 'Unsubscribe', cancel: 'Cancel', ok: 'OK', unknown: 'Unknown', more: 'More',
    all: 'All', 'st.R': 'Active', 'st.N': 'New', 'st.P': 'Pending', 'st.S': 'Paused',
    filter: 'Filters', filterTitle: 'Filter & search', filterType: 'Type', filterStatus: 'Status', filterYear: 'Release year',
    yearFrom: 'From', yearTo: 'To', filterAll: 'All', searchLabel: 'Search', applyFilter: 'Apply', resetFilter: 'Reset',
    clearFilters: 'Clear filters', 'mt.music': 'Music', 'mt.movie': 'Movies', 'mt.tv': 'TV series',
    kType: 'Type', kGroup: 'Episode group', kSource: 'Ranking source', kTime: 'Added', kYear: 'Year',
    emptyNone: 'No subscriptions created by this plugin', emptyFiltered: 'No subscriptions match', emptyHint: 'Subscriptions appear here after sources run',
    error: 'Failed to load subscriptions: ', actionFailed: 'Action failed: ',
    confirmDelete: 'Unsubscribe {n} selected subscription(s)? This cannot be undone.',
    confirmPause: 'Pause {n} selected subscription(s)?', confirmResume: 'Resume {n} selected subscription(s)?',
    titleDelete: 'Confirm unsubscribe', titlePause: 'Confirm pause', titleResume: 'Confirm resume',
  },
};
const inst = getCurrentInstance$3();
const locale = computed$3(() => normLocale(inst?.appContext?.config?.globalProperties?.$i18n?.locale));
function normLocale(src) {
  const v = src && typeof src === 'object' && 'value' in src ? src.value : src;
  const s = String(v || '').toLowerCase();
  if (s.startsWith('en')) return 'en-US'
  if (s.includes('tw') || s.includes('hant') || s.includes('hk')) return 'zh-TW'
  return 'zh-CN'
}
function t(k, p) {
  let s = (MSG[locale.value] || MSG['zh-CN'])[k] ?? MSG['zh-CN'][k] ?? k;
  if (p) for (const key in p) s = s.replaceAll(`{${key}}`, p[key]);
  return s
}

const blacklistOpen = ref$4(false);
const blacklistTarget = ref$4({});
function openBlacklist(item) {
  const targets = item ? [item] : rows.value.filter(row => selected.has(row.id));
  if (!targets.length) return
  const single = targets.length === 1 ? targets[0] : null;
  blacklistTarget.value = { kind: 'unsubscribe', ids: targets.map(row => row.id), title: single?.name,
    type: single?.type, season: single?.season };
  blacklistOpen.value = true;
}
async function blocked(result) {
  for (const id of result.ok_ids || []) selected.delete(id);
  for (const id of result.failed_ids || []) selected.add(id);
  await fetchSubs();
  emit('changed');
}
const loading = ref$4(true);
const error = ref$4('');
const rows = ref$4([]);
// 统一筛选模型（管理）：关键词 / 发行年份范围 / 类型(单选) / 状态与榜单来源(多选)。
// 「留空即不过滤（全部）」：keyword='' / year=null / mtype=null / statuses=[] / providers=[]。
// 弹窗编辑 draft 副本，点「应用」整体拷回（管理为客户端筛选，拷回即时生效）。
const emptyFilters = () => ({ keyword: '', yearMin: null, yearMax: null, mtype: null, statuses: [], providers: [] });
function cloneFilters(s) {
  return { keyword: s.keyword, yearMin: s.yearMin, yearMax: s.yearMax, mtype: s.mtype,
    statuses: [...s.statuses], providers: [...s.providers] }
}
const filters = reactive$3(emptyFilters());
const draft = reactive$3(emptyFilters());
const filterDialog = ref$4(false);
const selectMode = ref$4(false);
const selected = reactive$3(new Set());
const acting = ref$4(false);
const confirm = reactive$3({ open: false, kind: 'delete', ids: [] });

function providerKey(item) { return item.provider || UNKNOWN_PROVIDER }

const filtered = computed$3(() => {
  const kw = (filters.keyword || '').trim().toLowerCase();
  const { yearMin, yearMax, mtype, statuses, providers } = filters;
  return rows.value.filter(r => {
    if (kw && !String(r.name || '').toLowerCase().includes(kw)) return false
    if (mtype && r.type !== mtype) return false
    if (statuses.length && !statuses.includes(r.state)) return false
    if (providers.length && !providers.includes(providerKey(r))) return false
    if (yearMin != null || yearMax != null) {
      const y = parseInt(r.year, 10);
      if (!Number.isFinite(y)) return false
      if (yearMin != null && y < yearMin) return false
      if (yearMax != null && y > yearMax) return false
    }
    return true
  })
});
const pageCount = computed$3(() => Math.max(1, Math.ceil(filtered.value.length / props.pageSize)));
const listRef = ref$4(null);
const visibleCount = ref$4(props.pageSize);
const paged = computed$3(() => {
  if (props.progressive) return filtered.value.slice(0, visibleCount.value)
  const start = (props.page - 1) * props.pageSize;
  return filtered.value.slice(start, start + props.pageSize)
});
function loadMore() { visibleCount.value += props.pageSize; }
watch$3([filtered, () => props.progressive, () => props.pageSize], () => {
  visibleCount.value = props.pageSize;
  if (props.progressive) listRef.value?.scrollToTop();
});
// 状态多选项：始终列出 4 态，带当前计数。
const stateItems = computed$3(() => {
  const counts = {};
  rows.value.forEach(r => { counts[r.state] = (counts[r.state] || 0) + 1; });
  return ['R', 'S', 'P', 'N'].map(k => ({ title: `${t('st.' + k)}${counts[k] ? ` (${counts[k]})` : ''}`, value: k }))
});
const typeItems = computed$3(() => [
  { title: t('mt.movie'), value: '电影' },
  { title: t('mt.tv'), value: '电视剧' },
  { title: t('mt.music'), value: '音乐' },
]);
const providerItems = computed$3(() => {
  const sources = new Map();
  rows.value.forEach(row => {
    const key = providerKey(row);
    if (!sources.has(key)) sources.set(key, {
      name: key === UNKNOWN_PROVIDER ? t('unknown') : row.provider_name || row.provider,
      count: 0,
    });
    sources.get(key).count++;
  });
  return [...sources].map(([value, source]) => ({ title: `${source.name} (${source.count})`, value }))
});
// 所有筛选共用一份弹窗草稿；榜单按稳定 provider ID 匹配，不按本地化名称匹配。
const filterFields = computed$3(() => [
  { type: 'search', key: 'keyword', label: t('searchLabel'), placeholder: t('searchPh') },
  { type: 'year-range', keyMin: 'yearMin', keyMax: 'yearMax', label: t('filterYear'), minText: t('yearFrom'), maxText: t('yearTo') },
  { type: 'select', key: 'mtype', multi: false, items: typeItems.value, label: t('filterType'), icon: 'mdi-shape-outline', allText: t('filterAll') },
  { type: 'select', key: 'statuses', multi: true, items: stateItems.value, label: t('filterStatus'), icon: 'mdi-flag-outline', allText: t('filterAll') },
  { type: 'select', key: 'providers', multi: true, items: providerItems.value, label: t('kSource'), icon: 'mdi-rss', allText: t('filterAll') },
]);
const activeFilterCount = computed$3(() =>
  (filters.keyword ? 1 : 0) +
  (filters.yearMin != null || filters.yearMax != null ? 1 : 0) +
  (filters.mtype ? 1 : 0) + (filters.statuses.length ? 1 : 0) + (filters.providers.length ? 1 : 0));
const hasFilter = computed$3(() => activeFilterCount.value > 0);
const confirmTitle = computed$3(() => t({ delete: 'titleDelete', pause: 'titlePause', resume: 'titleResume' }[confirm.kind]));
const confirmText = computed$3(() => t({ delete: 'confirmDelete', pause: 'confirmPause', resume: 'confirmResume' }[confirm.kind], { n: confirm.ids.length }));

function cssColor(name) {
  if (THEME_COLORS[name]) return `rgb(var(--v-theme-${name}))`
  return 'rgba(var(--v-theme-on-surface), 0.45)'
}
function stateBadge(state) {
  const m = STATE_META[state] || { color: 'grey', icon: 'mdi-bell-outline' };
  const label = MSG['zh-CN']['st.' + state] ? t('st.' + state) : (state || t('unknown'));
  return { label, color: cssColor(m.color), icon: m.icon }
}
function mediaName(item) {
  const parts = [item.name || t('unknown')];
  if (item.type === '电视剧' && item.season != null) parts.push(`S${String(item.season).padStart(2, '0')}`);
  if (item.episode_group) parts.push(`${t('kGroup')}: ${item.episode_group}`);
  return parts.join(' · ')
}
function cardLines(item) {
  return [
    { icon: 'mdi-shape-outline', label: t('kType'), value: item.type === '音乐' ? `${item.type} · ${item.music_type === 'album' ? t('albumType') : t('recordingType')}` : item.type || t('unknown') },
    ...(item.type === '音乐' && item.artists?.length ? [{ icon: 'mdi-account-music', label: t('artist'), value: item.artists.join(' / ') }] : []),
    { icon: 'mdi-rss', label: t('kSource'), value: item.provider_name || item.provider || t('unknown') },
    { icon: 'mdi-clock-outline', label: t('kTime'), value: item.date || t('unknown') },
    { icon: 'mdi-calendar', label: t('kYear'), value: item.year || t('unknown') },
  ]
}

function clearFilters() { Object.assign(filters, emptyFilters()); }
// 移动端筛选弹窗：打开拷入 draft，「应用」拷回，「重置」清空 draft。
function openFilterDialog() { Object.assign(draft, cloneFilters(filters)); filterDialog.value = true; }
function applyFilterDialog() { Object.assign(filters, cloneFilters(draft)); filterDialog.value = false; }
function resetDraft() { Object.assign(draft, emptyFilters()); }
function toggleSelectMode() { selectMode.value = !selectMode.value; if (!selectMode.value) selected.clear(); }
function toggleOne(id) { selected.has(id) ? selected.delete(id) : selected.add(id); }
function selectCurrentPage() { paged.value.forEach(r => selected.add(r.id)); }
function selectAll() { filtered.value.forEach(r => selected.add(r.id)); }
function askBatch(kind) { if (selected.size) { confirm.kind = kind; confirm.ids = [...selected]; confirm.open = true; } }
function askOne(kind, item) { confirm.kind = kind; confirm.ids = [item.id]; confirm.open = true; }

// 单卡操作交给宿主原生模块；保存/移除后再刷新，取消弹窗不产生写操作。
async function runNative(action, item) {
  if (disposed || nativePending.has(item.id)) return
  if (typeof subscriptionManager !== 'function') {
    if (['pause', 'resume', 'delete'].includes(action)) askOne(action, item);
    else error.value = t('nativeUnavailable');
    return
  }
  nativePending.add(item.id);
  error.value = '';
  try {
    const result = await subscriptionManager({
      action, subscriptionId: item.id,
      onChanged: async () => {
        if (disposed) return
        await fetchSubs();
        if (!disposed) emit('changed');
      },
    });
    if (!disposed && !result?.success && !result?.cancelled) error.value = result?.message || t('unknown');
  } catch (e) {
    if (!disposed) error.value = t('actionFailed') + (e?.message || e);
  } finally {
    nativePending.delete(item.id);
  }
}

async function runConfirm() {
  acting.value = true;
  error.value = '';
  try {
    if (!props.api || typeof props.api.post !== 'function') throw new Error('API')
    const res = confirm.kind === 'delete'
      ? await props.api.post(`${PLUGIN$1}/subscribes/delete`, { ids: confirm.ids })
      : await props.api.post(`${PLUGIN$1}/subscribes/state`, { ids: confirm.ids, state: confirm.kind === 'pause' ? 'S' : 'R' });
    if (res?.code !== 0) throw new Error(res?.message || t('unknown'))
    const failed = Array.isArray(res.failed_ids) ? res.failed_ids : (res.failed ? [...confirm.ids] : []);
    const succeeded = Array.isArray(res.ok_ids) ? res.ok_ids : (res.failed ? [] : [...confirm.ids]);
    succeeded.forEach(id => selected.delete(id));
    failed.forEach(id => selected.add(id));
    confirm.ids = failed;
    confirm.open = failed.length > 0;
    await fetchSubs();
    if (res.failed) error.value = res.message || t('actionFailed') + res.failed;
    emit('changed');
  } catch (e) {
    error.value = t('actionFailed') + (e?.message || e);
  } finally {
    acting.value = false;
  }
}

let loadGeneration = 0;
async function fetchSubs() {
  const generation = ++loadGeneration;
  loading.value = true;
  error.value = '';
  try {
    if (!props.api || typeof props.api.get !== 'function') throw new Error('API')
    const res = await props.api.get(`${PLUGIN$1}/subscribes?lang=${locale.value}`);
    if (disposed || generation !== loadGeneration) return
    rows.value = Array.isArray(res?.list) ? res.list : [];
  } catch (e) {
    if (disposed || generation !== loadGeneration) return
    error.value = t('error') + (e?.message || e);
    rows.value = [];
  } finally {
    if (!disposed && generation === loadGeneration) loading.value = false;
  }
}

watch$3(locale, fetchSubs);

// 向父级同步页数；筛选变化（含弹窗「应用」拷回）时请求父级复位到第 1 页。
watch$3(pageCount, v => emit('update:pageCount', v), { immediate: true });
watch$3(filters, () => emit('update:page', 1), { deep: true });

__expose({ reload: fetchSubs });
onMounted$3(fetchSubs);
onBeforeUnmount$3(() => { disposed = true; });

return (_ctx, _cache) => {
  const _component_v_btn = _resolveComponent$4("v-btn");
  const _component_v_spacer = _resolveComponent$4("v-spacer");
  const _component_v_icon = _resolveComponent$4("v-icon");
  const _component_v_alert = _resolveComponent$4("v-alert");
  const _component_v_list_item = _resolveComponent$4("v-list-item");
  const _component_v_divider = _resolveComponent$4("v-divider");
  const _component_v_card_title = _resolveComponent$4("v-card-title");
  const _component_v_card_text = _resolveComponent$4("v-card-text");
  const _component_v_card_actions = _resolveComponent$4("v-card-actions");
  const _component_v_card = _resolveComponent$4("v-card");
  const _component_v_dialog = _resolveComponent$4("v-dialog");

  return (_openBlock$4(), _createElementBlock$4("div", _hoisted_1$4, [
    _createElementVNode$4("div", _hoisted_2$4, [
      _createElementVNode$4("div", _hoisted_3$4, [
        _createVNode$4(_component_v_btn, {
          class: "sv-tools__trigger",
          color: hasFilter.value ? 'primary' : undefined,
          "prepend-icon": "mdi-filter-variant",
          size: "small",
          variant: hasFilter.value ? 'tonal' : 'outlined',
          onClick: openFilterDialog
        }, {
          default: _withCtx$3(() => [
            _createTextVNode$3(_toDisplayString$4(t('filter')) + " ", 1),
            (activeFilterCount.value)
              ? (_openBlock$4(), _createElementBlock$4("span", _hoisted_4$3, _toDisplayString$4(activeFilterCount.value), 1))
              : _createCommentVNode$3("", true)
          ]),
          _: 1
        }, 8, ["color", "variant"]),
        _createVNode$4(_component_v_spacer),
        (hasFilter.value)
          ? (_openBlock$4(), _createBlock$3(_component_v_btn, {
              key: 0,
              size: "small",
              variant: "text",
              onClick: clearFilters
            }, {
              default: _withCtx$3(() => [
                _createVNode$4(_component_v_icon, {
                  icon: "mdi-filter-off-outline",
                  start: ""
                }),
                _createTextVNode$3(_toDisplayString$4(t('clearFilters')), 1)
              ]),
              _: 1
            }))
          : _createCommentVNode$3("", true),
        _createVNode$4(_component_v_btn, {
          color: selectMode.value ? 'primary' : undefined,
          variant: selectMode.value ? 'flat' : 'tonal',
          size: "small",
          "prepend-icon": "mdi-checkbox-multiple-marked-outline",
          onClick: toggleSelectMode
        }, {
          default: _withCtx$3(() => [
            _createTextVNode$3(_toDisplayString$4(selectMode.value ? t('exitSelect') : t('select')), 1)
          ]),
          _: 1
        }, 8, ["color", "variant"])
      ]),
      (selectMode.value)
        ? (_openBlock$4(), _createElementBlock$4("div", _hoisted_5$2, [
            _createElementVNode$4("span", _hoisted_6$2, _toDisplayString$4(t('selectedN', { n: selected.size })), 1),
            _createVNode$4(_component_v_btn, {
              size: "small",
              variant: "text",
              "prepend-icon": "mdi-checkbox-marked-outline",
              onClick: selectCurrentPage
            }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(t(__props.progressive ? 'selLoaded' : 'selPage')), 1)
              ]),
              _: 1
            }),
            _createVNode$4(_component_v_btn, {
              size: "small",
              variant: "text",
              "prepend-icon": "mdi-select-all",
              onClick: selectAll
            }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(t('selAll', { n: filtered.value.length })), 1)
              ]),
              _: 1
            }),
            (selected.size)
              ? (_openBlock$4(), _createBlock$3(_component_v_btn, {
                  key: 0,
                  size: "small",
                  variant: "text",
                  onClick: _cache[0] || (_cache[0] = $event => (selected.clear()))
                }, {
                  default: _withCtx$3(() => [
                    _createTextVNode$3(_toDisplayString$4(t('selClear')), 1)
                  ]),
                  _: 1
                }))
              : _createCommentVNode$3("", true),
            _createVNode$4(_component_v_spacer),
            _createVNode$4(_component_v_btn, {
              disabled: !selected.size,
              color: "success",
              size: "small",
              variant: "tonal",
              "prepend-icon": "mdi-play",
              onClick: _cache[1] || (_cache[1] = $event => (askBatch('resume')))
            }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(t('resume')), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            _createVNode$4(_component_v_btn, {
              disabled: !selected.size,
              color: "warning",
              size: "small",
              variant: "tonal",
              "prepend-icon": "mdi-pause",
              onClick: _cache[2] || (_cache[2] = $event => (askBatch('pause')))
            }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(t('pause')), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            _createVNode$4(_component_v_btn, {
              disabled: !selected.size,
              color: "error",
              size: "small",
              variant: "tonal",
              "prepend-icon": "mdi-bell-off-outline",
              onClick: _cache[3] || (_cache[3] = $event => (askBatch('delete')))
            }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(t('unsub')), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]))
        : _createCommentVNode$3("", true),
      (selectMode.value)
        ? (_openBlock$4(), _createBlock$3(_component_v_btn, {
            key: 1,
            disabled: !selected.size,
            color: "error",
            size: "small",
            variant: "tonal",
            "prepend-icon": "mdi-cancel",
            class: "mb-3",
            onClick: _cache[4] || (_cache[4] = $event => (openBlacklist()))
          }, {
            default: _withCtx$3(() => [
              _createTextVNode$3(_toDisplayString$4(t('block')), 1)
            ]),
            _: 1
          }, 8, ["disabled"]))
        : _createCommentVNode$3("", true),
      (error.value)
        ? (_openBlock$4(), _createBlock$3(_component_v_alert, {
            key: 2,
            class: "mb-3",
            density: "compact",
            type: "warning",
            variant: "tonal"
          }, {
            default: _withCtx$3(() => [
              _createTextVNode$3(_toDisplayString$4(error.value), 1)
            ]),
            _: 1
          }))
        : _createCommentVNode$3("", true)
    ]),
    _createVNode$4(ProgressiveList, {
      ref_key: "listRef",
      ref: listRef,
      progressive: __props.progressive,
      count: paged.value.length,
      loading: loading.value,
      "has-more": paged.value.length < filtered.value.length,
      onLoad: loadMore
    }, {
      default: _withCtx$3(() => [
        (loading.value)
          ? (_openBlock$4(), _createElementBlock$4("div", _hoisted_7$2, [
              (_openBlock$4(true), _createElementBlock$4(_Fragment$3, null, _renderList$3(__props.pageSize, (n) => {
                return (_openBlock$4(), _createElementBlock$4("div", {
                  key: n,
                  class: "asa-skel-card"
                }))
              }), 128))
            ]))
          : (!filtered.value.length)
            ? (_openBlock$4(), _createElementBlock$4("div", _hoisted_8$2, [
                _createElementVNode$4("div", _hoisted_9$2, [
                  _createVNode$4(_component_v_icon, {
                    icon: "mdi-bell-outline",
                    size: "30"
                  })
                ]),
                _createElementVNode$4("p", _hoisted_10$2, _toDisplayString$4(hasFilter.value ? t('emptyFiltered') : t('emptyNone')), 1),
                _createElementVNode$4("p", _hoisted_11$2, _toDisplayString$4(t('emptyHint')), 1)
              ]))
            : (_openBlock$4(), _createElementBlock$4("div", _hoisted_12$2, [
                (_openBlock$4(true), _createElementBlock$4(_Fragment$3, null, _renderList$3(paged.value, (item) => {
                  return (_openBlock$4(), _createBlock$3(MediaCard, {
                    key: item.id,
                    poster: item.poster || '',
                    name: mediaName(item),
                    lines: cardLines(item),
                    status: stateBadge(item.state),
                    selectable: selectMode.value,
                    selected: selected.has(item.id),
                    "more-label": t('more'),
                    onToggle: $event => (toggleOne(item.id))
                  }, {
                    actions: _withCtx$3(() => [
                      _createVNode$4(_component_v_list_item, {
                        "prepend-icon": "mdi-file-edit-outline",
                        title: t('edit'),
                        disabled: nativePending.has(item.id),
                        onClick: $event => (runNative('edit', item))
                      }, null, 8, ["title", "disabled", "onClick"]),
                      _createVNode$4(_component_v_list_item, {
                        "prepend-icon": "mdi-magnify",
                        title: t('search'),
                        disabled: nativePending.has(item.id),
                        onClick: $event => (runNative('search', item))
                      }, null, 8, ["title", "disabled", "onClick"]),
                      (item.state === 'S')
                        ? (_openBlock$4(), _createBlock$3(_component_v_list_item, {
                            key: 0,
                            "base-color": "success",
                            "prepend-icon": "mdi-play",
                            title: t('resume'),
                            disabled: nativePending.has(item.id),
                            onClick: $event => (runNative('resume', item))
                          }, null, 8, ["title", "disabled", "onClick"]))
                        : (_openBlock$4(), _createBlock$3(_component_v_list_item, {
                            key: 1,
                            "base-color": "warning",
                            "prepend-icon": "mdi-pause",
                            title: t('pause'),
                            disabled: nativePending.has(item.id),
                            onClick: $event => (runNative('pause', item))
                          }, null, 8, ["title", "disabled", "onClick"])),
                      _createVNode$4(_component_v_list_item, {
                        "base-color": "warning",
                        "prepend-icon": "mdi-restore-alert",
                        title: t('reset'),
                        disabled: nativePending.has(item.id),
                        onClick: $event => (runNative('reset', item))
                      }, null, 8, ["title", "disabled", "onClick"]),
                      _createVNode$4(_component_v_list_item, {
                        "prepend-icon": "mdi-text-box-search-outline",
                        title: t('activity'),
                        disabled: nativePending.has(item.id),
                        onClick: $event => (runNative('activity', item))
                      }, null, 8, ["title", "disabled", "onClick"]),
                      _createVNode$4(_component_v_list_item, {
                        "prepend-icon": "mdi-information-outline",
                        title: t('detail'),
                        disabled: nativePending.has(item.id),
                        onClick: $event => (runNative('detail', item))
                      }, null, 8, ["title", "disabled", "onClick"]),
                      _createVNode$4(_component_v_divider),
                      _createVNode$4(_component_v_list_item, {
                        "base-color": "error",
                        "prepend-icon": "mdi-cancel",
                        title: t('block'),
                        onClick: $event => (openBlacklist(item))
                      }, null, 8, ["title", "onClick"]),
                      _createVNode$4(_component_v_list_item, {
                        "base-color": "error",
                        "prepend-icon": "mdi-trash-can-outline",
                        title: t('unsub'),
                        disabled: nativePending.has(item.id),
                        onClick: $event => (runNative('delete', item))
                      }, null, 8, ["title", "disabled", "onClick"])
                    ]),
                    _: 2
                  }, 1032, ["poster", "name", "lines", "status", "selectable", "selected", "more-label", "onToggle"]))
                }), 128))
              ]))
      ]),
      _: 1
    }, 8, ["progressive", "count", "loading", "has-more"]),
    _createVNode$4(BlacklistDialog, {
      modelValue: blacklistOpen.value,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((blacklistOpen).value = $event)),
      api: __props.api,
      target: blacklistTarget.value,
      onSaved: blocked
    }, null, 8, ["modelValue", "api", "target"]),
    _createVNode$4(_component_v_dialog, {
      modelValue: confirm.open,
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((confirm.open) = $event)),
      "max-width": "380"
    }, {
      default: _withCtx$3(() => [
        _createVNode$4(_component_v_card, null, {
          default: _withCtx$3(() => [
            _createVNode$4(_component_v_card_title, { class: "text-subtitle-1" }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(confirmTitle.value), 1)
              ]),
              _: 1
            }),
            _createVNode$4(_component_v_card_text, { class: "text-body-2" }, {
              default: _withCtx$3(() => [
                _createTextVNode$3(_toDisplayString$4(confirmText.value), 1)
              ]),
              _: 1
            }),
            _createVNode$4(_component_v_card_actions, null, {
              default: _withCtx$3(() => [
                _createVNode$4(_component_v_spacer),
                _createVNode$4(_component_v_btn, {
                  variant: "text",
                  onClick: _cache[6] || (_cache[6] = $event => (confirm.open = false))
                }, {
                  default: _withCtx$3(() => [
                    _createTextVNode$3(_toDisplayString$4(t('cancel')), 1)
                  ]),
                  _: 1
                }),
                _createVNode$4(_component_v_btn, {
                  color: confirm.kind === 'delete' ? 'error' : 'primary',
                  loading: acting.value,
                  variant: "flat",
                  onClick: runConfirm
                }, {
                  default: _withCtx$3(() => [
                    _createTextVNode$3(_toDisplayString$4(t('ok')), 1)
                  ]),
                  _: 1
                }, 8, ["color", "loading"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    _createVNode$4(_component_v_dialog, {
      modelValue: filterDialog.value,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((filterDialog).value = $event)),
      "max-width": "440",
      scrollable: ""
    }, {
      default: _withCtx$3(() => [
        _createVNode$4(_component_v_card, { class: "sv-filter-dlg" }, {
          default: _withCtx$3(() => [
            _createVNode$4(_component_v_card_title, { class: "sv-filter-dlg__title" }, {
              default: _withCtx$3(() => [
                _createVNode$4(_component_v_icon, {
                  icon: "mdi-filter-variant",
                  size: "20"
                }),
                _createTextVNode$3(_toDisplayString$4(t('filterTitle')), 1)
              ]),
              _: 1
            }),
            _createVNode$4(_component_v_card_text, { class: "sv-filter-dlg__body" }, {
              default: _withCtx$3(() => [
                _createVNode$4(FilterPanel, {
                  state: draft,
                  fields: filterFields.value,
                  stacked: ""
                }, null, 8, ["state", "fields"])
              ]),
              _: 1
            }),
            _createVNode$4(_component_v_card_actions, null, {
              default: _withCtx$3(() => [
                _createVNode$4(_component_v_btn, {
                  variant: "text",
                  onClick: resetDraft
                }, {
                  default: _withCtx$3(() => [
                    _createTextVNode$3(_toDisplayString$4(t('resetFilter')), 1)
                  ]),
                  _: 1
                }),
                _createVNode$4(_component_v_spacer),
                _createVNode$4(_component_v_btn, {
                  variant: "text",
                  onClick: _cache[8] || (_cache[8] = $event => (filterDialog.value = false))
                }, {
                  default: _withCtx$3(() => [
                    _createTextVNode$3(_toDisplayString$4(t('cancel')), 1)
                  ]),
                  _: 1
                }),
                _createVNode$4(_component_v_btn, {
                  color: "primary",
                  variant: "flat",
                  onClick: applyFilterDialog
                }, {
                  default: _withCtx$3(() => [
                    _createTextVNode$3(_toDisplayString$4(t('applyFilter')), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]))
}
}

};
const SubscribeView = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-241e6a29"]]);

const {toDisplayString:_toDisplayString$3,openBlock:_openBlock$3,createElementBlock:_createElementBlock$3,createCommentVNode:_createCommentVNode$2,createTextVNode:_createTextVNode$2,resolveComponent:_resolveComponent$3,withCtx:_withCtx$2,createVNode:_createVNode$3,createBlock:_createBlock$2,createElementVNode:_createElementVNode$3,renderList:_renderList$2,Fragment:_Fragment$2} = await importShared('vue');


const _hoisted_1$3 = { class: "bl-view" };
const _hoisted_2$3 = { class: "asa-pg-controls" };
const _hoisted_3$3 = { class: "asa-filters" };
const _hoisted_4$2 = {
  key: 0,
  class: "asa-filters__badge"
};
const _hoisted_5$1 = { class: "bl-hint" };
const _hoisted_6$1 = {
  key: 0,
  class: "asa-grid"
};
const _hoisted_7$1 = {
  key: 1,
  class: "asa-empty"
};
const _hoisted_8$1 = { class: "asa-empty__ico" };
const _hoisted_9$1 = { class: "asa-empty__text" };
const _hoisted_10$1 = { class: "asa-empty__hint" };
const _hoisted_11$1 = {
  key: 2,
  class: "asa-grid"
};
const _hoisted_12$1 = { class: "mt-2" };

const {computed: computed$2,getCurrentInstance: getCurrentInstance$2,onMounted: onMounted$2,reactive: reactive$2,ref: ref$3,watch: watch$2} = await importShared('vue');

const _sfc_main$3 = {
  __name: 'BlacklistView',
  props: {
  api: { type: Object, default: () => ({}) },
  pageSize: { type: Number, default: 12 },
  page: { type: Number, default: 1 },
  progressive: Boolean,
},
  emits: ['update:page', 'update:pageCount'],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;
const emit = __emit;
const MSG = {
  'zh-CN': { music: '音乐', artists: '艺术家（逗号分隔）', musicType: '音乐类型', recordingType: '单曲', albumType: '专辑', filter: '筛选', filterTitle: '筛选与搜索', clearFilters: '清除筛选', searchLabel: '搜索', searchPh: '搜索名称…', filterYear: '发行年份', yearFrom: '起始年', yearTo: '结束年', filterType: '类型', filterAll: '全部', movie: '电影', tv: '剧集', applyFilter: '应用', resetFilter: '重置', emptyNone: '暂无黑名单', emptyNoneHint: '将不想自动订阅的影视加入黑名单', emptyFiltered: '没有符合筛选条件的记录', emptyFilteredHint: '试试调整搜索或筛选条件', hint: '已忽略的影视不会再被自动订阅，规则不会随历史清理而删除。', search: '搜索黑名单', add: '手动添加', refresh: '刷新', empty: '暂无符合条件的黑名单', ignored: '已忽略', more: '更多', remove: '移出黑名单', removeHint: '移出后，下次运行将重新按正常订阅规则评估。已有成功历史仍参与去重。', cancel: '取消', type: '类型', scope: '忽略范围', all: '全部季', year: '发行年份', time: '加入时间', failed: '操作失败' },
  'zh-TW': { music: '音樂', artists: '藝術家（逗號分隔）', musicType: '音樂類型', recordingType: '單曲', albumType: '專輯', filter: '篩選', filterTitle: '篩選與搜尋', clearFilters: '清除篩選', searchLabel: '搜尋', searchPh: '搜尋名稱…', filterYear: '發行年份', yearFrom: '起始年', yearTo: '結束年', filterType: '類型', filterAll: '全部', movie: '電影', tv: '劇集', applyFilter: '套用', resetFilter: '重設', emptyNone: '暫無黑名單', emptyNoneHint: '將不想自動訂閱的影視加入黑名單', emptyFiltered: '沒有符合篩選條件的記錄', emptyFilteredHint: '試試調整搜尋或篩選條件', hint: '已忽略的影視不會再被自動訂閱，規則不會隨歷史清理而刪除。', search: '搜尋黑名單', add: '手動新增', refresh: '重新整理', empty: '暫無符合條件的黑名單', ignored: '已忽略', more: '更多', remove: '移出黑名單', removeHint: '移出後，下次執行將重新按正常訂閱規則評估。已有成功歷史仍參與去重。', cancel: '取消', type: '類型', scope: '忽略範圍', all: '全部季', year: '發行年份', time: '加入時間', failed: '操作失敗' },
  'en-US': { music: 'Music', artists: 'Artists (comma separated)', musicType: 'Music type', recordingType: 'Song', albumType: 'Album', filter: 'Filters', filterTitle: 'Filter & search', clearFilters: 'Clear filters', searchLabel: 'Search', searchPh: 'Search name…', filterYear: 'Release year', yearFrom: 'From', yearTo: 'To', filterType: 'Type', filterAll: 'All', movie: 'Movies', tv: 'TV series', applyFilter: 'Apply', resetFilter: 'Reset', emptyNone: 'No blacklist entries yet', emptyNoneHint: 'Add media you want to skip automatically', emptyFiltered: 'No records match the filters', emptyFilteredHint: 'Try adjusting the search or filters', hint: 'Ignored media will be skipped automatically. Rules survive history cleanup.', search: 'Search blacklist', add: 'Add manually', refresh: 'Refresh', empty: 'No matching blacklist entries', ignored: 'Ignored', more: 'More', remove: 'Remove from blacklist', removeHint: 'Future runs will evaluate this media normally. Successful history still prevents duplicate subscriptions.', cancel: 'Cancel', type: 'Type', scope: 'Ignore', all: 'All seasons', year: 'Release year', time: 'Added', failed: 'Action failed' },
};
const inst = getCurrentInstance$2();
function t(key) {
  const raw = inst?.appContext?.config?.globalProperties?.$i18n?.locale;
  const lang = String(raw?.value || raw || '').toLowerCase();
  return MSG[lang.startsWith('en') ? 'en-US' : /tw|hant|hk/.test(lang) ? 'zh-TW' : 'zh-CN'][key] || key
}
const rows = ref$3([]);
const emptyFilters = () => ({ keyword: '', yearMin: null, yearMax: null, mtypes: [] });
const cloneFilters = source => ({ ...source, mtypes: [...source.mtypes] });
const filters = reactive$2(emptyFilters());
const draft = reactive$2(emptyFilters());
const filterDialog = ref$3(false);
const filterFields = computed$2(() => [
  { type: 'search', key: 'keyword', label: t('searchLabel'), placeholder: t('searchPh') },
  { type: 'year-range', keyMin: 'yearMin', keyMax: 'yearMax', label: t('filterYear'), minText: t('yearFrom'), maxText: t('yearTo') },
  { type: 'select', key: 'mtypes', multi: true, label: t('filterType'), icon: 'mdi-shape-outline', allText: t('filterAll'),
    items: [{ title: t('movie'), value: '电影' }, { title: t('tv'), value: '电视剧' }, { title: t('music'), value: '音乐' }] },
]);
const activeFilterCount = computed$2(() => (filters.keyword ? 1 : 0) +
  (filters.yearMin != null || filters.yearMax != null ? 1 : 0) + (filters.mtypes.length ? 1 : 0));
const hasFilter = computed$2(() => activeFilterCount.value > 0);
function openFilterDialog() { Object.assign(draft, cloneFilters(filters)); filterDialog.value = true; }
function applyFilterDialog() { Object.assign(filters, cloneFilters(draft)); filterDialog.value = false; }
function resetDraft() { Object.assign(draft, emptyFilters()); }
function clearFilters() { Object.assign(filters, emptyFilters()); }
const loading = ref$3(false);
const error = ref$3('');
const addOpen = ref$3(false);
const removing = ref$3(null);
const acting = ref$3(false);
const filtered = computed$2(() => {
  const keyword = (filters.keyword || '').trim().toLowerCase();
  return rows.value.filter(row => {
    if (keyword && !String(row.title || '').toLowerCase().includes(keyword)) return false
    if (filters.mtypes.length && !filters.mtypes.includes(row.type)) return false
    if (filters.yearMin != null || filters.yearMax != null) {
      const year = parseInt(row.year, 10);
      if (!Number.isFinite(year)) return false
      if (filters.yearMin != null && year < filters.yearMin) return false
      if (filters.yearMax != null && year > filters.yearMax) return false
    }
    return true
  })
});
const pageCount = computed$2(() => Math.max(1, Math.ceil(filtered.value.length / props.pageSize)));
const listRef = ref$3(null);
const visibleCount = ref$3(props.pageSize);
const paged = computed$2(() => props.progressive ? filtered.value.slice(0, visibleCount.value)
  : filtered.value.slice((props.page - 1) * props.pageSize, props.page * props.pageSize));
function loadMore() { visibleCount.value += props.pageSize; }
watch$2([filtered, () => props.progressive, () => props.pageSize], () => {
  visibleCount.value = props.pageSize;
  if (props.progressive) listRef.value?.scrollToTop();
});
watch$2(pageCount, count => emit('update:pageCount', count), { immediate: true });
watch$2(filters, () => emit('update:page', 1), { deep: true });
function mediaName(item) {
  return item.type === '电视剧' && item.season != null
    ? `${item.title} · S${String(item.season).padStart(2, '0')}` : item.title
}
function lines(item) {
  return [
    { icon: 'mdi-shape-outline', label: t('type'), value: item.type === '音乐' ? `${item.type} · ${item.music_type === 'album' ? t('albumType') : t('recordingType')}` : item.type },
    ...(item.type === '音乐' && item.artists?.length ? [{ icon: 'mdi-account-music', label: t('artists'), value: item.artists.join(' / ') }] : []),
    { icon: 'mdi-cancel', label: t('scope'), value: item.type === '电视剧' ? item.season == null ? t('all') : `S${String(item.season).padStart(2, '0')}` : '—' },
    { icon: 'mdi-clock-outline', label: t('time'), value: item.time || '—' },
    { icon: 'mdi-calendar', label: t('year'), value: item.year || '—' },
  ]
}
let requestSeq = 0;
async function reload() {
  const seq = ++requestSeq;
  loading.value = true;
  error.value = '';
  try {
    const result = await props.api.get('plugin/AutomaticSubscriptionAssistant/blacklist');
    if (seq !== requestSeq) return
    if (result?.code !== 0) throw new Error(result?.message || t('failed'))
    rows.value = Array.isArray(result.list) ? result.list : [];
  } catch (e) { if (seq === requestSeq) error.value = e?.message || String(e); }
  finally { if (seq === requestSeq) loading.value = false; }
}
async function remove() {
  if (acting.value || !removing.value) return
  acting.value = true;
  try {
    const result = await props.api.post('plugin/AutomaticSubscriptionAssistant/blacklist/delete', { ids: [removing.value.id] });
    if (result?.code !== 0) throw new Error(result?.message || t('failed'))
    removing.value = null;
    await reload();
  } catch (e) { error.value = e?.message || String(e); removing.value = null; }
  finally { acting.value = false; }
}
__expose({ reload });
onMounted$2(reload);

return (_ctx, _cache) => {
  const _component_v_btn = _resolveComponent$3("v-btn");
  const _component_v_spacer = _resolveComponent$3("v-spacer");
  const _component_v_icon = _resolveComponent$3("v-icon");
  const _component_v_alert = _resolveComponent$3("v-alert");
  const _component_v_list_item = _resolveComponent$3("v-list-item");
  const _component_v_card_title = _resolveComponent$3("v-card-title");
  const _component_v_card_text = _resolveComponent$3("v-card-text");
  const _component_v_card_actions = _resolveComponent$3("v-card-actions");
  const _component_v_card = _resolveComponent$3("v-card");
  const _component_v_dialog = _resolveComponent$3("v-dialog");

  return (_openBlock$3(), _createElementBlock$3("div", _hoisted_1$3, [
    _createElementVNode$3("div", _hoisted_2$3, [
      _createElementVNode$3("div", _hoisted_3$3, [
        _createVNode$3(_component_v_btn, {
          class: "asa-filters__trigger",
          color: hasFilter.value ? 'primary' : undefined,
          "prepend-icon": "mdi-filter-variant",
          size: "small",
          variant: hasFilter.value ? 'tonal' : 'outlined',
          onClick: openFilterDialog
        }, {
          default: _withCtx$2(() => [
            _createTextVNode$2(_toDisplayString$3(t('filter')) + " ", 1),
            (activeFilterCount.value)
              ? (_openBlock$3(), _createElementBlock$3("span", _hoisted_4$2, _toDisplayString$3(activeFilterCount.value), 1))
              : _createCommentVNode$2("", true)
          ]),
          _: 1
        }, 8, ["color", "variant"]),
        _createVNode$3(_component_v_spacer),
        (hasFilter.value)
          ? (_openBlock$3(), _createBlock$2(_component_v_btn, {
              key: 0,
              class: "asa-filters__clear",
              size: "small",
              variant: "text",
              onClick: clearFilters
            }, {
              default: _withCtx$2(() => [
                _createVNode$3(_component_v_icon, {
                  icon: "mdi-filter-off-outline",
                  start: ""
                }),
                _createTextVNode$2(_toDisplayString$3(t('clearFilters')), 1)
              ]),
              _: 1
            }))
          : _createCommentVNode$2("", true),
        _createVNode$3(_component_v_btn, {
          "prepend-icon": "mdi-plus",
          size: "small",
          color: "primary",
          variant: "tonal",
          onClick: _cache[0] || (_cache[0] = $event => (addOpen.value = true))
        }, {
          default: _withCtx$2(() => [
            _createTextVNode$2(_toDisplayString$3(t('add')), 1)
          ]),
          _: 1
        })
      ]),
      _createElementVNode$3("p", _hoisted_5$1, _toDisplayString$3(t('hint')), 1),
      (error.value)
        ? (_openBlock$3(), _createBlock$2(_component_v_alert, {
            key: 0,
            type: "warning",
            variant: "tonal",
            density: "compact",
            class: "mb-3"
          }, {
            default: _withCtx$2(() => [
              _createTextVNode$2(_toDisplayString$3(error.value), 1)
            ]),
            _: 1
          }))
        : _createCommentVNode$2("", true)
    ]),
    _createVNode$3(ProgressiveList, {
      ref_key: "listRef",
      ref: listRef,
      progressive: __props.progressive,
      count: paged.value.length,
      loading: loading.value,
      "has-more": paged.value.length < filtered.value.length,
      onLoad: loadMore
    }, {
      default: _withCtx$2(() => [
        (loading.value)
          ? (_openBlock$3(), _createElementBlock$3("div", _hoisted_6$1, [
              (_openBlock$3(true), _createElementBlock$3(_Fragment$2, null, _renderList$2(__props.pageSize, (n) => {
                return (_openBlock$3(), _createElementBlock$3("div", {
                  key: n,
                  class: "asa-skel-card"
                }))
              }), 128))
            ]))
          : (!filtered.value.length)
            ? (_openBlock$3(), _createElementBlock$3("div", _hoisted_7$1, [
                _createElementVNode$3("div", _hoisted_8$1, [
                  _createVNode$3(_component_v_icon, {
                    icon: hasFilter.value ? 'mdi-filter-off-outline' : 'mdi-cancel',
                    size: "30"
                  }, null, 8, ["icon"])
                ]),
                _createElementVNode$3("p", _hoisted_9$1, _toDisplayString$3(t(hasFilter.value ? 'emptyFiltered' : 'emptyNone')), 1),
                _createElementVNode$3("p", _hoisted_10$1, _toDisplayString$3(t(hasFilter.value ? 'emptyFilteredHint' : 'emptyNoneHint')), 1),
                (hasFilter.value)
                  ? (_openBlock$3(), _createBlock$2(_component_v_btn, {
                      key: 0,
                      size: "small",
                      variant: "tonal",
                      onClick: clearFilters
                    }, {
                      default: _withCtx$2(() => [
                        _createTextVNode$2(_toDisplayString$3(t('clearFilters')), 1)
                      ]),
                      _: 1
                    }))
                  : _createCommentVNode$2("", true)
              ]))
            : (_openBlock$3(), _createElementBlock$3("div", _hoisted_11$1, [
                (_openBlock$3(true), _createElementBlock$3(_Fragment$2, null, _renderList$2(paged.value, (item) => {
                  return (_openBlock$3(), _createBlock$2(MediaCard, {
                    key: item.id,
                    poster: item.poster || '',
                    name: mediaName(item),
                    lines: lines(item),
                    status: { label: t('ignored'), color: 'rgb(var(--v-theme-error))', icon: 'mdi-cancel' },
                    "more-label": t('more')
                  }, {
                    actions: _withCtx$2(() => [
                      _createVNode$3(_component_v_list_item, {
                        "prepend-icon": "mdi-restore",
                        title: t('remove'),
                        onClick: $event => (removing.value = item)
                      }, null, 8, ["title", "onClick"])
                    ]),
                    _: 2
                  }, 1032, ["poster", "name", "lines", "status", "more-label"]))
                }), 128))
              ]))
      ]),
      _: 1
    }, 8, ["progressive", "count", "loading", "has-more"]),
    _createVNode$3(_component_v_dialog, {
      modelValue: filterDialog.value,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((filterDialog).value = $event)),
      "max-width": "440",
      scrollable: ""
    }, {
      default: _withCtx$2(() => [
        _createVNode$3(_component_v_card, { class: "asa-filter-dlg" }, {
          default: _withCtx$2(() => [
            _createVNode$3(_component_v_card_title, { class: "asa-filter-dlg__title" }, {
              default: _withCtx$2(() => [
                _createVNode$3(_component_v_icon, {
                  icon: "mdi-filter-variant",
                  size: "20"
                }),
                _createTextVNode$2(_toDisplayString$3(t('filterTitle')), 1)
              ]),
              _: 1
            }),
            _createVNode$3(_component_v_card_text, { class: "asa-filter-dlg__body" }, {
              default: _withCtx$2(() => [
                _createVNode$3(FilterPanel, {
                  state: draft,
                  fields: filterFields.value,
                  stacked: ""
                }, null, 8, ["state", "fields"])
              ]),
              _: 1
            }),
            _createVNode$3(_component_v_card_actions, null, {
              default: _withCtx$2(() => [
                _createVNode$3(_component_v_btn, {
                  variant: "text",
                  onClick: resetDraft
                }, {
                  default: _withCtx$2(() => [
                    _createTextVNode$2(_toDisplayString$3(t('resetFilter')), 1)
                  ]),
                  _: 1
                }),
                _createVNode$3(_component_v_spacer),
                _createVNode$3(_component_v_btn, {
                  variant: "text",
                  onClick: _cache[1] || (_cache[1] = $event => (filterDialog.value = false))
                }, {
                  default: _withCtx$2(() => [
                    _createTextVNode$2(_toDisplayString$3(t('cancel')), 1)
                  ]),
                  _: 1
                }),
                _createVNode$3(_component_v_btn, {
                  color: "primary",
                  variant: "flat",
                  onClick: applyFilterDialog
                }, {
                  default: _withCtx$2(() => [
                    _createTextVNode$2(_toDisplayString$3(t('applyFilter')), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    _createVNode$3(BlacklistDialog, {
      modelValue: addOpen.value,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((addOpen).value = $event)),
      api: __props.api,
      onSaved: reload
    }, null, 8, ["modelValue", "api"]),
    _createVNode$3(_component_v_dialog, {
      "model-value": !!removing.value,
      "max-width": "380",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = v => !acting.value && !v && (removing.value = null))
    }, {
      default: _withCtx$2(() => [
        _createVNode$3(_component_v_card, null, {
          default: _withCtx$2(() => [
            _createVNode$3(_component_v_card_title, { class: "text-subtitle-1" }, {
              default: _withCtx$2(() => [
                _createTextVNode$2(_toDisplayString$3(t('remove')), 1)
              ]),
              _: 1
            }),
            _createVNode$3(_component_v_card_text, { class: "text-body-2" }, {
              default: _withCtx$2(() => [
                _createTextVNode$2(_toDisplayString$3(removing.value?.title), 1),
                _createElementVNode$3("p", _hoisted_12$1, _toDisplayString$3(t('removeHint')), 1)
              ]),
              _: 1
            }),
            _createVNode$3(_component_v_card_actions, null, {
              default: _withCtx$2(() => [
                _createVNode$3(_component_v_spacer),
                _createVNode$3(_component_v_btn, {
                  disabled: acting.value,
                  variant: "text",
                  onClick: _cache[4] || (_cache[4] = $event => (removing.value = null))
                }, {
                  default: _withCtx$2(() => [
                    _createTextVNode$2(_toDisplayString$3(t('cancel')), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                _createVNode$3(_component_v_btn, {
                  loading: acting.value,
                  color: "primary",
                  variant: "flat",
                  onClick: remove
                }, {
                  default: _withCtx$2(() => [
                    _createTextVNode$2(_toDisplayString$3(t('remove')), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["model-value"])
  ]))
}
}

};
const BlacklistView = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-01954d19"]]);

const {renderList:_renderList$1,Fragment:_Fragment$1,openBlock:_openBlock$2,createElementBlock:_createElementBlock$2,resolveComponent:_resolveComponent$2,createVNode:_createVNode$2,toDisplayString:_toDisplayString$2,createElementVNode:_createElementVNode$2,normalizeClass:_normalizeClass$1} = await importShared('vue');


const _hoisted_1$2 = {
  class: "asa-tabs",
  role: "tablist"
};
const _hoisted_2$2 = ["aria-selected", "onClick"];
const _hoisted_3$2 = { class: "asa-tab__label" };


const _sfc_main$2 = {
  __name: 'PluginTabs',
  props: {
  active: { type: String, default: '' },
  // [{ key, label, icon }]
  tabs: { type: Array, default: () => [] },
},
  emits: ['select'],
  setup(__props, { emit: __emit }) {


const emit = __emit;

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent$2("v-icon");

  return (_openBlock$2(), _createElementBlock$2("nav", _hoisted_1$2, [
    (_openBlock$2(true), _createElementBlock$2(_Fragment$1, null, _renderList$1(__props.tabs, (tab) => {
      return (_openBlock$2(), _createElementBlock$2("button", {
        key: tab.key,
        type: "button",
        role: "tab",
        "aria-selected": __props.active === tab.key,
        class: _normalizeClass$1(['asa-tab', { 'asa-tab--active': __props.active === tab.key }]),
        onClick: $event => (emit('select', tab.key))
      }, [
        _createVNode$2(_component_v_icon, {
          icon: tab.icon,
          size: "16"
        }, null, 8, ["icon"]),
        _createElementVNode$2("span", _hoisted_3$2, _toDisplayString$2(tab.label), 1)
      ], 10, _hoisted_2$2))
    }), 128))
  ]))
}
}

};
const PluginTabs = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-969fe2e2"]]);

const {resolveComponent:_resolveComponent$1,createVNode:_createVNode$1,toDisplayString:_toDisplayString$1,createTextVNode:_createTextVNode$1,withCtx:_withCtx$1,createElementVNode:_createElementVNode$1,openBlock:_openBlock$1,createBlock:_createBlock$1,createCommentVNode:_createCommentVNode$1,createElementBlock:_createElementBlock$1} = await importShared('vue');


const _hoisted_1$1 = { class: "hs-hint" };
const _hoisted_2$1 = ["inert"];
const _hoisted_3$1 = { class: "hs-hint" };
const _hoisted_4$1 = {
  key: 0,
  class: "hs-hint",
  role: "status"
};

const {computed: computed$1,getCurrentInstance: getCurrentInstance$1,inject,onBeforeUnmount: onBeforeUnmount$2,reactive: reactive$1,ref: ref$2,watch: watch$1} = await importShared('vue');


const _sfc_main$1 = {
  __name: 'SupplementDialog',
  props: { modelValue: Boolean, target: { type: Object, default: () => ({}) }, api: { type: Object, default: () => ({}) } },
  emits: ['update:modelValue', 'changed'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const toast = inject('moviepilot:toast', null);
const inst = getCurrentInstance$1();
const messages = {
  'zh-CN': { music: '音乐', artists: '艺术家（逗号分隔）', musicType: '音乐类型', recordingType: '单曲', albumType: '专辑',
    title: '补充编辑', hint: '补充媒体信息后重新识别并添加订阅。本次手动操作不使用榜单筛选；仍检查黑名单、媒体库和已有订阅，不修改自动任务设置。',
    name: '媒体名称', type: '类型', movie: '电影', tv: '电视剧', year: '发行年份（可选）', source: '媒体来源（可选）', mediaId: '媒体 ID（可选）',
    identityHint: '来源和 ID 同时留空时按名称、类型和年份重新识别。', season: '目标季号（0 为特别篇）', group: '剧集组（可选）',
    settings: '本次订阅设置', defaults: '留空使用主程序默认设置。参数仅作用于本次创建，不修改来源或全局配置。',
    keyword: '搜索关键词', quality: '质量', resolution: '分辨率', effect: '特效', sites: '订阅站点', downloader: '下载器', path: '保存路径',
    interval: '搜索间隔（小时，留空跟随系统）', total: '总集数（可选）', start: '开始集数（可选）', include: '资源包含表达式', exclude: '资源排除表达式', rules: '过滤规则组',
    mode: '订阅模式', normal: '普通订阅', best: '洗版订阅', whole: '全集洗版', exists: '媒体库已有内容', inherit: '跟随主程序/插件默认设置', skip: '跳过已入库内容', allow: '允许创建订阅',
    reset: '重置', cancel: '取消', submit: '重新识别并添加', required: '请填写媒体名称', pair: '媒体来源与 ID 必须同时填写或同时留空',
    invalid: '{name} 格式或范围不正确', optionsError: '部分选项加载失败，可留空使用默认设置，或稍后重新打开。', failed: '操作失败', created: '已添加新订阅',
  },
  'zh-TW': { music: '音樂', artists: '藝術家（逗號分隔）', musicType: '音樂類型', recordingType: '單曲', albumType: '專輯',
    title: '補充編輯', hint: '補充媒體資訊後重新識別並新增訂閱。本次手動操作不使用榜單篩選；仍檢查黑名單、媒體庫和已有訂閱，不修改自動工作設定。',
    name: '媒體名稱', type: '類型', movie: '電影', tv: '劇集', year: '發行年份（可選）', source: '媒體來源（可選）', mediaId: '媒體 ID（可選）',
    identityHint: '來源和 ID 同時留空時按名稱、類型和年份重新識別。', season: '目標季號（0 為特別篇）', group: '劇集組（可選）',
    settings: '本次訂閱設定', defaults: '留空使用主程式預設設定。參數僅作用於本次建立，不修改來源或全域設定。',
    keyword: '搜尋關鍵字', quality: '品質', resolution: '解析度', effect: '特效', sites: '訂閱站點', downloader: '下載器', path: '儲存路徑',
    interval: '搜尋間隔（小時，留空跟隨系統）', total: '總集數（可選）', start: '開始集數（可選）', include: '資源包含運算式', exclude: '資源排除運算式', rules: '篩選規則組',
    mode: '訂閱模式', normal: '普通訂閱', best: '洗版訂閱', whole: '全集洗版', exists: '媒體庫已有內容', inherit: '跟隨主程式/外掛預設設定', skip: '略過已入庫內容', allow: '允許建立訂閱',
    reset: '重設', cancel: '取消', submit: '重新識別並新增', required: '請填寫媒體名稱', pair: '媒體來源與 ID 必須同時填寫或同時留空',
    invalid: '{name} 格式或範圍不正確', optionsError: '部分選項載入失敗，可留空使用預設設定，或稍後重新開啟。', failed: '操作失敗', created: '已新增訂閱',
  },
  'en-US': { music: 'Music', artists: 'Artists (comma separated)', musicType: 'Music type', recordingType: 'Song', albumType: 'Album',
    title: 'Edit and subscribe', hint: 'Correct the media, recognize it again and add a subscription. This manual action skips ranking filters, checks the blacklist, library and existing subscriptions, and keeps automatic task settings.',
    name: 'Title', type: 'Type', movie: 'Movie', tv: 'TV series', year: 'Release year (optional)', source: 'Media source (optional)', mediaId: 'Media ID (optional)',
    identityHint: 'Clear both source and ID to recognize by title, type and year.', season: 'Target season (0 for specials)', group: 'Episode group (optional)',
    settings: 'Subscription settings', defaults: 'Leave blank to use host defaults. Settings apply only to this subscription.',
    keyword: 'Search keywords', quality: 'Quality', resolution: 'Resolution', effect: 'Effects', sites: 'Subscription sites', downloader: 'Downloader', path: 'Save path',
    interval: 'Search interval (hours, blank for default)', total: 'Total episodes (optional)', start: 'Start episode (optional)', include: 'Include expression', exclude: 'Exclude expression', rules: 'Filter rule groups',
    mode: 'Subscription mode', normal: 'Normal', best: 'Version upgrade', whole: 'Whole-season upgrade', exists: 'Already in library', inherit: 'Use host/plugin default', skip: 'Skip existing content', allow: 'Allow subscription',
    reset: 'Reset', cancel: 'Cancel', submit: 'Recognize and add', required: 'Enter a media title', pair: 'Provide both media source and ID, or clear both',
    invalid: 'Invalid {name}', optionsError: 'Some options could not load. Use defaults or reopen later.', failed: 'Action failed', created: 'Subscription added',
  },
};
function t(key, params) {
  const raw = inst?.appContext?.config?.globalProperties?.$i18n?.locale;
  const lang = String(raw?.value || raw || '').toLowerCase();
  let text = messages[lang.startsWith('en') ? 'en-US' : /tw|hant|hk/.test(lang) ? 'zh-TW' : 'zh-CN'][key] || key;
  if (params) for (const name in params) text = text.replaceAll(`{${name}}`, params[name]);
  return text
}
const media = reactive$1({ title: '', type: '电影', year: '', media_source: null, media_id: '', season: '', episode_group: '' });
const emptySettings = () => ({ keyword: '', quality: null, resolution: null, effect: null, sites: [], downloader: null,
  save_path: '', search_interval: '', total_episode: '', start_episode: '', include: '', exclude: '', filter_groups: [], mode: null, exist_ok: null });
const subscription = reactive$1(emptySettings());
const busy = ref$2(false);
const feedback = ref$2('');
const feedbackType = ref$2('error');
const advanced = ref$2();
const optionsError = ref$2(false);
const siteOptions = ref$2([]);
const downloaderOptions = ref$2([]);
const ruleOptions = ref$2([]);
const isMusic = computed$1(() => media.type === '音乐');
const isTV = computed$1(() => media.type === '电视剧');
const sources = [{ title: 'TMDB', value: 'themoviedb' }, { title: 'Douban', value: 'douban' }, { title: 'Bangumi', value: 'bangumi' }, { title: 'AniList', value: 'anilist' }, { title: 'MusicBrainz', value: 'musicbrainz' }, { title: 'TheAudioDB', value: 'theaudiodb' }, { title: 'Douban Music', value: 'doubanmusic' }];
const mediaFields = computed$1(() => [
  { type: 'text', key: 'title', label: t('name') },
  { type: 'select', key: 'type', label: t('type'), clearable: false, items: [{ title: t('movie'), value: '电影' }, { title: t('tv'), value: '电视剧' }, { title: t('music'), value: '音乐' }] },
  ...(isMusic.value ? [{ type: 'text', key: 'artistsText', label: t('artists') }, { type: 'select', key: 'music_type', label: t('musicType'), clearable: false, items: [{ title: t('recordingType'), value: 'recording' }, { title: t('albumType'), value: 'album' }] }] : []),
  { type: 'number', key: 'year', label: t('year'), min: 1800, max: 2999, step: 1 },
  { type: 'select', key: 'media_source', label: t('source'), items: sources },
  { type: 'text', key: 'media_id', label: t('mediaId'), hint: t('identityHint') },
  ...(isTV.value ? [{ type: 'number', key: 'season', label: t('season'), min: 0, max: 999, step: 1 }, { type: 'text', key: 'episode_group', label: t('group') }] : []),
]);
const subscriptionFields = computed$1(() => [
  { type: 'text', key: 'keyword', label: t('keyword') },
  ...(!isMusic.value ? [{ type: 'select', key: 'quality', label: t('quality'), items: ['Remux', ['Blu-ray', 'Blu-?Ray'], ['UHD', 'UHD|UltraHD'], ['WEB-DL / WEBRip', 'WEB-?DL|WEB-?RIP'], 'HDTV'].map(v => ({ title: Array.isArray(v) ? v[0] : v, value: Array.isArray(v) ? v[1] : v })) },
  { type: 'select', key: 'resolution', label: t('resolution'), items: [{ title: '4K', value: '4K|2160p|x2160' }, { title: '1080p', value: '1080[pi]|x1080' }, { title: '720p', value: '720[pi]|x720' }] },
  { type: 'text', key: 'effect', label: t('effect') }] : []),
  { type: 'select', key: 'sites', label: t('sites'), multi: true, items: siteOptions.value },
  { type: 'select', key: 'downloader', label: t('downloader'), items: downloaderOptions.value },
  { type: 'text', key: 'save_path', label: t('path') },
  { type: 'number', key: 'search_interval', label: t('interval'), min: 1, max: 8760, step: 1 },
  ...(isTV.value ? [{ type: 'number', key: 'total_episode', label: t('total'), min: 1, max: 10000, step: 1 }, { type: 'number', key: 'start_episode', label: t('start'), min: 1, max: 10000, step: 1 }] : []),
  { type: 'select', key: 'mode', label: t('mode'), items: [{ title: t('normal'), value: 'normal' }, { title: t('best'), value: 'best' }, ...(isTV.value ? [{ title: t('whole'), value: 'whole' }] : [])] },
  { type: 'text', key: 'include', label: t('include') }, { type: 'text', key: 'exclude', label: t('exclude') },
  { type: 'select', key: 'filter_groups', label: t('rules'), multi: true, items: ruleOptions.value },
  { type: 'select', key: 'exist_ok', label: t('exists'), items: [{ title: t('skip'), value: false }, { title: t('allow'), value: true }], placeholder: t('inherit') },
]);

function resetForm() {
  const item = props.target;
  Object.assign(media, { title: item.title || '', type: item.type || '电影', year: item.year || '',
    media_source: item.media_source || null, media_id: item.media_id == null ? '' : String(item.media_id),
    season: item.season ?? '', episode_group: item.episode_group || '', music_type: item.music_type || 'recording', artistsText: (item.artists || []).join(', ') });
  Object.assign(subscription, emptySettings());
  feedback.value = '';
  advanced.value = undefined;
}
function integer(value, key, min, max, required = false) {
  if (value === '' || value == null) {
    if (required) throw new Error(t('invalid', { name: t(key) }))
    return null
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < min || number > max) throw new Error(t('invalid', { name: t(key) }))
  return number
}
function buildRequest() {
  if (!media.title.trim()) throw new Error(t('required'))
  if (isMusic.value && !(media.artistsText || '').trim()) throw new Error(t('invalid', { name: t('artists') }))
  const mediaId = media.media_id.trim();
  if (!!media.media_source !== !!mediaId) throw new Error(t('pair'))
  const year = integer(media.year, 'year', 1800, 2999);
  const season = isTV.value ? integer(media.season, 'season', 0, 999, true) : null;
  const options = {};
  for (const key of ['keyword', 'quality', 'resolution', 'effect', 'downloader', 'save_path', 'include', 'exclude']) {
    const value = String(subscription[key] ?? '').trim();
    if (value) options[key] = value;
  }
  for (const key of ['sites', 'filter_groups']) if (subscription[key].length) options[key] = [...subscription[key]];
  const interval = integer(subscription.search_interval, 'interval', 1, 8760);
  if (interval != null) options.search_interval = interval;
  if (isTV.value) {
    for (const [key, label] of [['total_episode', 'total'], ['start_episode', 'start']]) {
      const value = integer(subscription[key], label, 1, 10000);
      if (value != null) options[key] = value;
    }
  }
  if (subscription.mode) {
    options.best_version = subscription.mode === 'normal' ? 0 : 1;
    options.best_version_full = isTV.value && subscription.mode === 'whole' ? 1 : 0;
  }
  return { unique: props.target.unique, media: { title: media.title.trim(), type: media.type, year: year == null ? null : String(year),
    media_source: media.media_source, media_id: mediaId,
    ...(isMusic.value ? { music_type: media.music_type, artists: (media.artistsText || '').split(/[,，]/).map(name => name.trim()).filter(Boolean) } : {}), season, episode_group: isTV.value ? media.episode_group.trim() : null },
    subscription: options, ...(typeof subscription.exist_ok === 'boolean' ? { exist_ok: subscription.exist_ok } : {}) }
}

let generation = 0;
let disposed = false;
async function loadOptions() {
  const current = ++generation;
  optionsError.value = false;
  const results = await Promise.allSettled(['site/rss', 'download/clients', 'rule/groups?include_usage=false'].map(async url => props.api.get(url, { feedback: 'silent' })));
  if (disposed || current !== generation || !props.modelValue) return
  const data = results.map(result => {
    if (result.status === 'rejected' || result.value?.success === false) { optionsError.value = true; return null }
    return result.value?.success === true ? result.value.data : result.value
  });
  siteOptions.value = (Array.isArray(data[0]) ? data[0] : []).map(site => ({ title: site.name, value: site.id }));
  downloaderOptions.value = (Array.isArray(data[1]) ? data[1] : []).map(client => ({ title: client.name, value: client.name }));
  ruleOptions.value = (data[2]?.rule_groups || []).map(group => ({ title: group.name, value: group.name }));
}
watch$1(() => props.modelValue, open => {
  if (!open) { generation++; return }
  resetForm();
  loadOptions();
});
async function submit() {
  if (busy.value || disposed) return
  feedback.value = '';
  feedbackType.value = 'error';
  let body;
  try { body = buildRequest(); } catch (error) { feedback.value = error.message; return }
  busy.value = true;
  try {
    const result = await props.api.post('plugin/AutomaticSubscriptionAssistant/history/supplement', body);
    if (disposed) return
    if (result?.code !== 0) throw new Error(result?.message || t('failed'))
    emit('changed', result);
    if (result.created) { toast?.success?.(t('created')); emit('update:modelValue', false); }
    else { feedbackType.value = 'warning'; feedback.value = result.message || t('failed'); }
  } catch (error) { if (!disposed) feedback.value = error?.message || String(error); }
  finally { busy.value = false; }
}
onBeforeUnmount$2(() => { disposed = true; generation++; });

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent$1("v-icon");
  const _component_v_card_title = _resolveComponent$1("v-card-title");
  const _component_v_alert = _resolveComponent$1("v-alert");
  const _component_v_expansion_panel_text = _resolveComponent$1("v-expansion-panel-text");
  const _component_v_expansion_panel = _resolveComponent$1("v-expansion-panel");
  const _component_v_expansion_panels = _resolveComponent$1("v-expansion-panels");
  const _component_v_card_text = _resolveComponent$1("v-card-text");
  const _component_v_btn = _resolveComponent$1("v-btn");
  const _component_v_spacer = _resolveComponent$1("v-spacer");
  const _component_v_card_actions = _resolveComponent$1("v-card-actions");
  const _component_v_card = _resolveComponent$1("v-card");
  const _component_v_dialog = _resolveComponent$1("v-dialog");

  return (_openBlock$1(), _createBlock$1(_component_v_dialog, {
    "model-value": __props.modelValue,
    persistent: busy.value,
    "max-width": "680",
    scrollable: "",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = v => !busy.value && emit('update:modelValue', v))
  }, {
    default: _withCtx$1(() => [
      _createVNode$1(_component_v_card, { class: "asa-filter-dlg" }, {
        default: _withCtx$1(() => [
          _createVNode$1(_component_v_card_title, { class: "asa-filter-dlg__title" }, {
            default: _withCtx$1(() => [
              _createVNode$1(_component_v_icon, {
                icon: "mdi-file-document-edit-outline",
                size: "20"
              }),
              _createTextVNode$1(_toDisplayString$1(t('title')), 1)
            ]),
            _: 1
          }),
          _createVNode$1(_component_v_card_text, { class: "asa-filter-dlg__body" }, {
            default: _withCtx$1(() => [
              _createElementVNode$1("p", _hoisted_1$1, _toDisplayString$1(t('hint')), 1),
              (feedback.value)
                ? (_openBlock$1(), _createBlock$1(_component_v_alert, {
                    key: 0,
                    type: feedbackType.value,
                    variant: "tonal",
                    density: "compact",
                    class: "mb-3"
                  }, {
                    default: _withCtx$1(() => [
                      _createTextVNode$1(_toDisplayString$1(feedback.value), 1)
                    ]),
                    _: 1
                  }, 8, ["type"]))
                : _createCommentVNode$1("", true),
              _createElementVNode$1("div", {
                inert: busy.value ? '' : null
              }, [
                _createVNode$1(FilterPanel, {
                  state: media,
                  fields: mediaFields.value,
                  stacked: ""
                }, null, 8, ["state", "fields"]),
                _createVNode$1(_component_v_expansion_panels, {
                  modelValue: advanced.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((advanced).value = $event)),
                  class: "mt-4",
                  variant: "accordion"
                }, {
                  default: _withCtx$1(() => [
                    _createVNode$1(_component_v_expansion_panel, {
                      title: t('settings')
                    }, {
                      default: _withCtx$1(() => [
                        _createVNode$1(_component_v_expansion_panel_text, null, {
                          default: _withCtx$1(() => [
                            _createElementVNode$1("p", _hoisted_3$1, _toDisplayString$1(t('defaults')), 1),
                            (optionsError.value)
                              ? (_openBlock$1(), _createElementBlock$1("p", _hoisted_4$1, _toDisplayString$1(t('optionsError')), 1))
                              : _createCommentVNode$1("", true),
                            _createVNode$1(FilterPanel, {
                              state: subscription,
                              fields: subscriptionFields.value,
                              stacked: ""
                            }, null, 8, ["state", "fields"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["title"])
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ], 8, _hoisted_2$1)
            ]),
            _: 1
          }),
          _createVNode$1(_component_v_card_actions, null, {
            default: _withCtx$1(() => [
              _createVNode$1(_component_v_btn, {
                disabled: busy.value,
                variant: "text",
                onClick: resetForm
              }, {
                default: _withCtx$1(() => [
                  _createTextVNode$1(_toDisplayString$1(t('reset')), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              _createVNode$1(_component_v_spacer),
              _createVNode$1(_component_v_btn, {
                disabled: busy.value,
                variant: "text",
                onClick: _cache[1] || (_cache[1] = $event => (emit('update:modelValue', false)))
              }, {
                default: _withCtx$1(() => [
                  _createTextVNode$1(_toDisplayString$1(t('cancel')), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              _createVNode$1(_component_v_btn, {
                loading: busy.value,
                color: "primary",
                variant: "flat",
                onClick: submit
              }, {
                default: _withCtx$1(() => [
                  _createTextVNode$1(_toDisplayString$1(t('submit')), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["model-value", "persistent"]))
}
}

};
const SupplementDialog = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-9845821f"]]);

const {onBeforeUnmount: onBeforeUnmount$1,onMounted: onMounted$1,ref: ref$1} = await importShared('vue');

function useMediaGrid({ gridSelector = ".asa-grid" } = {}) {
  const containerRef = ref$1(null);
  const cols = ref$1(1);
  let ro = null;
  let raf = 0;
  const timers = /* @__PURE__ */ new Set();
  function countColumns() {
    const c = containerRef.value;
    if (!c) return cols.value;
    const grid = c.querySelector(gridSelector);
    if (!grid) return cols.value;
    const tpl = getComputedStyle(grid).gridTemplateColumns || "";
    const n = tpl.split(" ").map((s) => s.trim()).filter((s) => s && s !== "0px" && s !== "none").length;
    return n || 1;
  }
  function measure() {
    cols.value = countColumns();
  }
  function scheduleMeasure() {
    if (typeof window === "undefined") return;
    if (raf) window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      measure();
    });
  }
  onMounted$1(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") {
      measure();
      return;
    }
    ro = new ResizeObserver(() => scheduleMeasure());
    if (containerRef.value) ro.observe(containerRef.value);
    scheduleMeasure();
    for (const d of [120, 360, 800]) {
      const id = window.setTimeout(() => {
        timers.delete(id);
        measure();
      }, d);
      timers.add(id);
    }
  });
  onBeforeUnmount$1(() => {
    if (ro) {
      ro.disconnect();
      ro = null;
    }
    if (raf && typeof window !== "undefined") window.cancelAnimationFrame(raf);
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  });
  return { containerRef, cols, measure };
}

const {resolveComponent:_resolveComponent,createVNode:_createVNode,createElementVNode:_createElementVNode,toDisplayString:_toDisplayString,openBlock:_openBlock,createBlock:_createBlock,createCommentVNode:_createCommentVNode,createTextVNode:_createTextVNode,withCtx:_withCtx,renderList:_renderList,Fragment:_Fragment,createElementBlock:_createElementBlock,normalizeClass:_normalizeClass,withKeys:_withKeys,normalizeStyle:_normalizeStyle} = await importShared('vue');


const _hoisted_1 = { class: "asa-pg-head" };
const _hoisted_2 = { class: "asa-pg-head__brand" };
const _hoisted_3 = { class: "asa-pg-head__logo" };
const _hoisted_4 = { class: "asa-pg-head__identity" };
const _hoisted_5 = { class: "asa-pg-head__crumbs" };
const _hoisted_6 = { class: "asa-pg-head__title" };
const _hoisted_7 = { class: "asa-pg-head__actions" };
const _hoisted_8 = {
  key: 0,
  class: "asa-pg-body"
};
const _hoisted_9 = { class: "asa-pg-controls" };
const _hoisted_10 = { class: "asa-stats" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "asa-stat__num" };
const _hoisted_13 = { class: "asa-stat__label" };
const _hoisted_14 = { class: "asa-filters" };
const _hoisted_15 = {
  key: 0,
  class: "asa-filters__badge"
};
const _hoisted_16 = {
  key: 1,
  class: "asa-batch"
};
const _hoisted_17 = { class: "asa-batch__count" };
const _hoisted_18 = {
  key: 0,
  class: "asa-grid"
};
const _hoisted_19 = {
  key: 1,
  class: "asa-empty"
};
const _hoisted_20 = { class: "asa-empty__ico" };
const _hoisted_21 = { class: "asa-empty__text" };
const _hoisted_22 = { class: "asa-empty__hint" };
const _hoisted_23 = {
  key: 2,
  class: "asa-grid"
};
const _hoisted_24 = {
  key: 0,
  class: "asa-pg-foot__nav"
};
const _hoisted_25 = {
  key: 2,
  class: "asa-pg-foot__jump"
};
const _hoisted_26 = { class: "asa-foot-dlg__field" };
const _hoisted_27 = { class: "asa-foot-dlg__label" };
const _hoisted_28 = {
  key: 0,
  class: "asa-foot-dlg__field"
};
const _hoisted_29 = { class: "asa-foot-dlg__label" };
const _hoisted_30 = { class: "asa-foot-dlg__jump" };

const {computed,getCurrentInstance,nextTick,onBeforeUnmount,onMounted,reactive,ref,watch} = await importShared('vue');

const PLUGIN = 'plugin/AutomaticSubscriptionAssistant';
const ROWS_KEY = 'asa.mobileRows';

const _sfc_main = {
  __name: 'Page',
  props: {
  api: { type: Object, default: () => ({}) },
  show_switch: { type: Boolean, default: true },
  initialView: { type: String, default: '' },
  sidebar: Boolean,
},
  emits: ['switch', 'close', 'action'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;

const THEME_COLORS = { primary: 1, secondary: 1, success: 1, info: 1, warning: 1, error: 1 };

const STATUS_META = {
  subscribed: { color: 'success', icon: 'mdi-check-circle' },
  media_exists: { color: 'info', icon: 'mdi-database-check-outline' },
  subscription_exists: { color: 'primary', icon: 'mdi-bell-check-outline' },
  blacklisted: { color: 'error', icon: 'mdi-cancel' },
  filtered: { color: 'warning', icon: 'mdi-filter-remove-outline' },
  unrecognized: { color: 'blue-grey', icon: 'mdi-help-circle-outline' },
  already_handled: { color: 'grey', icon: 'mdi-history' },
  error: { color: 'error', icon: 'mdi-alert-circle-outline' },
};
const STAT_ORDER = ['subscribed', 'media_exists', 'subscription_exists', 'blacklisted', 'filtered', 'unrecognized', 'error'];

const MSG = {
  'zh-CN': { kRules: '命中规则', artist: '艺术家', albumType: '专辑', recordingType: '单曲',
    supplement: '补充编辑', blacklist: '黑名单', blacklistAdd: '加入黑名单', 'st.blacklisted': '已忽略', plugin: '插件', appTitle: '自动订阅助手', title: '订阅历史', manageTitle: '订阅管理', config: '订阅配置',
    records: '共 {n} 条记录', refresh: '刷新', close: '关闭', searchPh: '搜索名称…',
    filterSource: '来源', filterStatus: '状态', filterType: '类型', clearFilters: '清除筛选',
    filter: '筛选', filterTitle: '筛选与搜索', filterYear: '发行年份', yearFrom: '起始年', yearTo: '结束年',
    filterAll: '全部', searchLabel: '搜索', applyFilter: '应用', resetFilter: '重置',
    'mt.music': '音乐', 'mt.movie': '电影', 'mt.tv': '剧集',
    select: '多选', exitSelect: '退出多选', selectedN: '已选 {n} 项', batchDelete: '批量删除',
    selLoaded: '选择已加载', selPage: '选本页', selAll: '选全部（{n}）', selClear: '清除选择',
    emptyFiltered: '没有符合筛选条件的记录', emptyFilteredHint: '试试调整搜索或筛选条件',
    emptyNone: '暂无订阅历史记录', emptyNoneHint: '启用来源并运行后，这里会记录每次订阅结果',
    confirmTitle: '删除确认', confirmDeleteN: '确认删除选中的 {n} 条记录？', cancel: '取消', delete: '删除',
    unknown: '未知', go: '跳转', perPage: '每页行数', pageOptions: '每页行数与跳转', jumpLabel: '跳转到第几页（共 {n} 页）',
    kType: '类型', kGroup: '剧集组', kSource: '来源', kTime: '订阅时间', kYear: '发行年份',
    historyError: '获取历史记录失败：', deleteFailed: '删除失败：', apiUnavailable: 'API 不可用',
    reRecognize: '重新识别', recognizeFailed: '重新识别失败：', more: '更多',
    'st.subscribed': '已订阅', 'st.media_exists': '媒体库已存在', 'st.subscription_exists': '订阅已存在',
    'st.filtered': '被过滤', 'st.unrecognized': '未识别', 'st.already_handled': '已处理', 'st.error': '异常',
  },
  'zh-TW': { kRules: '命中規則', artist: '藝術家', albumType: '專輯', recordingType: '單曲',
    supplement: '補充編輯', blacklist: '黑名單', blacklistAdd: '加入黑名單', 'st.blacklisted': '已忽略', plugin: '外掛', appTitle: '自動訂閱助手', title: '訂閱歷史', manageTitle: '訂閱管理', config: '訂閱設定',
    records: '共 {n} 筆記錄', refresh: '重新整理', close: '關閉', searchPh: '搜尋名稱…',
    filterSource: '來源', filterStatus: '狀態', filterType: '類型', clearFilters: '清除篩選',
    filter: '篩選', filterTitle: '篩選與搜尋', filterYear: '發行年份', yearFrom: '起始年', yearTo: '結束年',
    filterAll: '全部', searchLabel: '搜尋', applyFilter: '套用', resetFilter: '重設',
    'mt.music': '音樂', 'mt.movie': '電影', 'mt.tv': '劇集',
    select: '多選', exitSelect: '退出多選', selectedN: '已選 {n} 項', batchDelete: '批量刪除',
    selLoaded: '選擇已載入', selPage: '選本頁', selAll: '選全部（{n}）', selClear: '清除選擇',
    emptyFiltered: '沒有符合篩選條件的記錄', emptyFilteredHint: '試試調整搜尋或篩選條件',
    emptyNone: '暫無訂閱歷史記錄', emptyNoneHint: '啟用來源並執行後，這裡會記錄每次訂閱結果',
    confirmTitle: '刪除確認', confirmDeleteN: '確認刪除選中的 {n} 筆記錄？', cancel: '取消', delete: '刪除',
    unknown: '未知', go: '跳轉', perPage: '每頁筆數', pageOptions: '每頁筆數與跳轉', jumpLabel: '跳轉到第幾頁（共 {n} 頁）',
    kType: '類型', kGroup: '劇集組', kSource: '來源', kTime: '訂閱時間', kYear: '發行年份',
    historyError: '取得歷史記錄失敗：', deleteFailed: '刪除失敗：', apiUnavailable: 'API 不可用',
    reRecognize: '重新識別', recognizeFailed: '重新識別失敗：', more: '更多',
    'st.subscribed': '已訂閱', 'st.media_exists': '媒體庫已存在', 'st.subscription_exists': '訂閱已存在',
    'st.filtered': '被過濾', 'st.unrecognized': '未識別', 'st.already_handled': '已處理', 'st.error': '異常',
  },
  'en-US': { kRules: 'Matched rules', artist: 'Artist', albumType: 'Album', recordingType: 'Song',
    supplement: 'Edit and subscribe', blacklist: 'Blacklist', blacklistAdd: 'Add to blacklist', 'st.blacklisted': 'Ignored', plugin: 'Plugin', appTitle: 'Auto Subscribe', title: 'History', manageTitle: 'Manage', config: 'Settings',
    records: '{n} records', refresh: 'Refresh', close: 'Close', searchPh: 'Search name…',
    filterSource: 'Source', filterStatus: 'Status', filterType: 'Type', clearFilters: 'Clear filters',
    filter: 'Filters', filterTitle: 'Filter & search', filterYear: 'Release year', yearFrom: 'From', yearTo: 'To',
    filterAll: 'All', searchLabel: 'Search', applyFilter: 'Apply', resetFilter: 'Reset',
    'mt.music': 'Music', 'mt.movie': 'Movies', 'mt.tv': 'TV series',
    select: 'Select', exitSelect: 'Done', selectedN: '{n} selected', batchDelete: 'Delete',
    selLoaded: 'Loaded items', selPage: 'This page', selAll: 'All ({n})', selClear: 'Clear',
    emptyFiltered: 'No records match the filters', emptyFilteredHint: 'Try adjusting the search or filters',
    emptyNone: 'No subscription history yet', emptyNoneHint: 'Once sources are enabled and run, results appear here',
    confirmTitle: 'Confirm delete', confirmDeleteN: 'Delete {n} selected record(s)?', cancel: 'Cancel', delete: 'Delete',
    unknown: 'Unknown', go: 'Go', perPage: 'Rows per page', pageOptions: 'Rows & jump', jumpLabel: 'Jump to page (of {n})',
    kType: 'Type', kGroup: 'Episode group', kSource: 'Source', kTime: 'Time', kYear: 'Year',
    historyError: 'Failed to load history: ', deleteFailed: 'Delete failed: ', apiUnavailable: 'API unavailable',
    reRecognize: 'Re-identify', recognizeFailed: 'Re-identify failed: ', more: 'More',
    'st.subscribed': 'Subscribed', 'st.media_exists': 'In library', 'st.subscription_exists': 'Already subscribed',
    'st.filtered': 'Filtered', 'st.unrecognized': 'Unrecognized', 'st.already_handled': 'Handled', 'st.error': 'Error',
  },
};
const inst = getCurrentInstance();
const locale = computed(() => normLocale(inst?.appContext?.config?.globalProperties?.$i18n?.locale));
function normLocale(src) {
  const v = src && typeof src === 'object' && 'value' in src ? src.value : src;
  const s = String(v || '').toLowerCase();
  if (s.startsWith('en')) return 'en-US'
  if (s.includes('tw') || s.includes('hant') || s.includes('hk')) return 'zh-TW'
  return 'zh-CN'
}
function t(k, p) {
  let s = (MSG[locale.value] || MSG['zh-CN'])[k] ?? MSG['zh-CN'][k] ?? k;
  if (p) for (const key in p) s = s.replaceAll(`{${key}}`, p[key]);
  return s
}
function statusMeta(status) { return STATUS_META[status] || { color: 'grey', icon: 'mdi-help-circle-outline' } }
function statusLabel(status) { return STATUS_META[status] ? t('st.' + status) : (status || t('unknown')) }

const blacklistRef = ref(null);
const subscribeRef = ref(null);
const blacklistOpen = ref(false);
const supplementOpen = ref(false);
const supplementTarget = ref({});
function openSupplement(item) { supplementTarget.value = item; supplementOpen.value = true; }
async function refreshSupplement() { await Promise.all([fetchStatus(), fetchHistory(true)]); }
const blacklistTarget = ref({});
function openBlacklist(item) { blacklistTarget.value = { ...item, kind: 'history' }; blacklistOpen.value = true; }
const view = ref(['history', 'manage', 'blacklist'].includes(props.initialView) ? props.initialView : 'history');
const loading = ref(true);
const error = ref('');
const items = ref([]);
const total = ref(0);
const page = ref(1);
const blacklistPage = ref(1);
const blacklistCount = ref(1);
const managePage = ref(1);
const manageCount = ref(1);
const jumpTo = ref(1);
const footDialog = ref(false);  // 移动端页脚「每页行数 + 跳转」弹窗
const statusCounts = ref({});
const providerNames = reactive({});
const providerList = ref([]);
// 统一筛选模型（历史）：关键词 / 发行年份范围 / 类型(多) / 状态(多) / 来源(多)。
// 「留空即不过滤（全部）」：keyword='' / year=null / 多选=[]。桌面内联、移动弹窗共用此对象；
// 弹窗编辑 draft 副本，点「应用」后整体拷回 filters，避免弹窗内每次输入都触发服务端重取。
const EMPTY_FILTERS = () => ({ keyword: '', yearMin: null, yearMax: null, mtypes: [], statuses: [], providers: [] });
function cloneFilters(s) {
  return { keyword: s.keyword, yearMin: s.yearMin, yearMax: s.yearMax,
    mtypes: [...s.mtypes], statuses: [...s.statuses], providers: [...s.providers] }
}
const filters = reactive(EMPTY_FILTERS());
const draft = reactive(EMPTY_FILTERS());
const filterDialog = ref(false);
const selectMode = ref(false);
const selected = reactive(new Set());
const selectingAll = ref(false);
const recognizing = reactive(new Set());  // 正在「重新识别」的记录 unique 集合（按钮 loading）
const confirm = reactive({ open: false, ids: [] });
const deletingBatch = ref(false);

const ROW_OPTIONS = [10, 25, 50, 100];
function readRows() {
  try { const n = parseInt(localStorage.getItem(ROWS_KEY), 10); return ROW_OPTIONS.includes(n) ? n : 10 } catch { return 10 }
}
const mobileRows = ref(readRows());

const pageRef = ref(null);
const historyListRef = ref(null);
const viewportWidth = ref(typeof window === 'undefined' ? 0 : window.innerWidth);
const sidebarHeight = ref('calc(100dvh - 80px)');
const sidebarDesktop = computed(() => props.sidebar && viewportWidth.value >= 960);
function updateSidebarLayout() {
  if (typeof window === 'undefined') return
  viewportWidth.value = window.innerWidth;
  if (pageRef.value) sidebarHeight.value = `${Math.max(240, window.innerHeight - pageRef.value.getBoundingClientRect().top - 8)}px`;
}

const { containerRef, cols, measure } = useMediaGrid();
// 单列（移动端）按用户所选行数分页；多列（桌面）锁 3 行、列数自适应。
const isSingleCol = computed(() => cols.value <= 1);
const pageSize = computed(() => sidebarDesktop.value ? 24 : (isSingleCol.value ? mobileRows.value : Math.max(cols.value * 3, 1)));
const loadingMore = ref(false);
const historyRefreshing = ref(false);
const historyMoreError = ref('');
const historyLoadedPage = ref(0);
const historyExhausted = ref(false);
const historyHasMore = computed(() => !historyExhausted.value && items.value.length < total.value);

const showSwitch = computed(() => !props.sidebar && props.show_switch);
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)));
const activePageCount = computed(() => (view.value === 'history' ? pageCount.value : view.value === 'blacklist' ? blacklistCount.value : manageCount.value));
// 移动端不锁死 total-visible → v-pagination 依据自身容器宽度自动截断（永远含首尾页）；桌面维持 5。
// 固定可见页码数（不依赖 ResizeObserver 自动截断，避免真机测量不准导致页码数字消失）；
// 每页行数/跳转已移入弹窗，页脚仅页码 + 设置按钮，空间充裕，固定 5 个不会溢出。
const paginationVisible = computed(() => 5);
const paginationSize = computed(() => (isSingleCol.value ? 'x-small' : 'small'));
const activeFilterCount = computed(() =>
  (filters.keyword ? 1 : 0) +
  (filters.yearMin != null || filters.yearMax != null ? 1 : 0) +
  (filters.mtypes.length ? 1 : 0) + (filters.statuses.length ? 1 : 0) + (filters.providers.length ? 1 : 0));
const hasFilter = computed(() => activeFilterCount.value > 0);
const tabDefs = computed(() => {
  const base = [
    { key: 'history', label: t('title'), icon: 'mdi-history' },
    { key: 'manage', label: t('manageTitle'), icon: 'mdi-bell-cog-outline' },
    { key: 'blacklist', label: t('blacklist'), icon: 'mdi-cancel' },
  ];
  if (showSwitch.value) base.push({ key: 'config', label: t('config'), icon: 'mdi-cog-outline' });
  return base
});
const statCards = computed(() =>
  STAT_ORDER.map(key => ({ key, label: t('st.' + key), color: STATUS_META[key].color, count: statusCounts.value[key] || 0 })));
const providerOptions = computed(() =>
  providerList.value.map(p => ({ title: p.provider_name || p.provider_id, value: p.provider_id })));
const statusSelectItems = computed(() => STAT_ORDER.map(key => ({ title: t('st.' + key), value: key })));
const typeSelectItems = computed(() => [
  { title: t('mt.movie'), value: '电影' },
  { title: t('mt.tv'), value: '电视剧' },
  { title: t('mt.music'), value: '音乐' },
]);
// FilterPanel 字段配置（历史）：类型多选、状态多选、来源多选 + 发行年份范围 + 搜索。
const historyFilterFields = computed(() => [
  { type: 'search', key: 'keyword', label: t('searchLabel'), placeholder: t('searchPh') },
  { type: 'year-range', keyMin: 'yearMin', keyMax: 'yearMax', label: t('filterYear'), minText: t('yearFrom'), maxText: t('yearTo') },
  { type: 'select', key: 'mtypes', multi: true, items: typeSelectItems.value, label: t('filterType'), icon: 'mdi-shape-outline', allText: t('filterAll') },
  { type: 'select', key: 'statuses', multi: true, items: statusSelectItems.value, label: t('filterStatus'), icon: 'mdi-flag-outline', allText: t('filterAll') },
  { type: 'select', key: 'providers', multi: true, items: providerOptions.value, label: t('filterSource'), icon: 'mdi-filter-variant', allText: t('filterAll') },
]);

function providerName(pid) { return providerNames[pid] || pid || t('unknown') }
function cssColor(name) {
  if (THEME_COLORS[name]) return `rgb(var(--v-theme-${name}))`
  if (name === 'blue-grey') return 'rgba(var(--v-theme-on-surface), 0.55)'
  return 'rgba(var(--v-theme-on-surface), 0.4)'
}
function statusBadge(item) {
  const m = statusMeta(item.status);
  return { label: statusLabel(item.status), color: cssColor(m.color), icon: m.icon }
}
function mediaName(item) {
  const parts = [item.title || t('unknown')];
  if (item.type === '电视剧' && item.season != null) parts.push(`S${String(item.season).padStart(2, '0')}`);
  if (item.episode_group) parts.push(`${t('kGroup')}: ${item.episode_group}`);
  return parts.join(' · ')
}
function cardLines(item) {
  const matches = [...new Set((item.source_item?.source_meta?.matches || []).map(m => m.name).filter(Boolean))];
  return [
    { icon: 'mdi-shape-outline', label: t('kType'), value: item.type === '音乐' ? `${item.type} · ${item.music_type === 'album' ? t('albumType') : t('recordingType')}` : item.type || t('unknown') },
    ...(item.type === '音乐' && item.artists?.length ? [{ icon: 'mdi-account-music', label: t('artist'), value: item.artists.join(' / ') }] : []),
    { icon: 'mdi-rss', label: t('kSource'), value: providerName(item.provider) },
    ...(matches.length ? [{ icon: 'mdi-filter-check-outline', label: t('kRules'), value: matches.join(' / ') }] : []),
    { icon: 'mdi-clock-outline', label: t('kTime'), value: item.time || t('unknown') },
    { icon: 'mdi-calendar', label: t('kYear'), value: item.year || t('unknown') },
  ]
}

function qs(params) {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')
}
function normalizeList(res) {
  if (Array.isArray(res)) return res
  if (res && Array.isArray(res.list)) return res.list
  if (res && Array.isArray(res.items)) return res.items
  if (res && Array.isArray(res.data)) return res.data
  return []
}

// 历史筛选 → 查询参数：多选以逗号连接（后端按逗号切分，向后兼容单值）；空数组/空值经 qs 过滤丢弃。
function historyQuery() {
  return {
    keyword: filters.keyword,
    provider: filters.providers.join(','),
    status: filters.statuses.join(','),
    mtype: filters.mtypes.join(','),
    year_min: filters.yearMin,
    year_max: filters.yearMax,
  }
}

let fetchSeq = 0;
async function fetchHistory(silent = false, append = false) {
  if (append && (!sidebarDesktop.value || loading.value || historyRefreshing.value || loadingMore.value || !historyHasMore.value)) return
  // 请求时序守卫：列数测量稳定/翻页会触发多次取数（不同 count/page），
  // 仅采纳最新一次的响应，丢弃过期响应（否则小 count 的旧响应可能覆盖大 count → 只剩 2 行）。
  const seq = ++fetchSeq;
  const progressive = sidebarDesktop.value;
  const requestPage = progressive ? (append ? historyLoadedPage.value + 1 : 1) : page.value;
  if (append) loadingMore.value = true;
  else {
    historyRefreshing.value = true;
    loadingMore.value = false;
    if (!silent) loading.value = true;
    error.value = '';
  }
  historyMoreError.value = '';
  try {
    if (!props.api || typeof props.api.get !== 'function') throw new Error(t('apiUnavailable'))
    const query = qs({ ...historyQuery(), page: requestPage, count: pageSize.value });
    const res = await props.api.get(`${PLUGIN}/history?${query}`);
    if (seq !== fetchSeq) return
    if (res?.code != null && res.code !== 0) throw new Error(res.message || t('unknown'))
    const records = normalizeList(res);
    const previousCount = items.value.length;
    items.value = append
      ? [...new Map([...items.value, ...records].map(item => [item.unique, item])).values()]
      : records;
    total.value = Number(res?.total) || items.value.length;
    historyLoadedPage.value = requestPage;
    historyExhausted.value = !records.length || (append && items.value.length === previousCount);
    if (progressive && !append) historyListRef.value?.scrollToTop();
    if (!progressive && page.value > pageCount.value) {
      // 越界页（例如把最后一页删空了）服务端返回空数组。只把页码改回去不够：
      // 列表仍是那份空结果，界面会显示成「有 N 页却一条都没有」。必须按纠正后的
      // 页码重新取一次。
      page.value = pageCount.value;
      return fetchHistory(silent)
    }
  } catch (e) {
    if (seq !== fetchSeq) return
    if (append) historyMoreError.value = t('historyError') + (e?.message || e);
    else {
      error.value = t('historyError') + (e?.message || e);
      items.value = [];
      total.value = 0;
    }
  } finally {
    if (seq === fetchSeq) { loading.value = false; loadingMore.value = false; historyRefreshing.value = false; emit('action'); }
  }
}
function loadMoreHistory() { return fetchHistory(true, true) }

async function fetchStatus() {
  try {
    if (!props.api || typeof props.api.get !== 'function') return
    const res = await props.api.get(`${PLUGIN}/status?lang=${encodeURIComponent(locale.value)}`);
    statusCounts.value = res?.stats?.by_status || {};
    const list = Array.isArray(res?.providers) ? res.providers : [];
    providerList.value = list;
    list.forEach(p => { providerNames[p.provider_id] = p.provider_name || p.provider_id; });
  } catch {
    statusCounts.value = {};
  }
}

function onTab(key) {
  if (key === 'config') {
    if (!showSwitch.value) return
    emit('switch');
    return
  }
  view.value = key;
}
function reloadCurrent() {
  fetchStatus();
  if (view.value === 'history') fetchHistory();
  else if (view.value === 'blacklist') blacklistRef.value?.reload();
  else subscribeRef.value?.reload();
}
function applyFilters() { page.value = 1; fetchHistory(); }
// 统计卡片点击：切换该状态在多选集合中的存在。
function toggleStatus(key) {
  const i = filters.statuses.indexOf(key);
  if (i >= 0) filters.statuses.splice(i, 1);
  else filters.statuses.push(key);
  applyFilters();
}
function clearFilters() { Object.assign(filters, EMPTY_FILTERS()); applyFilters(); }
// 移动端筛选弹窗：打开拷入 draft，「应用」拷回并重取，「重置」清空 draft。
function openFilterDialog() { Object.assign(draft, cloneFilters(filters)); filterDialog.value = true; }
function applyFilterDialog() { Object.assign(filters, cloneFilters(draft)); filterDialog.value = false; applyFilters(); }
function resetDraft() { Object.assign(draft, EMPTY_FILTERS()); }
function onPageChange() {
  fetchHistory(true);  // 静默翻页：不切换到骨架屏，避免容器闪烁/高度变形
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
}
function doJump() {
  const n = Math.min(Math.max(parseInt(jumpTo.value, 10) || 1, 1), activePageCount.value);
  if (view.value === 'history') {
    if (n !== page.value) { page.value = n; onPageChange(); }
  } else if (view.value === 'blacklist') {
    blacklistPage.value = n;
  } else {
    managePage.value = n;
  }
}
function doJumpClose() { doJump(); footDialog.value = false; }

function toggleSelectMode() {
  selectMode.value = !selectMode.value;
  if (!selectMode.value) {
    selectionSeq++;
    selectingAll.value = false;
    selected.clear();
  }
}
function toggleOne(u) { selected.has(u) ? selected.delete(u) : selected.add(u); }
function selectCurrentPage() { items.value.forEach(it => it.unique && selected.add(it.unique)); }
let selectionSeq = 0;
async function selectAll() {
  // 选全部：只取当前筛选下的身份键，不拉整行记录。
  // 与列表共用 fetchSeq：请求途中用户改了筛选条件就作废本次结果，
  // 否则会把已经看不见的记录悄悄勾上，接着的批量删除就删错了对象。
  const seq = fetchSeq;
  const selection = ++selectionSeq;
  selectingAll.value = true;
  try {
    if (!props.api || typeof props.api.get !== 'function') throw new Error(t('apiUnavailable'))
    const res = await props.api.get(`${PLUGIN}/history/uniques?${qs(historyQuery())}`);
    if (seq !== fetchSeq || selection !== selectionSeq) return
    const uniques = Array.isArray(res?.uniques) ? res.uniques : [];
    uniques.forEach(u => u && selected.add(u));
  } catch (e) {
    if (seq !== fetchSeq || selection !== selectionSeq) return
    error.value = t('historyError') + (e?.message || e);
  } finally {
    if (selection === selectionSeq) selectingAll.value = false;
  }
}
function askDelete(ids) { if (ids && ids.length) { confirm.ids = [...ids]; confirm.open = true; } }

async function runDelete() {
  deletingBatch.value = true;
  error.value = '';
  try {
    if (!props.api || typeof props.api.post !== 'function') throw new Error(t('apiUnavailable'))
    const res = await props.api.post(`${PLUGIN}/history/batch-delete`, { uniques: confirm.ids });
    if (res?.code !== 0) throw new Error(res?.message || t('deleteFailed'))
    confirm.ids.forEach(u => selected.delete(u));
    confirm.open = false;
    await fetchStatus();
    await fetchHistory(true);
  } catch (e) {
    error.value = t('deleteFailed') + (e?.message || e);
  } finally {
    deletingBatch.value = false;
  }
}

function onRowsChange() {
  try { localStorage.setItem(ROWS_KEY, String(mobileRows.value)); } catch { /* ignore */ }
  page.value = 1; managePage.value = 1; blacklistPage.value = 1;
}

// 重新识别一条异常记录：部分媒体（未上映/季度预告）识别时 tmdb/bangumi 尚无记录而异常，
// 允许用户稍后手动再跑一次识别 + 订阅。成功后刷新统计与列表（该条状态随之更新/移出异常）。
async function reRecognize(item) {
  if (!item || !item.unique || recognizing.has(item.unique)) return
  recognizing.add(item.unique);
  error.value = '';
  try {
    if (!props.api || typeof props.api.post !== 'function') throw new Error(t('apiUnavailable'))
    const res = await props.api.post(`${PLUGIN}/history/recognize`, { unique: item.unique });
    if (res && res.code === 0) {
      await fetchStatus();
      await fetchHistory(true);
    } else {
      error.value = t('recognizeFailed') + ((res && res.message) || '');
    }
  } catch (e) {
    error.value = t('recognizeFailed') + (e?.message || e);
  } finally {
    recognizing.delete(item.unique);
  }
}

// 每页条数变化（列数变化或移动端改行数）→ 历史静默重取；订阅管理由 pageSize prop 响应式重切。
watch([pageSize, sidebarDesktop], () => { if (view.value === 'history') fetchHistory(true); });
// 订阅管理页数变化时收敛当前页；切换视图后清空选择并重新测量网格列数。
watch(blacklistCount, c => { if (blacklistPage.value > c) blacklistPage.value = c; });
watch(manageCount, c => { if (managePage.value > c) managePage.value = c; });
watch(view, () => {
  fetchSeq++;
  loading.value = false;
  loadingMore.value = false;
  historyRefreshing.value = false;
  selectionSeq++;
  selectingAll.value = false;
  selectMode.value = false;
  selected.clear();
  if (view.value === 'history') fetchHistory();
  nextTick(() => measure());
});

onMounted(() => {
  updateSidebarLayout();
  if (typeof window !== 'undefined') window.addEventListener('resize', updateSidebarLayout, { passive: true });
  fetchStatus();
  if (view.value === 'history') fetchHistory();
});
onBeforeUnmount(() => {
  fetchSeq++;
  selectionSeq++;
  if (typeof window !== 'undefined') window.removeEventListener('resize', updateSidebarLayout);
});

return (_ctx, _cache) => {
  const _component_v_icon = _resolveComponent("v-icon");
  const _component_v_btn = _resolveComponent("v-btn");
  const _component_v_alert = _resolveComponent("v-alert");
  const _component_v_spacer = _resolveComponent("v-spacer");
  const _component_v_list_item = _resolveComponent("v-list-item");
  const _component_v_pagination = _resolveComponent("v-pagination");
  const _component_v_text_field = _resolveComponent("v-text-field");
  const _component_v_card_title = _resolveComponent("v-card-title");
  const _component_v_select = _resolveComponent("v-select");
  const _component_v_card_text = _resolveComponent("v-card-text");
  const _component_v_card_actions = _resolveComponent("v-card-actions");
  const _component_v_card = _resolveComponent("v-card");
  const _component_v_dialog = _resolveComponent("v-dialog");

  return (_openBlock(), _createElementBlock("section", {
    ref_key: "pageRef",
    ref: pageRef,
    class: _normalizeClass(["asa-page", { 'asa-page--progressive': sidebarDesktop.value }]),
    style: _normalizeStyle(sidebarDesktop.value ? { blockSize: sidebarHeight.value } : undefined)
  }, [
    _createElementVNode("header", _hoisted_1, [
      _createElementVNode("div", _hoisted_2, [
        _createElementVNode("div", _hoisted_3, [
          _createVNode(_component_v_icon, {
            icon: "mdi-rss",
            size: "20"
          })
        ]),
        _createElementVNode("div", _hoisted_4, [
          _createElementVNode("div", _hoisted_5, [
            _cache[22] || (_cache[22] = _createElementVNode("span", null, "MoviePilot", -1)),
            _createVNode(_component_v_icon, {
              icon: "mdi-chevron-right",
              size: "13"
            }),
            _createElementVNode("span", null, _toDisplayString(t('plugin')), 1)
          ]),
          _createElementVNode("h1", _hoisted_6, _toDisplayString(t('appTitle')), 1)
        ])
      ]),
      _createElementVNode("div", _hoisted_7, [
        _createVNode(_component_v_btn, {
          loading: loading.value,
          "aria-label": t('refresh'),
          icon: "mdi-refresh",
          size: "small",
          variant: "text",
          onClick: reloadCurrent
        }, null, 8, ["loading", "aria-label"]),
        (!__props.sidebar)
          ? (_openBlock(), _createBlock(_component_v_btn, {
              key: 0,
              "aria-label": t('close'),
              icon: "mdi-close",
              size: "small",
              variant: "text",
              onClick: _cache[0] || (_cache[0] = $event => (emit('close')))
            }, null, 8, ["aria-label"]))
          : _createCommentVNode("", true)
      ])
    ]),
    _createVNode(PluginTabs, {
      active: view.value,
      tabs: tabDefs.value,
      onSelect: onTab
    }, null, 8, ["active", "tabs"]),
    _createElementVNode("div", {
      class: "asa-pg-scroll",
      ref_key: "containerRef",
      ref: containerRef
    }, [
      (view.value === 'history')
        ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
            _createElementVNode("div", _hoisted_9, [
              (error.value)
                ? (_openBlock(), _createBlock(_component_v_alert, {
                    key: 0,
                    class: "mb-3",
                    density: "compact",
                    type: "warning",
                    variant: "tonal"
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(_toDisplayString(error.value), 1)
                    ]),
                    _: 1
                  }))
                : _createCommentVNode("", true),
              _createElementVNode("div", _hoisted_10, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(statCards.value, (s) => {
                  return (_openBlock(), _createElementBlock("button", {
                    key: s.key,
                    type: "button",
                    class: _normalizeClass(['asa-stat', `asa-stat--${s.color}`, { 'asa-stat--active': filters.statuses.includes(s.key) }]),
                    onClick: $event => (toggleStatus(s.key))
                  }, [
                    _createElementVNode("span", _hoisted_12, _toDisplayString(s.count), 1),
                    _createElementVNode("span", _hoisted_13, _toDisplayString(s.label), 1)
                  ], 10, _hoisted_11))
                }), 128))
              ]),
              _createElementVNode("div", _hoisted_14, [
                _createVNode(_component_v_btn, {
                  class: "asa-filters__trigger",
                  color: hasFilter.value ? 'primary' : undefined,
                  "prepend-icon": "mdi-filter-variant",
                  size: "small",
                  variant: hasFilter.value ? 'tonal' : 'outlined',
                  onClick: openFilterDialog
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('filter')) + " ", 1),
                    (activeFilterCount.value)
                      ? (_openBlock(), _createElementBlock("span", _hoisted_15, _toDisplayString(activeFilterCount.value), 1))
                      : _createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["color", "variant"]),
                _createVNode(_component_v_spacer),
                (hasFilter.value)
                  ? (_openBlock(), _createBlock(_component_v_btn, {
                      key: 0,
                      class: "asa-filters__clear",
                      size: "small",
                      variant: "text",
                      onClick: clearFilters
                    }, {
                      default: _withCtx(() => [
                        _createVNode(_component_v_icon, {
                          icon: "mdi-filter-off-outline",
                          start: ""
                        }),
                        _createTextVNode(_toDisplayString(t('clearFilters')), 1)
                      ]),
                      _: 1
                    }))
                  : _createCommentVNode("", true),
                _createVNode(_component_v_btn, {
                  color: selectMode.value ? 'primary' : undefined,
                  variant: selectMode.value ? 'flat' : 'tonal',
                  size: "small",
                  "prepend-icon": "mdi-checkbox-multiple-marked-outline",
                  onClick: toggleSelectMode
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(selectMode.value ? t('exitSelect') : t('select')), 1)
                  ]),
                  _: 1
                }, 8, ["color", "variant"])
              ]),
              (selectMode.value)
                ? (_openBlock(), _createElementBlock("div", _hoisted_16, [
                    _createElementVNode("span", _hoisted_17, _toDisplayString(t('selectedN', { n: selected.size })), 1),
                    _createVNode(_component_v_btn, {
                      size: "small",
                      variant: "text",
                      "prepend-icon": "mdi-checkbox-marked-outline",
                      onClick: selectCurrentPage
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(t(sidebarDesktop.value ? 'selLoaded' : 'selPage')), 1)
                      ]),
                      _: 1
                    }),
                    _createVNode(_component_v_btn, {
                      size: "small",
                      variant: "text",
                      "prepend-icon": "mdi-select-all",
                      loading: selectingAll.value,
                      onClick: selectAll
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(t('selAll', { n: total.value })), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    (selected.size)
                      ? (_openBlock(), _createBlock(_component_v_btn, {
                          key: 0,
                          size: "small",
                          variant: "text",
                          onClick: _cache[1] || (_cache[1] = $event => (selected.clear()))
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(t('selClear')), 1)
                          ]),
                          _: 1
                        }))
                      : _createCommentVNode("", true),
                    _createVNode(_component_v_spacer),
                    _createVNode(_component_v_btn, {
                      disabled: !selected.size,
                      color: "error",
                      size: "small",
                      variant: "tonal",
                      "prepend-icon": "mdi-trash-can-outline",
                      onClick: _cache[2] || (_cache[2] = $event => (askDelete([...selected])))
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(t('batchDelete')), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ]))
                : _createCommentVNode("", true)
            ]),
            _createVNode(ProgressiveList, {
              ref_key: "historyListRef",
              ref: historyListRef,
              progressive: sidebarDesktop.value,
              count: items.value.length,
              loading: loading.value || historyRefreshing.value || loadingMore.value,
              "has-more": historyHasMore.value,
              error: historyMoreError.value,
              onLoad: loadMoreHistory
            }, {
              default: _withCtx(() => [
                (loading.value)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_18, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(pageSize.value, (n) => {
                        return (_openBlock(), _createElementBlock("div", {
                          key: n,
                          class: "asa-skel-card"
                        }))
                      }), 128))
                    ]))
                  : (!items.value.length)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_19, [
                        _createElementVNode("div", _hoisted_20, [
                          _createVNode(_component_v_icon, {
                            icon: hasFilter.value ? 'mdi-filter-off-outline' : 'mdi-playlist-star',
                            size: "30"
                          }, null, 8, ["icon"])
                        ]),
                        _createElementVNode("p", _hoisted_21, _toDisplayString(hasFilter.value ? t('emptyFiltered') : t('emptyNone')), 1),
                        _createElementVNode("p", _hoisted_22, _toDisplayString(hasFilter.value ? t('emptyFilteredHint') : t('emptyNoneHint')), 1),
                        (hasFilter.value)
                          ? (_openBlock(), _createBlock(_component_v_btn, {
                              key: 0,
                              size: "small",
                              variant: "tonal",
                              onClick: clearFilters
                            }, {
                              default: _withCtx(() => [
                                _createTextVNode(_toDisplayString(t('clearFilters')), 1)
                              ]),
                              _: 1
                            }))
                          : _createCommentVNode("", true)
                      ]))
                    : (_openBlock(), _createElementBlock("div", _hoisted_23, [
                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (item) => {
                          return (_openBlock(), _createBlock(MediaCard, {
                            key: item.unique,
                            poster: item.poster || '',
                            name: mediaName(item),
                            lines: cardLines(item),
                            status: statusBadge(item),
                            selectable: selectMode.value,
                            selected: selected.has(item.unique),
                            "more-label": t('more'),
                            onToggle: $event => (toggleOne(item.unique))
                          }, {
                            actions: _withCtx(() => [
                              _createVNode(_component_v_list_item, {
                                "prepend-icon": "mdi-file-document-edit-outline",
                                title: t('supplement'),
                                onClick: $event => (openSupplement(item))
                              }, null, 8, ["title", "onClick"]),
                              _createVNode(_component_v_list_item, {
                                "prepend-icon": "mdi-cancel",
                                title: t('blacklistAdd'),
                                onClick: $event => (openBlacklist(item))
                              }, null, 8, ["title", "onClick"]),
                              (['error', 'unrecognized'].includes(item.status))
                                ? (_openBlock(), _createBlock(_component_v_list_item, {
                                    key: 0,
                                    "prepend-icon": "mdi-refresh",
                                    title: t('reRecognize'),
                                    disabled: recognizing.has(item.unique),
                                    onClick: $event => (reRecognize(item))
                                  }, null, 8, ["title", "disabled", "onClick"]))
                                : _createCommentVNode("", true),
                              _createVNode(_component_v_list_item, {
                                "base-color": "error",
                                "prepend-icon": "mdi-trash-can-outline",
                                title: t('delete'),
                                onClick: $event => (askDelete([item.unique]))
                              }, null, 8, ["title", "onClick"])
                            ]),
                            _: 2
                          }, 1032, ["poster", "name", "lines", "status", "selectable", "selected", "more-label", "onToggle"]))
                        }), 128))
                      ]))
              ]),
              _: 1
            }, 8, ["progressive", "count", "loading", "has-more", "error"])
          ]))
        : (view.value === 'blacklist')
          ? (_openBlock(), _createBlock(BlacklistView, {
              key: 1,
              ref_key: "blacklistRef",
              ref: blacklistRef,
              class: "asa-pg-body",
              api: __props.api,
              progressive: sidebarDesktop.value,
              "page-size": pageSize.value,
              page: blacklistPage.value,
              "onUpdate:page": _cache[3] || (_cache[3] = $event => ((blacklistPage).value = $event)),
              "onUpdate:pageCount": _cache[4] || (_cache[4] = v => blacklistCount.value = v)
            }, null, 8, ["api", "progressive", "page-size", "page"]))
          : (_openBlock(), _createBlock(SubscribeView, {
              key: 2,
              ref_key: "subscribeRef",
              ref: subscribeRef,
              class: "asa-pg-body",
              api: __props.api,
              progressive: sidebarDesktop.value,
              "page-size": pageSize.value,
              page: managePage.value,
              "onUpdate:page": _cache[5] || (_cache[5] = $event => ((managePage).value = $event)),
              "onUpdate:pageCount": _cache[6] || (_cache[6] = v => manageCount.value = v),
              onChanged: fetchStatus
            }, null, 8, ["api", "progressive", "page-size", "page"]))
    ], 512),
    (!sidebarDesktop.value && (activePageCount.value > 1 || isSingleCol.value))
      ? (_openBlock(), _createElementBlock("footer", {
          key: 0,
          class: _normalizeClass(["asa-pg-foot", { 'asa-pg-foot--mobile': isSingleCol.value }])
        }, [
          (activePageCount.value > 1)
            ? (_openBlock(), _createElementBlock("div", _hoisted_24, [
                (view.value === 'history')
                  ? (_openBlock(), _createBlock(_component_v_pagination, {
                      key: 0,
                      modelValue: page.value,
                      "onUpdate:modelValue": [
                        _cache[7] || (_cache[7] = $event => ((page).value = $event)),
                        onPageChange
                      ],
                      "active-color": "primary",
                      density: "comfortable",
                      length: pageCount.value,
                      "total-visible": paginationVisible.value,
                      size: paginationSize.value
                    }, null, 8, ["modelValue", "length", "total-visible", "size"]))
                  : (view.value === 'manage')
                    ? (_openBlock(), _createBlock(_component_v_pagination, {
                        key: 1,
                        modelValue: managePage.value,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((managePage).value = $event)),
                        "active-color": "primary",
                        density: "comfortable",
                        length: manageCount.value,
                        "total-visible": paginationVisible.value,
                        size: paginationSize.value
                      }, null, 8, ["modelValue", "length", "total-visible", "size"]))
                    : (_openBlock(), _createBlock(_component_v_pagination, {
                        key: 2,
                        modelValue: blacklistPage.value,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((blacklistPage).value = $event)),
                        "active-color": "primary",
                        density: "comfortable",
                        length: blacklistCount.value,
                        "total-visible": paginationVisible.value,
                        size: paginationSize.value
                      }, null, 8, ["modelValue", "length", "total-visible", "size"]))
              ]))
            : _createCommentVNode("", true),
          (isSingleCol.value)
            ? (_openBlock(), _createBlock(_component_v_btn, {
                key: 1,
                class: "asa-pg-foot__more",
                "aria-label": t('pageOptions'),
                icon: "mdi-tune-variant",
                size: "small",
                variant: "tonal",
                onClick: _cache[10] || (_cache[10] = $event => (footDialog.value = true))
              }, null, 8, ["aria-label"]))
            : _createCommentVNode("", true),
          (!isSingleCol.value && activePageCount.value > 10)
            ? (_openBlock(), _createElementBlock("div", _hoisted_25, [
                _createVNode(_component_v_text_field, {
                  modelValue: jumpTo.value,
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((jumpTo).value = $event)),
                  modelModifiers: { number: true },
                  density: "compact",
                  "hide-details": "",
                  type: "number",
                  min: 1,
                  max: activePageCount.value,
                  variant: "outlined",
                  class: "asa-pg-foot__jf",
                  onKeyup: _withKeys(doJump, ["enter"])
                }, null, 8, ["modelValue", "max"]),
                _createVNode(_component_v_btn, {
                  size: "small",
                  variant: "tonal",
                  onClick: doJump
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('go')), 1)
                  ]),
                  _: 1
                })
              ]))
            : _createCommentVNode("", true),
          (!isSingleCol.value)
            ? (_openBlock(), _createBlock(_component_v_spacer, { key: 3 }))
            : _createCommentVNode("", true)
        ], 2))
      : _createCommentVNode("", true),
    _createVNode(_component_v_dialog, {
      modelValue: footDialog.value,
      "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((footDialog).value = $event)),
      "max-width": "340"
    }, {
      default: _withCtx(() => [
        _createVNode(_component_v_card, { class: "asa-foot-dlg" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_card_title, { class: "asa-foot-dlg__title" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_icon, {
                  icon: "mdi-tune-variant",
                  size: "20"
                }),
                _createTextVNode(_toDisplayString(t('pageOptions')), 1)
              ]),
              _: 1
            }),
            _createVNode(_component_v_card_text, { class: "asa-foot-dlg__body" }, {
              default: _withCtx(() => [
                _createElementVNode("div", _hoisted_26, [
                  _createElementVNode("label", _hoisted_27, _toDisplayString(t('perPage')), 1),
                  _createVNode(_component_v_select, {
                    modelValue: mobileRows.value,
                    "onUpdate:modelValue": [
                      _cache[12] || (_cache[12] = $event => ((mobileRows).value = $event)),
                      onRowsChange
                    ],
                    items: ROW_OPTIONS,
                    density: "compact",
                    "hide-details": "",
                    variant: "outlined"
                  }, null, 8, ["modelValue"])
                ]),
                (activePageCount.value > 10)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_28, [
                      _createElementVNode("label", _hoisted_29, _toDisplayString(t('jumpLabel', { n: activePageCount.value })), 1),
                      _createElementVNode("div", _hoisted_30, [
                        _createVNode(_component_v_text_field, {
                          modelValue: jumpTo.value,
                          "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((jumpTo).value = $event)),
                          modelModifiers: { number: true },
                          class: "asa-foot-dlg__jf",
                          density: "compact",
                          "hide-details": "",
                          type: "number",
                          min: 1,
                          max: activePageCount.value,
                          variant: "outlined",
                          onKeyup: _withKeys(doJumpClose, ["enter"])
                        }, null, 8, ["modelValue", "max"]),
                        _createVNode(_component_v_btn, {
                          color: "primary",
                          variant: "flat",
                          onClick: doJumpClose
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(t('go')), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]))
                  : _createCommentVNode("", true)
              ]),
              _: 1
            }),
            _createVNode(_component_v_card_actions, null, {
              default: _withCtx(() => [
                _createVNode(_component_v_spacer),
                _createVNode(_component_v_btn, {
                  variant: "text",
                  onClick: _cache[14] || (_cache[14] = $event => (footDialog.value = false))
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('close')), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    _createVNode(BlacklistDialog, {
      modelValue: blacklistOpen.value,
      "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((blacklistOpen).value = $event)),
      api: __props.api,
      target: blacklistTarget.value,
      onSaved: fetchStatus
    }, null, 8, ["modelValue", "api", "target"]),
    _createVNode(SupplementDialog, {
      modelValue: supplementOpen.value,
      "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((supplementOpen).value = $event)),
      api: __props.api,
      target: supplementTarget.value,
      onChanged: refreshSupplement
    }, null, 8, ["modelValue", "api", "target"]),
    _createVNode(_component_v_dialog, {
      modelValue: confirm.open,
      "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((confirm.open) = $event)),
      "max-width": "380"
    }, {
      default: _withCtx(() => [
        _createVNode(_component_v_card, null, {
          default: _withCtx(() => [
            _createVNode(_component_v_card_title, { class: "text-subtitle-1" }, {
              default: _withCtx(() => [
                _createTextVNode(_toDisplayString(t('confirmTitle')), 1)
              ]),
              _: 1
            }),
            _createVNode(_component_v_card_text, { class: "text-body-2" }, {
              default: _withCtx(() => [
                _createTextVNode(_toDisplayString(t('confirmDeleteN', { n: confirm.ids.length })), 1)
              ]),
              _: 1
            }),
            _createVNode(_component_v_card_actions, null, {
              default: _withCtx(() => [
                _createVNode(_component_v_spacer),
                _createVNode(_component_v_btn, {
                  variant: "text",
                  onClick: _cache[18] || (_cache[18] = $event => (confirm.open = false))
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('cancel')), 1)
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_btn, {
                  color: "error",
                  loading: deletingBatch.value,
                  variant: "flat",
                  onClick: runDelete
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('delete')), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    _createVNode(_component_v_dialog, {
      modelValue: filterDialog.value,
      "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((filterDialog).value = $event)),
      "max-width": "440",
      scrollable: ""
    }, {
      default: _withCtx(() => [
        _createVNode(_component_v_card, { class: "asa-filter-dlg" }, {
          default: _withCtx(() => [
            _createVNode(_component_v_card_title, { class: "asa-filter-dlg__title" }, {
              default: _withCtx(() => [
                _createVNode(_component_v_icon, {
                  icon: "mdi-filter-variant",
                  size: "20"
                }),
                _createTextVNode(_toDisplayString(t('filterTitle')), 1)
              ]),
              _: 1
            }),
            _createVNode(_component_v_card_text, { class: "asa-filter-dlg__body" }, {
              default: _withCtx(() => [
                _createVNode(FilterPanel, {
                  state: draft,
                  fields: historyFilterFields.value,
                  stacked: ""
                }, null, 8, ["state", "fields"])
              ]),
              _: 1
            }),
            _createVNode(_component_v_card_actions, null, {
              default: _withCtx(() => [
                _createVNode(_component_v_btn, {
                  variant: "text",
                  onClick: resetDraft
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('resetFilter')), 1)
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_spacer),
                _createVNode(_component_v_btn, {
                  variant: "text",
                  onClick: _cache[20] || (_cache[20] = $event => (filterDialog.value = false))
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('cancel')), 1)
                  ]),
                  _: 1
                }),
                _createVNode(_component_v_btn, {
                  color: "primary",
                  variant: "flat",
                  onClick: applyFilterDialog
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(t('applyFilter')), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 6))
}
}

};
const Page = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-82bd86c8"]]);

export { PluginTabs as P, Page as default };
