<template>
  <section class="app-page-contianer">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cached">
        <div class="app-page-padding">
          <router-view class="app-page-content" />
        </div>
      </keep-alive>
    </transition>
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
  .app-page-padding {
    height: 100%;
    padding: 14px;
  }
  .app-page-content {
    min-height: 100%;
    padding: 12px;
  }
}
</style>
