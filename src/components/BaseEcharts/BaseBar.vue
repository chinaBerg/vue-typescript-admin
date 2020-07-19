<template>
  <BaseEcharts ref="echart" :options="options" :style="wrapperStyle" />
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { ECHARTS_COLORS } from '@/store/constant';
import BaseEcharts from './BaseEcharts.vue';
import sizeMixin from './sizeMixin';

@Component({
  name: 'BaseEchartBar',
  components: {
    BaseEcharts,
  },
})
export default class extends Mixins(sizeMixin) {
  @Prop({
    type: Array,
    required: true,
    default: () => [],
  })
  data!: any[]

  @Prop({
    type: Array,
  })
  colors!: string[]

  private get chartsColors() {
    return this.colors || ECHARTS_COLORS.DEFAULT;
  }

  private get series() {
    const dataItem = {
      type: 'bar',
      barMaxWidth: 25,
      data: (this.data || []).map((e) => e.value),
    };
    return [
      dataItem,
    ];
  }

  private get options() {
    const option = {
      color: this.chartsColors,
      tooltip: {
        // 提示框
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: 20,
        left: 30,
        bottom: '5%',
        right: 30,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#000',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc',
              fontWeight: 'normal',
              fontSize: '12',
            },
          },
          data: (this.data || []).map((item) => item.name),
        },
      ],
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      series: this.series,
    };
    return option;
  }
}
</script>
