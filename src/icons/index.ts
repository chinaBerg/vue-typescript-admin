import Vue from 'vue';
import { SvgIcon } from '@/components';// svg component

export default {
  install(vm: typeof Vue) {
    const importAll = (r) => r.keys().forEach(r);
    importAll(require.context('@/icons/', true, /\.(svg)(\?.*)?$/));

    vm.component('SvgIcon', SvgIcon);
  },
};
