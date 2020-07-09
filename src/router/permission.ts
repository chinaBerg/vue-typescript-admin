import VueRouter, { Route } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { AccountModule } from '@/store';s
// import { Message } from 'element-ui';

NProgress.configure({
  showSpinner: false,
});
export default (router: VueRouter) => {
  router.beforeEach(async (to: Route, from: Route, next: Function) => {
    NProgress.start();
    next();

    // const isToLogin = to.name === 'Login';
    // const isLogined = AccountModule.loginSuccess;
    // const loginPath = `/login?redirect=${encodeURIComponent(to.fullPath)}`;

    // const generateDynamicRoutes = async () => {
    //   try {
    //     await AccountModule.genUserRoutes();
    //     const routes = AccountModule.userRoutes || [];
    //     router.addRoutes(routes);
    //     if (to.path === '/') {
    //       const route = routes[0] && routes[0].children && routes[0].children[0];
    //       next({ name: (route && route.name) || 'Page404', replace: true });
    //     } else {
    //       next({ ...to, replace: true });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // const checkPermission = () => {
    //   next();
    //   // if (!AccountModule.userToken) {
    //   //   if (to.meta.permission) {
    //   //     next(loginPath);
    //   //     NProgress.done();
    //   //   } else {
    //   //     next();
    //   //     NProgress.done();
    //   //   }
    //   // } else if (to.meta.permission) {
    //   //   if (!isLogined) {
    //   //     try {
    //   //       await AccountModule.getUserInfo();
    //   //       try {
    //   //         await AccountModule.getConfig();
    //   //       } catch (error) {
    //   //         Message.error('获取用户配置失败');
    //   //       }
    //   //       next();
    //   //       NProgress.done();
    //   //     } catch (error) {
    //   //       next(loginPath);
    //   //       NProgress.done();
    //   //     }
    //   //   } else {
    //   //     next();
    //   //     NProgress.done();
    //   //   }
    //   // } else if (isToLogin) {
    //   //   next('/');
    //   //   NProgress.done();
    //   // } else {
    //   //   next();
    //   //   NProgress.done();
    //   // }
    // };

    /**
     * 首先需要动态生成路由
     */
    // if (!AccountModule.isRoutesGenerated) {
    //   generateDynamicRoutes();
    // } else {
    //   checkPermission();
    // }
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
