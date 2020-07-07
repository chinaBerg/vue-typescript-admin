<template>
  <div class="g-base-layout flex">
    <header class="g-base-layout__head">
      <slot name="head"></slot>
    </header>

    <section class="g-base-layout__content flex1" :style="styles">
      <slot name="content"></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'TheBaseLayout',
})
export default class extends Vue {
  @Prop({ type: String, default: 'auto' }) overflow!: Pick<CSSStyleDeclaration, 'overflow'>

  get styles() {
    return {
      overflow: this.overflow,
    };
  }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var.less');
  .g-base-layout {
    padding: 0 !important;
    flex-direction: column;
    height: 100%;
    background: transparent !important;
    &__head {
      position: relative;
      padding: 20px;
      margin-bottom: 14px;
      background: #fff;
      border-radius: 4px;
    }

    &__content {
      position: relative;
      height: 100%;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
    }
  }
</style>
