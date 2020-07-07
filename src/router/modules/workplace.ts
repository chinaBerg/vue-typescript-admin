import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/workplace',
    name: 'Workplace',
    component: { render: (h) => h('router-view') },
    meta: {
      title: '导航三',
      frameIn: true,
      permission: false,
      auths: {},
    },
    children: [
      {
        path: '/workplace/personal-robot',
        name: 'WorkplacePersonalRobot',
        component: () => import(/* webpackChunkName: "Workplace" */ '@/views/Page2/index.vue'),
        meta: {
          title: '其他',
          frameIn: true,
          permission: false,
          auths: {},
        },
      },
    ],
  },
];

export default routes;
