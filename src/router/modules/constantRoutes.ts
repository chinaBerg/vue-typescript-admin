import { RouteConfig } from 'vue-router';
import { cloneDeep } from 'lodash';

const routers: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "other" */ '@/views/Login/index.vue'),
    meta: {
      title: '系统登录',
      frameIn: false,
    },
  },
];

const error404 = {
  path: '*',
  name: 'Page404',
  component: () => import(/* webpackChunkName: "other" */ '@/views/Other/404.vue'),
  meta: {
    title: '404',
    frameIn: false,
  },
};

const getWhiteList = (constantRoutes: RouteConfig[]) => {
  const res: string[] = [];
  const routes = cloneDeep(constantRoutes);

  while (routes && routes.length) {
    const cur = routes.shift() as RouteConfig;
    res.push(cur.name as string);
    if (cur.children && cur.children.length) {
      routes.push(...cur.children);
    }
  }

  return res;
};

const whiteList = getWhiteList(routers);

export default routers;

export {
  error404,
  whiteList,
};
