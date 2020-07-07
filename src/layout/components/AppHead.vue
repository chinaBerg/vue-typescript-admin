<template>
  <div class="app-head">
    <el-menu :default-active="currentHeadMenu.name" mode="horizontal">
      <el-menu-item
        v-for="(item, index) in userMenuData"
        :key="index"
        :index="item.name"
        @click="onMenuClick(item)">
        {{item.meta.title}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { AccountModule } from '@/store';
import { SET_CURRENT_HEAD_MENU } from '@/store/mutation-types';

@Component({ name: 'AppHead' })
export default class extends Vue {
  private activeIndex: string | null = null

  get userMenuData() {
    return AccountModule.menuData;
  }

  get currentHeadMenu() {
    if (!AccountModule.currentHeadMenu) return {};
    return AccountModule.currentHeadMenu;
  }

  private onMenuClick(menu) {
    AccountModule[SET_CURRENT_HEAD_MENU](menu.name);
  }

  @Watch('$route', { immediate: true })
  onRouteChange() {
    const { matched } = this.$route;
    const [matchedLevel1Menu] = matched;
    if (matchedLevel1Menu) {
      AccountModule[SET_CURRENT_HEAD_MENU](matchedLevel1Menu.name as string);
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var');
  .app-head {
    position: relative;
    height: @app-head-height;
    padding: 0 14px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    z-index: 10;
    /deep/ .el-menu-item {
      font-size: 18px;
      color: #333;
      &.is-active {
        color: @primary-color !important;
        background: @primary-bg !important;
      }
      &:hover {
        color: @primary-color !important;
      }
    }
  }
</style>
