import Vue from 'vue';
import VueRouter from 'vue-router';
import routerPermission from './permission';

// 常量路由
import constantRoutes, { error404 } from './modules/constantRoutes';
// 各模块路由
import dynamicRoutes from './modules/dynamicRoutes';

Vue.use(VueRouter);

/**
 * createRouter
 * 通过函数初始化一个路由实例
 */
const createRouter = () => new VueRouter({
  mode: 'history',
  routes: [...constantRoutes],
});

const router = createRouter();

/**
 * 注册路由的权限
 */
routerPermission(router);

export default router;

export {
  dynamicRoutes,
  error404,
};
