<template>
  <el-tree
    :data="folderData"
    default-expand-all
    class="process__folder"
    @node-contextmenu="handleNodeContextmenu">
    <template slot-scope="{ node, data }">
      <el-popover
        :offset="-8"
        placement="right-start"
        width="200"
        trigger="manual"
        popper-class="folder__context-wrapper"
        v-model="data.isContextMenu">
        <ul>
          <li
            v-for="(item, index) in contextMenu"
            :key="index"
            :class="['folder__context-item', {'is-disabled': item.disabled}]"
            @click="handleCtxMenuClick(item)">
            {{item.name}}
          </li>
        </ul>
        <div class="custom__node ali-c" slot="reference">
          <i class="custom__node-icon el-icon-folder-add" v-show="!node.expanded"></i>
          <i class="custom__node-icon el-icon-folder-remove" v-show="node.expanded"></i>
          <span>{{ node.label }}</span>
        </div>
      </el-popover>
    </template>
  </el-tree>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { on, off } from '@/utils/dom';

@Component({
  name: 'TheBaseLayout',
})
export default class extends Vue {
  @Prop({ type: String, default: 'auto' }) overflow!: Pick<CSSStyleDeclaration, 'overflow'>

  private curCtxMenu: any = null

  private contextMenu = [
    { name: '新建子文件夹', code: 'create', disabled: false },
    { name: '剪切', code: 'cut', disabled: true },
    { name: '复制', code: 'copy', disabled: true },
    { name: '粘贴', code: 'paste', disabled: true },
    { name: '重命名', code: 'rename', disabled: false },
    { name: '删除', code: 'delete', disabled: false },
    { name: '访问权限设置', code: 'set', disabled: false },
  ]

  private folderData = [
    {
      label: '团队流程文件夹',
      id: 1,
      children: [{
        label: '团队流程文件夹1',
        id: 2,
      }, {
        label: '团队流程文件夹2',
        id: 3,
        children: [{
          label: '三级 1-1-1',
          id: 4,
        }],
      }],
    },
    {
      label: '样例流程文件夹',
      children: [{
        label: '人力资源管理流程',
        children: [{
          label: '三级 1-1-1',
        }],
      }, {
        label: '财务专用流程',
        children: [{
          label: '三级 1-1-1',
        }],
      }],
    },
  ]

  get styles() {
    return {
      overflow: this.overflow,
    };
  }

  private mounted() {
    on(window, 'click', this.cancelCtxMenu);
    this.$once('hook:beforeDestroy', () => off(window, 'click', this.cancelCtxMenu));
  }

  /**
   * 隐藏右键的菜单
   */
  private cancelCtxMenu() {
    if (this.curCtxMenu && this.curCtxMenu.isContextMenu) {
      this.$set(this.curCtxMenu, 'isContextMenu', false);
      this.curCtxMenu = null;
    }
  }

  private handleNodeContextmenu() {
    const [event, data] = arguments;
    this.cancelCtxMenu();
    this.$set(data, 'isContextMenu', true);
    this.curCtxMenu = data;
    this.$emit('node-contextmenu', data, event);
  }

  private handleCtxMenuClick(item) {
    this.cancelCtxMenu();
    this.$emit('on-ctx-menu-click', item);
  }
}
</script>

<style lang="less">
  @import url('../../styles/var');
  .process__folder {
    /deep/ .el-tree-node__content {
      height: 36px;
      .el-tree-node__expand-icon {
        display: none;
      }
      .custom__node {
        padding: 0 12px;
        outline: none;
        &-icon {
          width: 18px;
          height: 18px;
          margin-right: 6px;
          font-size: 17px;
        }
      }
    }
  }
  .folder__context-wrapper {
    width: 150px !important;
    padding: 4px 0 !important;
    .folder__context-item {
      height: 28px;
      padding: 0 18px;
      line-height: 28px;
      cursor: pointer;
      user-select: none;
      &.is-disabled {
        color: #bdbdbd;
        cursor: not-allowed;
      }
      &:hover:not(.is-disabled) {
        color: @primary-color;
        background-color: #e8e8e8;
        background-image: -webkit-linear-gradient(top,#f5f5f5 0,#e8e8e8 100%);
        background-image: -o-linear-gradient(top,#f5f5f5 0,#e8e8e8 100%);
        background-image: -webkit-gradient(linear,left top,left bottom,from(#f5f5f5),to(#e8e8e8));
        background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(
          startColorstr='#fff5f5f5', endColorstr='#ffe8e8e8', GradientType=0
        );
        background-repeat: repeat-x;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
