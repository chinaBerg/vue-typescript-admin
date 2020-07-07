import { RouteConfig } from 'vue-router';

/**
 * 控制中心的全部路由字典
 */
const routes: RouteConfig[] = [
  {
    path: '/controller-center',
    name: 'ControllerCenter',
    component: { render: (h) => h('router-view') },
    meta: {
      title: '导航一',
      frameIn: true,
      permission: false,
      auths: {},
    },
    children: [
      {
        path: '/survey',
        name: 'ControllerSurvey',
        component: () => import(/* webpackChunkName: "controller" */ '@/views/Dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          frameIn: true,
          permission: false,
        },
      },
    ],
  },
];

export default routes;
