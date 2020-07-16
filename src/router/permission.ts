import VueRouter, { Route } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AccountModule } from '@/store';
import { Message } from 'element-ui';
import { whiteList } from './modules/constantRoutes';

NProgress.configure({
  showSpinner: false,
});

export default (router: VueRouter) => {
  router.beforeEach(async (to: Route, from: Route, next: Function) => {
    NProgress.start();

    const isToLogin = to.name === 'Login';
    const isLogined = AccountModule.loginSuccess;
    const isReqAuth = !whiteList.includes(to.name as string);
    const loginPath = `/login?redirect=${encodeURIComponent(to.fullPath)}`;

    if (!AccountModule.userToken) {
      if (isReqAuth) {
        next(loginPath);
      } else {
        next();
      }
      NProgress.done();
    } else if (isReqAuth) {
      if (!isLogined) {
        try {
          await AccountModule.getUserinfo();
          AccountModule.generateRoutes();
          router.addRoutes(AccountModule.userRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          Message.error(error);
          next(loginPath);
        } finally {
          NProgress.done();
        }
      } else {
        next();
        NProgress.done();
      }
    } else if (isToLogin) {
      next('/');
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
