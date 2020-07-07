import { RouteConfig } from 'vue-router';

const routers: RouteConfig[] = [
];

const route404 = {
  path: '*',
  name: 'Page404',
  component: () => import(/* webpackChunkName: "other" */ '@/views/Other/404.vue'),
  meta: {
    title: '404',
    permission: false,
    frameIn: false,
  },
};

export default routers;

export {
  route404,
};
