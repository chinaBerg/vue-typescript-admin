<template>
  <el-dialog
    width="700px"
    :title="title"
    :visible.sync="isVisible"
    class="robot__dialog"
    @close="handleClose">
    <el-tabs v-model="tabsActive">
      <el-tab-pane label="基础设置" name="baseSet">
        <el-form :model="baseSetData" class="robot__list" label-width="120px">
          <el-form-item label="许可证类型">
            <el-select v-model="baseSetData.type" placeholder="请选择许可证类型" class="w100">
              <el-option label="桌面机器人" :value="0"></el-option>
              <el-option label="远程机器人" :value="1"></el-option>
              <el-option label="开发机器人" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机器人名称">
            <el-input v-model="baseSetData.name" placeholder="请输入机器人名称"></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input
              v-model="baseSetData.remarks"
              placeholder="请输入备注说明"
              type="textarea">
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="机器人分配" name="selectRobot">
        <el-form :model="selectRobotData" class="robot__list" label-width="120px">
          <el-form-item label="分配方式">
            <el-select v-model="selectRobotData.type" placeholder="请选择分配方式" class="w100">
              <el-option label="单人独占" :value="0"></el-option>
              <el-option label="多人共用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分配员工">
            <el-select
              v-model="selectRobotData.user"
              :multiple="selectRobotData.type === 1"
              filterable
              remote
              reserve-keyword
              placeholder="请分配员工"
              :remote-method="remoteMethod"
              :loading="isLoadingUser"
              style="width: 100%">
              <el-option
                v-for="item in userList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到期自动回收">
            <el-switch v-model="selectRobotData.autoRecover"></el-switch>
          </el-form-item>
          <el-form-item label="自动回收时间">
            <el-date-picker
              v-model="selectRobotData.endTime"
              type="datetime"
              placeholder="选择自动回收时间"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="tc mt20">
      <el-button
        type="primary"
        size="small"
        class="ml10"
        @click="handleSave">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { RobotDialogType } from '../interface';

@Component({
  name: 'ProcessFolderDialog',
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean

  @Prop({ type: String, default: '' }) type!: RobotDialogType

  @Prop({ type: String, default: '' }) data!: string

  private isVisible = this.visible

  private baseSetData = {
    name: '',
    type: '',
    remarks: '',
  }

  private selectRobotData = {
    type: 0,
    user: '',
    autoRecover: true,
    endTime: '',
  }

  private tabsActive = 'baseSet'

  private userList: any = []

  private isLoadingUser = false

  get title() {
    return this.type === 'create' ? '新建机器人' : '编辑机器人';
  }

  @Watch('visible')
  onVisibleChange(n: boolean) {
    this.isVisible = n;
  }

  private handleClose() {
    this.$emit('update:visible', false);
  }

  private handleConfirm() {
    this.handleClose();
  }

  remoteMethod() {
    // 远程搜索
    this.userList = [
      { label: '小李', value: 0 },
      { label: '小红', value: 1 },
      { label: '小刚', value: 2 },
      { label: '小秋', value: 3 },
      { label: '小季', value: 4 },
    ];
  }

  handleSave() {
    this.$message.success('保存成功');
    this.handleClose();
  }
}
</script>

<style lang="less" scoped>
  @import url('../../../../styles/var.less');
  .robot__dialog {
    /deep/ .el-dialog__body {
      padding-top: 0;
    }
  }
</style>
