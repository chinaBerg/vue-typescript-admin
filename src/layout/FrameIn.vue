<template>
  <div class="app-container">
    <AppAside ref="Aside" />

    <div class="app-main" ref="Main" :style="containerStyle('padding-left')">
      <AppHead @toggle="toggleNav" />
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Mixins } from 'vue-property-decorator';
import { AppModule } from '@/store';
import { TOGGLE_COLLAPSE } from '@/store/mutation-types';
import { MenuConfig } from '@/store/constant';
import anime from 'animejs';

import AppAside from './components/AppAside.vue';
import AppHead from './components/AppHead.vue';
import AppMain from './components/AppMain.vue';
import styleMixin from './mixins/style';

@Component({
  name: 'AppWrapper',
  components: {
    AppAside,
    AppHead,
    AppMain,
  },
})
export default class extends Mixins(styleMixin) {
  @Ref() Main!: HTMLDivElement;

  @Ref() Aside!: AppAside;

  private get navCollapse() {
    return AppModule.navCollapse;
  }

  private toggleNav() {
    const params = { duration: 150, easing: 'linear' };
    const { width, widthCollapse } = MenuConfig;
    if (!this.navCollapse) {
      anime({
        targets: this.Aside.$el,
        width: widthCollapse,
        ...params,
      });
      anime({
        targets: this.Main,
        paddingLeft: widthCollapse,
        ...params,
        complete() {
          AppModule[TOGGLE_COLLAPSE](true);
        },
      });
    } else {
      anime({ targets: this.Aside.$el, width, ...params });
      anime({
        targets: this.Main,
        paddingLeft: width,
        ...params,
        begin() {
          AppModule[TOGGLE_COLLAPSE](false);
        },
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../styles/var.less');
  .app-container {
    height: 100%;
  }
  .app-main {
    height: 100%;
    padding-left: @aside-width;
    background: @primary-bg;
  }
</style>
