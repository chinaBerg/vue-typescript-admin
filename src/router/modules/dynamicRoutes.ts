import { RouteConfig } from 'vue-router';

/**
 * 控制中心的全部路由字典
 */
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Dashboard',
    redirect: '/dashboard/main',
    component: { render: (h) => h('router-view') },
    meta: {
      title: 'Dashboard',
      frameIn: true,
      permission: ['admin', 'operator'],
      icon: 'el-icon-s-data',
    },
    children: [
      {
        path: '/dashboard/main',
        name: 'DashboardMain',
        component: () => import('@/views/Dashboard/Main/index.vue'),
        meta: {
          title: '统计',
          frameIn: true,
          permission: ['admin'],
          icon: 'el-icon-odometer',
        },
      },
      {
        path: '/dashboard/monitor',
        name: 'DashboardMonitor',
        component: () => import('@/views/Dashboard/Monitor/index.vue'),
        meta: {
          title: '监控',
          frameIn: true,
          permission: ['admin'],
          icon: 'el-icon-view',
        },
      },
      {
        path: '/dashboard/wrokplace',
        name: 'DashboardWrokplace',
        component: () => import('@/views/Dashboard/Wrokplace/index.vue'),
        meta: {
          title: '工作台',
          frameIn: true,
          permission: ['admin', 'operator'],
          icon: 'el-icon-data-line',
        },
      },
    ],
  },
  {
    path: '/form',
    name: 'Form',
    component: { render: (h) => h('router-view') },
    meta: {
      title: '表单',
      frameIn: true,
      permission: ['admin', 'operator'],
      icon: 'el-icon-edit-outline',
    },
    children: [
      {
        path: '/form/base',
        name: 'FormBase',
        component: () => import('../../views/Form/Base/index.vue'),
        meta: {
          title: '基础表单',
          frameIn: true,
          permission: ['admin', 'operator'],
          icon: 'el-icon-data-line',
        },
      },
    ],
  },
];

export default routes;
