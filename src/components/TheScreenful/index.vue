<template>
  <div class="g-screenfull flex-c" @click="toggle">
    <SvgIcon :icon="iconName" size="22px" />
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'TheScreenfull',
})
export default class extends Vue {
  private isFullscreen = false

  private get iconName() {
    return this.isFullscreen ? 'vtaicon__screen-exit' : 'vtaicon__screen-full';
  }

  private created() {
    const changeCb = () => {
      this.isFullscreen = (screenfull as any).isFullscreen;
    };
    if (screenfull.isEnabled) {
      screenfull.on('change', changeCb);
      this.$once('hook:beforeDestroy', () => {
        (screenfull as any).off('change', changeCb);
      });
    }
  }

  private toggle() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var');
  /* 全屏/取消按钮 */
  .g-screenfull {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    user-select: none;

    &:hover {
      fill: @primary-color;
    }
  }
</style>
