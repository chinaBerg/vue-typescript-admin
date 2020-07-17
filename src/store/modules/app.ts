import store from '@/store/store';
import {
  VuexModule, Module, getModule, Mutation,
} from 'vuex-module-decorators';
import * as types from '../mutation-types';

@Module({
  dynamic: true, namespaced: true, name: 'app', store,
})
class AppModule extends VuexModule {
  /** nav收起展开状态 */
  public navCollapse = sessionStorage.getItem(types.TOGGLE_COLLAPSE) === '1'

  @Mutation
  private [types.TOGGLE_COLLAPSE](state: boolean) {
    this.navCollapse = state;
    sessionStorage.setItem(types.TOGGLE_COLLAPSE, state ? '1' : '0');
  }
}

export default getModule(AppModule);
