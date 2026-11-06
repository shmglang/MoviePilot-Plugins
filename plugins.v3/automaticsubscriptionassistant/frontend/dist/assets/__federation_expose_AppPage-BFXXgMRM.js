import { importShared } from './__federation_fn_import-JrT3xvdd.js';
import Page from './__federation_expose_Page-C49DXiTp.js';

const {openBlock:_openBlock,createBlock:_createBlock} = await importShared('vue');

const _sfc_main = {
  __name: 'AppPage',
  props: {
  api: { type: Object, default: () => ({}) },
  navKey: { type: String, default: 'main' },
  pluginId: { type: String, default: '' },
},
  emits: ['close'],
  setup(__props, { emit: __emit }) {


const emit = __emit;

return (_ctx, _cache) => {
  return (_openBlock(), _createBlock(Page, {
    api: __props.api,
    sidebar: "",
    show_switch: false,
    onClose: _cache[0] || (_cache[0] = $event => (emit('close')))
  }, null, 8, ["api"]))
}
}

};

export { _sfc_main as default };
