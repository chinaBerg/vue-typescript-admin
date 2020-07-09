<template>
  <section class="app-page-contianer">
    <keep-alive :include="cached">
      <transition name="fade-transform" mode="out-in">
        <router-view class="app-page-content" />
      </transition>
    </keep-alive>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'AppMain',
})
export default class extends Vue {
  private cached: (string | null)[] = []
}
</script>

<style lang="less" scoped>
@import url('../../styles/var');
.app-page-contianer {
  height: calc(100vh - @app-head-height);
  overflow-x: hidden;
  overflow: auto;
  .app-page-content {
    height: 100%;
    min-height: 100%;
  }
}
</style>
