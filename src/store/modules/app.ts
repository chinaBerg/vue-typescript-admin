import store from '@/store/store';
import {
  VuexModule, Module, getModule, Mutation,
} from 'vuex-module-decorators';
import * as types from '../mutation-types';

@Module({
  dynamic: true, namespaced: true, name: 'app', store,
})
class App extends VuexModule {
  /** nav收起展开状态 */
  public navCollapse = false

  @Mutation
  private [types.TOGGLE_COLLAPSE](state: boolean) {
    this.navCollapse = state;
  }
}

export default getModule(App);
