import store from '@/store/store';
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import { getToken, setToken, resetToken } from '@/utils/token';
import { dynamicRoutes, error404 } from '@/router';
import { Account } from '@/interface';
import { RouteConfig } from 'vue-router';
import * as types from '../mutation-types';

// type UserRoutes = RouteConfig[] | null

/**
 * deepRoutes 递归异步路由，筛选当前用户角色支持的路由
 * @param routes 异步路由数组
 * @param userRoles 当前用户角色
 * @returns { Array<router> } 返回当前用户角色的所有路由
 */
const deepRoutes = (
  routes: RouteConfig[],
  userRoles: string[],
) => routes.filter((route: RouteConfig) => {
  const auths = route.meta && route.meta.permission;
  let isInclude = true;
  if (auths && auths.length) {
    isInclude = auths.some((auth) => userRoles.includes(auth));
  }
  if (route.children && route.children.length) {
    deepRoutes(route.children, userRoles);
  }
  return isInclude;
});

@Module({
  dynamic: true,
  namespaced: true,
  name: 'account',
  store,
})
class AccountModule extends VuexModule {
  /** 用户token */
  public userToken: Account.UserToken | null = getToken() || null

  /** 用户详情 */
  public userinfo: Account.Userinfo | null = null;

  public userRoutes: RouteConfig[] = []

  /** 是否登录成功 */
  public get loginSuccess(): boolean {
    if (this.userinfo && this.userinfo.id) return true;
    return false;
  }

  public get userRoles(): string[] {
    if (!this.userinfo) return [];
    return this.userinfo.roles || [];
  }

  /**
   * login
   * @description 模拟登录
   */
  @Action({ rawError: true })
  async login() {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          this[types.SET_TOKEN]('HSJKJHAJKSBABHKAHJKSJKAHKJ#*((H@#SZXZXXZ');
          resolve();
        }, 800);
      } catch (error) {
        reject(error.messgae || '登录失败');
      }
    });
  }

  /**
   * logout
   * @description 退出登录
   */
  @Action({ rawError: true })
  async logout() {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          this[types.RESET_TOKEN]();
          this[types.SET_USERINFO](null);
          this[types.GEN_ROUTES]([]);
          resolve();
        }, 800);
      } catch (error) {
        reject(error.messgae || '退出登录失败');
      }
    });
  }

  /**
   * login
   * @description 获取用户详情
   */
  @Action({ rawError: true })
  async getUserinfo() {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const userinfo: Account.Userinfo = {
            id: 1,
            name: '王小明',
            account: 'admin',
            roles: ['admin'],
          };
          this[types.SET_USERINFO](userinfo);
          resolve();
        }, 800);
      } catch (error) {
        reject(error.messgae || '获取用户信息失败');
      }
    });
  }

  /**
   * login
   * @description 生成用户的路由数组
   */
  @Action({ rawError: true })
  async generateRoutes() {
    const userRoutes = deepRoutes(dynamicRoutes, this.userRoles);
    userRoutes.push(error404);
    this[types.GEN_ROUTES](userRoutes);
  }

  @Mutation
  private [types.SET_TOKEN](userToken: string) {
    this.userToken = userToken;
    setToken(userToken);
  }

  @Mutation
  private [types.RESET_TOKEN]() {
    this.userToken = null;
    resetToken();
  }

  @Mutation
  private [types.SET_USERINFO](userinfo: any) {
    this.userinfo = userinfo;
  }

  @Mutation
  private [types.GEN_ROUTES](routes: RouteConfig[]) {
    this.userRoutes = routes;
  }
}

export default getModule(AccountModule);
