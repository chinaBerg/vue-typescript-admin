<template>
  <TheBaseLayout
    class="page-robot-container">
    <template slot="head">
      <el-tabs class="robot__tabs">
        <el-tab-pane label="tab1" />
        <el-tab-pane label="tab2" />
        <el-tab-pane label="tab3" />
      </el-tabs>
      <div class="robot__operation ali-c">
        <el-input
          placeholder="请输入内容"
          v-model="searchKey"
          class="search__wrapper"
          size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button
          type="primary"
          size="small"
          class="ml10"
          @click="handleRefresh">
          刷新
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="ml10"
          @click="handleEdit">
          编辑
        </el-button>
        <el-button
          type="danger"
          size="small"
          class="ml10"
          @click="handleDelete">
          删除
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="ml10"
          @click="handleCreate">
          新建
        </el-button>
      </div>
    </template>

    <template slot="content">
      <section class="process__wrapper custom-scroll">
        <el-table :data="dataList" style="width: 100%">
          <el-table-column
            prop="status"
            label="状态"
            align="center">
          </el-table-column>
          <el-table-column prop="name" label="名称"/>
          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">{{scope.row.created | formatDate}}</template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="使用方式"
            align="center">
          </el-table-column>
          <el-table-column
            prop="user"
            label="当前用户"
            align="center">
          </el-table-column>
          <el-table-column
            prop="master"
            label="所属员工/部门"
            align="center">
          </el-table-column>
        </el-table>

        <div class="g__page-wrapper">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </section>

      <RobotDialog
        :visible.sync="robotDialog.visible"
        :type="robotDialog.type"
        :data="robotDialog.data">
      </RobotDialog>
    </template>
  </TheBaseLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TheBaseLayout } from '@/components';
import RobotDialog from './components/RobotDialog.vue';
import { RobotDialog as RobotDialogInterface } from './interface';

@Component({
  name: 'Page1',
  components: {
    TheBaseLayout,
    RobotDialog,
  },
})
export default class extends Vue {
  private searchKey = ''

  private robotDialog: RobotDialogInterface = {
    type: 'create',
    data: '',
    visible: false,
  }

  private dataList = [
    {
      status: '在线', name: '小朱的助手', created: Date.now(), type: '单人独占', user: '小朱', master: '小朱',
    },
    {
      status: '离线', name: '小朱的助手', created: Date.now(), type: '多人共用', user: '/', master: '财务部',
    },
    {
      status: '离线', name: '小朱的助手', created: Date.now(), type: '单人独占', user: '小朱', master: '小朱',
    },
    {
      status: '离线', name: '小朱的助手', created: Date.now(), type: '单人独占', user: '小朱', master: '小朱',
    },
    {
      status: '离线', name: '小朱的助手', created: Date.now(), type: '单人独占', user: '小朱', master: '小朱',
    },
  ]

  // 刷新
  handleRefresh() {
    this.$message.success('刷新成功');
  }

  // 删除
  handleDelete() {
    this.$confirm('是否立即删除当前机器人', '禁用提示', {
      type: 'warning',
      showCancelButton: false,
    }).then(() => {
      console.log('confirm');
    });
  }

  handleEdit() {
    Object.assign(this.robotDialog, {
      type: 'edit',
      visible: true,
      data: '',
    });
  }

  handleCreate() {
    Object.assign(this.robotDialog, {
      type: 'create',
      visible: true,
      data: '',
    });
  }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var.less');
  .page-robot-container {
    /deep/ .g-base-layout__head {
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .robot__operation {
      position: absolute;
      right: 20px;
      top: 14px;
    }

    .process__wrapper {
      padding: 0 20px;
      height: 100%;
      overflow: auto;
    }
  }

</style>
