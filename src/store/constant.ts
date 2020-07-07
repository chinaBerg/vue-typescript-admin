import { RouteConfig } from 'vue-router';
// 日期格式化参数
export const DateFormat: {[prop: string]: string} = {
  default: 'YYYY-MM-DD HH:mm:ss',
  ymd: 'YYYY-MM-DD',
};

export const NavDataDict = {
  controllerCenter: '控制中心',
};

/**
 * BaseMenuMapping
 * 基础菜单/路由（一级菜单）的映射字典
 */
export const BaseMenuMapping: RouteConfig[] = [
  {
    path: '/controller-center',
    name: 'ControllerCenter',
    component: { render: (h) => h('router-view') },
    children: [],
    meta: {
      frameIn: true,
      title: '控制中心',
      auths: {},
    },
  },
  {
    path: '/develop-center',
    name: 'DevelopCenter',
    component: { render: (h) => h('router-view') },
    children: [],
    meta: {
      frameIn: true,
      title: '开发中心',
      auths: {},
    },
  },
  {
    path: '/work-area',
    name: 'WorkArea',
    component: { render: (h) => h('router-view') },
    children: [],
    meta: {
      frameIn: true,
      title: '工作区',
      auths: {},
    },
  },
];
