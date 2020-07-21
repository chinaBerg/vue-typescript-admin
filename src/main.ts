import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store/store';
import filters from './filters';
import './styles/index.less';
import 'element-ui/lib/theme-chalk/index.css';

import SvgIcon from './icons/index';

Vue.use(filters).use(ElementUI).use(SvgIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
