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
   * 数据源
   * [{
   *    name: { string }, value: number
   * }]
   */
  @Prop({
    type: Array,
    required: true,
    default: () => [],
  }) data!: any[]

  /** 自定义颜色 */
  @Prop({
    type: String,
  }) colors!: string

  @Prop({
    type: String,
    default: 'emptycircle',
  }) symbol!: string

  @Prop({
    type: Object,
    default: () => ({}),
  }) legend!: object

  private get options() {
    const option = {
      color: this.colors || ECHARTS_COLORS.STACK_LINE,
      tooltip: {
        // 提示框
        show: true,
        trigger: 'axis',
        position(p: any) {
          // 其中p为当前鼠标的位置
          return [p[0] + 40, p[1] - 200];
        },
        borderWidth: '1',
        borderColor: 'rgba(198,200,207,1)',
        extraCssText: 'box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);',
        padding: [
          8, // 上
          8, // 右
          8, // 下
          8, // 左
        ],
        backgroundColor: 'rgba(255,255,255,0.9)',
        textStyle: {
          color: '#555555', // 设置文字颜色
        },
        axisPointer: {
          type: 'line',
        },
      },
      legend: {
        show: true,
        icon: 'circle',
        itemWidth: 10, // 设置宽度
        itemHeight: 10, // 设置高度
        y: '20',
        x: 'center',
        textStyle: {
          color: '#999',
          fontSize: 12,
        },
        ...this.legend,
      },
      grid: {
        // 统计图距离边缘的距离
        top: 20,
        left: '50px',
        right: 20,
        bottom: 30,
      },
      xAxis: [
        {
          // x轴
          type: 'category', // 数据类型为不连续数据
          boundaryGap: true, // 坐标轴两边是否留白
          axisLine: {
            // 坐标轴轴线相关设置。数学上的x轴
            show: false,
          },
          axisLabel: {
            // 坐标轴刻度标签的相关设置
            show: true,
            textStyle: {
              color: 'rgba(0,0,0,0.45)', // x轴颜色
            },
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: 'rgba(0,0,0,0.45)',
            },
          }, // 刻度点数轴
          data: this.getXAxisData,
        },
      ],
      yAxis: [
        {
          // y轴的相关设置
          type: 'value', // y轴数据类型为连续的数据
          // minInterval: 0.0005,
          splitNumber: 8, // y轴上的刻度段数
          splitLine: {
            // y轴上的y轴线条相关设置
            show: true,
            lineStyle: {
              color: '#ccc',
            },
          },
          axisLine: {
            // y轴的相关设置
            show: false,
          },
          axisLabel: {
            // y轴的标签相关设置
            show: true,
            formatter(params) {
              return `${params}`;
            },
            textStyle: {
              color: 'rgba(0,0,0,0.45)',
              fontSize: 14,
            },
          },
          axisTick: {
            show: false,
          }, // 刻度点数轴
        },
      ],
      series: this.formatSeriesData,
    };
    return option;
  }

  private get getXAxisData() {
    if (!this.data || !this.data.length) return [];
    return (this.data || []).map((item) => item.name);
  }

  // 数据处理
  private get formatSeriesData() {
    const { data } = this;
    if (!Array.isArray(data) || !data.length) return [];
    return {
      type: 'line',
      smooth: true,
      symbol: this.symbol,
      symbolSize: 8,
      showSymbol: false,
      areaStyle: {
        opacity: 0.6,
      },
      data: (this.data || []).map((e) => e.value),
    };
  }
}
</script>
