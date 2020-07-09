import { RouteConfig } from 'vue-router';

/**
 * 控制中心的全部路由字典
 */
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: {
      title: 'Dashboard',
      frameIn: true,
    },
  },
];

export default routes;
