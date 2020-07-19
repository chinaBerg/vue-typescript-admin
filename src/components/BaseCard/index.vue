<template>
  <div class="g-card">
    <div class="g-card__head" v-if="title">
      <slot name="head">{{title}}</slot>
    </div>
    <div class="g-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'BaseCard',
})
export default class extends Vue {
  @Prop({ type: String, default: '' }) title!: string
}
</script>

<style lang="less">
  .g-card {
    background: #fff;
    border-radius: 4px;
    transition: transform .3s;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 2px 2px 3px 0 rgba(100, 100, 100, 0.06);
    }
    &__head {
      padding: 14px;
      line-height: 22px;
      font-size: 18px;
      color: #333;
      border-bottom: 1px solid #f1f1f1;
    }
    &__content {
      padding: 14px;
    }
  }
</style>
