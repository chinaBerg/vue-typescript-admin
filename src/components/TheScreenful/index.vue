<template>
  <div class="g-screenfull flex-c" @click="toggle">
    <i class="el-icon-full-screen" v-if="!isFullscreen"></i>
    <template v-else>
      <i class="el-icon-bottom-left flex-c"></i>
      <i class="el-icon-top-right flex-c"></i>
    </template>
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
      color: @primary-color;
    }
    .el-icon-full-screen {
      font-size: 22px;
      font-weight: bold;
    }
    .el-icon-bottom-left,
    .el-icon-top-right {
      width: 15px;
      height: 15px;
      font-size: 14px;
      font-weight: bold;
    }
    .el-icon-bottom-left {
      position: absolute;
      right: 2px;
      top: 2px;
    }
    .el-icon-top-right {
      position: absolute;
      bottom: 2px;
      left: 2px;
    }
  }
</style>
