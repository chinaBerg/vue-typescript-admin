import { Component } from 'vue-property-decorator';

// 注册路由钩子
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
