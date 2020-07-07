import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import routerPermission from './permission';

// 常量路由
import constantRoutes, { route404 } from './modules/constantRoutes';
// 各模块路由
import controllCenter from './modules/controllCenter';
import developCenter from './modules/developCenter';
import workplace from './modules/workplace';

// 动态路由
const dynamicRoutes: RouteConfig[] = [
  ...controllCenter,
  ...developCenter,
  ...workplace,
];

Vue.use(VueRouter);

/**
 * createRouter
 * 通过函数初始化一个路由实例
 */
const createRouter = () => new VueRouter({
  mode: 'history',
  routes: constantRoutes,
});

const router = createRouter();

/**
 * 注册路由的权限
 */
routerPermission(router);

export {
  route404,
  dynamicRoutes,
  constantRoutes,
};

export default router;
