<template>
  <div
    class="g-icon"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    v-on="$listeners">
    <svg class="g-icon__svg" :style="styles" aria-hidden="true">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import variables from '@/styles/var.less';

@Component({
  name: 'BaseIcon',
})
export default class extends Vue {
  /** 图标类名 */
  @Prop({ type: String, required: true }) icon!: string

  /** 图标的字体大小 */
  @Prop({ type: [String, Number], default: '16px' }) size!: string | number

  /** 图标的颜色 */
  @Prop({ type: String, default: '#333' }) color!: string

  /** 鼠标划过时图标的颜色 */
  @Prop({ type: String, default: variables.primaryColor }) hoverColor!: string

  private get styles() {
    return {
      fontSize: typeof this.size === 'number' ? `${this.size}px` : this.size,
      fill: this.color,
    };
  }

  private handleMouseenter(el: Event) {
    this.updateFillColor(el, this.hoverColor);
  }

  private handleMouseleave(el: Event) {
    this.updateFillColor(el, this.color);
  }

  private updateFillColor(el: Event, color: string) {
    const { target } = el;
    const svg = (target as HTMLElement).querySelector('.g-icon__svg');
    if (svg) {
      (svg as HTMLElement).style.fill = color;
    }
  }
}
</script>

<style lang="less">
  .g-icon {
    display: inline-block;
    &__svg {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      overflow: hidden;
    }
  }
</style>
