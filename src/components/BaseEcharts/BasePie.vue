<template>
  <BaseEcharts ref="echart" :options="options" :style="wrapperStyle" />
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { ECHARTS_COLORS } from '@/store/constant';
import BaseEcharts from './BaseEcharts.vue';
import sizeMixin from './sizeMixin';

@Component({
  name: 'BaseEchartsBar',
  components: {
    BaseEcharts,
  },
})
export default class extends Mixins(sizeMixin) {
  /**
   * data 饼图数据
   * [{
   *    name: string, value: number
   * }]
   */
  @Prop({
    type: Array,
    required: true,
    default: () => [],
  }) data!: any[]

  @Prop({
    type: Array,
  })
  colors!: string[]

  private get chartsColors() {
    return this.colors || ECHARTS_COLORS.DEFAULT;
  }

  private get options() {
    const option = {
      color: this.chartsColors,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        icon: 'circle',
        right: 36,
        top: 'center',
        textStyle: {
          color: '#999',
          fontSize: 12,
        },
      },
      series: [
        {
          name: '饼图',
          type: 'pie',
          roseType: 'radius',
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay() {
            return Math.random() * 200;
          },
          data: this.data,
        },
      ],
    };
    return option;
  }
}
</script>
