<template>
  <div class="page-dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <BaseCard class="total__item">
          <div class="flex">
            <div class="total__icon total__month flex-c">
              <i class="el-icon-date"></i>
            </div>
            <div class="flex1">
              <h3>月活用户</h3>
              <p>326,872</p>
            </div>
          </div>
        </BaseCard>
      </el-col>
      <el-col :span="6">
        <BaseCard class="total__item">
          <div class="flex">
            <div class="total__icon total__day flex-c">
              <i class="el-icon-timer"></i>
            </div>
            <div class="flex1">
              <h3>日活用户</h3>
              <p>42,133</p>
            </div>
          </div>
        </BaseCard>
      </el-col>
      <el-col :span="6">
        <BaseCard class="total__item">
          <div class="flex">
            <div class="total__icon total__new flex-c">
              <i class="el-icon-user"></i>
            </div>
            <div class="flex1">
              <h3>今日新增用户</h3>
              <p>1970</p>
            </div>
          </div>
        </BaseCard>
      </el-col>
      <el-col :span="6">
        <BaseCard class="total__item">
        <div class="flex">
            <div class="total__icon total__ad flex-c">
              <i class="el-icon-set-up"></i>
            </div>
            <div class="flex1">
              <h3>今日广告用户</h3>
              <p>500</p>
            </div>
          </div>
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <BaseCard class="dashboard__item" title="成交统计">
          <BaseEchartsLine
            :data="echartsLineData"
            height="300px"
          />
        </BaseCard>
      </el-col>
      <el-col :span="12">
        <BaseCard class="dashboard__item" title="品牌销售额占比">
          <BaseEchartsPie
            :data="echartsPieData"
            height="300px"
          />
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <BaseCard class="dashboard__item" title="近一个月活跃用户">
          <BaseEchartsBar
            :data="echartsBarData"
            height="400px"
          />
        </BaseCard>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <BaseCard class="dashboard__item" title="赞助商列表">
          <ul class="sponsor__list" v-for="item in sponsorList" :key="item.id">
            <li class="sponsor__item ali-c">
              <img src="../../../assets/images/temp/head.png" class="sponsor__avator" alt="">
              <p class="flex1">{{item.name}}</p>
              <span>置顶</span>
            </li>
          </ul>
        </BaseCard>

        <BaseCard class="dashboard__item" title="产品指标">
          <BaseEchartsRadar
            :data="echartsRadarData"
            height="314px"
          />
        </BaseCard>
      </el-col>

      <el-col :span="16">
        <BaseCard class="dashboard__item" title="热销产品榜单">
          <el-table
            :data="hotProductions"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
            />
            <el-table-column
              prop="price"
              label="价格"
            />
            <el-table-column
              prop="oldPrice"
              label="原价"
            />
            <el-table-column
              prop="place"
              label="产地"
            />
          </el-table>
        </BaseCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  TheBaseLayout,
  BaseCard,
  BaseEchartsLine,
  BaseEchartsPie,
  BaseEchartsBar,
  BaseEchartsRadar,
} from '@/components';

import RobotDialog from './components/RobotDialog.vue';

interface BarData {name: string; value: number}
const genBarData = (): BarData[] => {
  const res: BarData[] = [];
  for (let i = 0; i < 31; i++) {
    res.push({
      name: `03-${i < 10 ? '0' : ''}${i + 1}`,
      value: Math.floor(Math.random() * 10000 + 40000),
    });
  }
  return res;
};

@Component({
  name: 'Dashboard',
  components: {
    TheBaseLayout,
    RobotDialog,
    BaseCard,
    BaseEchartsLine,
    BaseEchartsPie,
    BaseEchartsBar,
    BaseEchartsRadar,
  },
})
export default class extends Vue {
  private echartsLineData = [
    { name: '1月', value: 3819 },
    { name: '2月', value: 4509 },
    { name: '3月', value: 4311 },
    { name: '4月', value: 5098 },
    { name: '5月', value: 5781 },
    { name: '6月', value: 7769 },
    { name: '7月', value: 8990 },
    { name: '8月', value: 10922 },
    { name: '9月', value: 9901 },
    { name: '10月', value: 7981 },
    { name: '11月', value: 6511 },
    { name: '12月', value: 5531 },
  ]

  private echartsPieData = [
    { name: '小米', value: 3912 },
    { name: '华为', value: 8878 },
    { name: 'Iphone', value: 7789 },
    { name: 'Oppo', value: 6761 },
    { name: 'Vivo', value: 5789 },
  ]

  private echartsBarData = genBarData()

  private sponsorList = [
    { id: 1, name: '小米' },
    { id: 2, name: '华为' },
    { id: 3, name: 'Iphone' },
    { id: 4, name: '联想' },
    { id: 5, name: 'Oppo' },
    { id: 6, name: 'Vivo' },
  ]

  private hotProductions = [
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
    {
      name: '锋味辣酱', price: 21.99, oldPrice: 29.99, place: '拉玛干沙漠', saleNums: 187712,
    },
  ]

  private echartsRadarData = [
    { name: '产品种类', value: 81 },
    { name: '产品口感', value: 89 },
    { name: '产品质量', value: 70 },
    { name: '产品保质期', value: 86 },
    { name: '快递速度', value: 79 },
  ]
}
</script>

<style lang="less" scoped>
  @import url('../../../styles/var');
  .page-dashboard-container {
    padding: 20px 20px 0;

    .total__item {
      margin-bottom: 20px;
      .total__icon {
        width: 45px;
        height: 45px;
        margin-right: 20px;
        border-radius: 10px;
        i {
          font-size: 24px;
          color: #fff;
        }
        &.total__month {
          background: #61cad7;
        }
        &.total__day {
          background: #797ff9;
        }
        &.total__new {
          background: #f7d643;
        }
        &.total__ad {
          background: #ff6d5a;
        }
      }
    }

    .dashboard__item {
      margin-bottom: 20px;
    }

    .sponsor__list {
      .sponsor__item {
        padding: 10px 0;
        margin-bottom: 20px;
        border-bottom: 1px solid #f1f1f1;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .sponsor__avator {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
        background: #f1f1f1;
        overflow: hidden;
      }
      span {
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
