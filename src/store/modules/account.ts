import store from '@/store/store';
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import { getToken } from '@/utils/token';
import { RouteConfig } from 'vue-router';
import { dynamicRoutes, route404 } from '@/router';
import { cloneDeep } from 'lodash';
import { Account as AccountInterface } from '@/interface';
import * as types from '../mutation-types';

type UserRoutes = RouteConfig[] | null

interface State {
  userToken: AccountInterface.UserToken;
  userAuths: UserRoutes;
  userRoutes: UserRoutes;
}

const pickRouteByName = (routes: RouteConfig[], name: string | undefined) => (routes || [])
  .find((route) => route.name === name);

@Module({
  dynamic: true, namespaced: true, name: 'account', store,
})
class Account extends VuexModule implements State {
  // 用户token
  public userToken = getToken() || ''

  /** 用户的权限列表 */
  public userAuths: UserRoutes = null

  /** 用户的路由列表 */
  public userRoutes: UserRoutes = null

  /** 用户菜单数据 */
  public menuData: UserRoutes = null

  /** 用户当前选中的头部菜单项 */
  public currentHeadMenu: RouteConfig | null = null

  /** 是否生成路由成功 */
  public get isRoutesGenerated() {
    return this.userRoutes !== null;
  }

  /**
   * 从api获取用户的权限列表
   */
  @Action({ rawError: true })
  async getUserAuths() {
    return new Promise((resolve) => {
      try {
        import('../../mook/routerData').then((res) => {
          this.context.commit(types.SET_USER_AUTHS, res.default);
          resolve();
        });
      } catch (error) {
        throw error.message || '获取用户权限失败';
      }
    });
  }

  /**
   * 生成用户的路由
   */
  @Action({ rawError: true })
  async genUserRoutes() {
    try {
      await this.getUserAuths();
      this[types.GENERATE_USER_ROUTES]();
    } catch (error) {
      throw '生成路由配置失败';
    }
  }

  @Mutation
  private [types.SET_USER_AUTHS](auths: UserRoutes = []) {
    this.userAuths = auths;
  }

  /**
   * 生成异步路由
   * @description 根据用户的权限列表，从路由字典里面匹配出正确的路由
   */
  @Mutation
  private [types.GENERATE_USER_ROUTES]() {
    const routes: any = [];
    if (this.userAuths && this.userAuths.length) {
      this.userAuths.forEach((auth) => {
        const curRoute = pickRouteByName(dynamicRoutes, auth.name);
        if (curRoute) {
          const authChild = auth.children || [];
          const pickRoute = (route: RouteConfig) => pickRouteByName(authChild, route.name);
          curRoute.children = (curRoute.children as RouteConfig[]).filter(pickRoute);
          routes.push(curRoute);
        }
      });
    }
    this.menuData = cloneDeep(routes);

    // 404页面需要放在最后
    routes.push(route404);
    this.userRoutes = routes;
  }

  @Mutation
  [types.SET_CURRENT_HEAD_MENU](routeName: string) {
    if (this.menuData) {
      const currentMenu = this.menuData.find((item: RouteConfig) => item.name === routeName);
      if (currentMenu) {
        this.currentHeadMenu = currentMenu;
      }
    }
  }
}

export default getModule(Account);
