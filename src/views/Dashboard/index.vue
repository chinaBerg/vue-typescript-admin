<template>
  <div class="page-dashboard-container">
    <el-row>
      <el-col :span="6">
        <div class="dashboard__item">asdas</div>
      </el-col>
      <el-col :span="6">
        <div class="dashboard__item">asdas</div>
      </el-col>
      <el-col :span="6">
        <div class="dashboard__item">asdas</div>
      </el-col>
      <el-col :span="6">
        <div class="dashboard__item">asdas</div>
      </el-col>

      <el-col :span="12">
        <div class="dashboard__item">asdas</div>
      </el-col>
      <el-col :span="12">
        <div class="dashboard__item">asdas</div>
      </el-col>

      <el-col :span="24">
        <div class="dashboard__item">asdas</div>
      </el-col>

      <el-col :span="8">
        <div class="dashboard__item">asdas</div>
      </el-col>
      <el-col :span="8">
        <div class="dashboard__item">asdas</div>
      </el-col>
      <el-col :span="8">
        <div class="dashboard__item">asdas</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TheBaseLayout } from '@/components';
import RobotDialog from './components/RobotDialog.vue';

@Component({
  name: 'Dashboard',
  components: {
    TheBaseLayout,
    RobotDialog,
  },
})
export default class extends Vue {
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var.less');
  .page-dashboard-container {
    .dashboard__item {
      padding: 20px;
      margin: 20px;
      background: #fff;
    }
  }
</style>
