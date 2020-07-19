<template>
  <BaseEchart ref="echart" :options="options" :style="wrapperStyle" />
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { ECHARTS_COLORS } from '@/store/constant';
import BaseEchart from './BaseEcharts.vue';
import sizeMixin from './sizeMixin';

@Component({
  name: 'BaseEchartBar',
  components: {
    BaseEchart,
  },
})
export default class extends Mixins(sizeMixin) {
  @Prop({
    type: Array,
    required: true,
    default: () => [],
  }) data!: any

  private get options() {
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        left: 'center',
        data: this.data.map((item) => item.name),
      },
      radar: [
        {
          indicator: this.data.map((item) => ({
            text: item.name, max: 100,
          })),
        },
      ],
      series: this.formatSeries,
    };
    return option;
  }

  private get formatSeries() {
    return {
      type: 'radar',
      data: [
        {
          value: (this.data || []).map((item) => item.value),
          areaStyle: {
            color: ECHARTS_COLORS.DEFAULT[0],
          },
          name: '产品指标',
        },
      ],
    };
  }
}
</script>
