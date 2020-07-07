import {
  VuexModule, Module, getModule,
  // Mutation, Action,
} from 'vuex-module-decorators';
import store from '../store';
// import { cloneDeep } from 'lodash';
// import * as types from '../mutation-types';

interface State {
  someDictDemo: string[];
}

@Module({
  dynamic: true, namespaced: true, name: 'dict', store,
})
class Dict extends VuexModule implements State {
  public someDictDemo = []
}

export default getModule(Dict);
