import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/develop-center',
    name: 'DevelopCenter',
    component: { render: (h) => h('router-view') },
    meta: {
      title: '导航二',
      frameIn: true,
      permission: false,
      auths: {},
    },
    children: [
      {
        path: '/develop/personal-process',
        name: 'DevelopPersonalProcess',
        component: () => import(/* webpackChunkName: "controller" */ '@/views/Page1/index.vue'),
        meta: {
          title: '列表',
          frameIn: true,
          permission: false,
          auths: {},
        },
      },
    ],
  },
];

export default routes;
