<template>
  <div :class="containerClass">
    <AppAside :class="asideClass" />

    <div :class="mainClass">
      <AppHead/>
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store';
import AppAside from './components/AppAside.vue';
import AppHead from './components/AppHead.vue';
import AppMain from './components/AppMain.vue';

@Component({
  name: 'AppWrapper',
  components: {
    AppAside,
    AppHead,
    AppMain,
  },
})
export default class extends Vue {
  private get navCollapse() {
    return AppModule.navCollapse;
  }

  private get containerClass() {
    return ['app-container', { 'app-container--collapse': this.navCollapse }];
  }

  private get asideClass() {
    return { 'app-aside--collapse': this.navCollapse };
  }

  private get mainClass() {
    return ['app-main', { 'app-main--collapse': this.navCollapse }];
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
    transition: padding-left .3s;
    &--collapse {
      padding-left: 64px;
    }
  }
</style>
