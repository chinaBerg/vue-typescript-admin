<template>
  <div class="app-aside flex">
    <div class="app-aside__logo">RBAC管理系统</div>

    <div class="app-aside__nav flex1" v-if="menuData.length">
      <el-menu
        :default-active="$route.name"
        class="app-nav-wrapper"
        text-color="#333">
        <el-menu-item
          v-for="item in menuData"
          :key="item.name"
          :index="item.name"
          @click="onMenuItemClick(item)">
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AccountModule } from '@/store';
import { RouteConfig } from 'vue-router';

@Component({ name: 'AppHead' })
export default class extends Vue {
  /**
   * menuData 菜单数据
   */
  get menuData(): RouteConfig[] {
    const { currentHeadMenu } = AccountModule;
    if (!currentHeadMenu || !currentHeadMenu.children) return [];
    return currentHeadMenu.children;
  }

  /**
   * onMenuItemClick：左侧菜单项的点击事件
   * @description 若在当前项，再次点击不跳转；否则跳转对应路由
   * @param { RouteConfig } menuItem 菜单项数据
   */
  private onMenuItemClick(menuItem: RouteConfig): void {
    if (menuItem.name !== this.$route.name) {
      this.$router.push({
        name: menuItem.name,
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var');
  .app-aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 206px;
    background: #fff;
    flex-direction: column;
    z-index: 99;
    box-shadow: 2px -4px 10px #d1d2d2;
    .app-aside__logo {
      width: 100%;
      height: @app-head-height;
      flex: @app-head-height 0 0;
      font-size: 22px;
      text-align: center;
      line-height: 64px;
      color: #333;
      img {
        height: 100%;
      }
    }
    .app-aside__nav {
      overflow-y: auto;
    }
    .app-nav-wrapper {
      border: 0;
      /deep/ .el-menu-item  {
        font-size: 16px;
        &:hover, &.is-active {
          color: @primary-color;
          background: linear-gradient(to right, #d3eef5, #2e7ee6);
        }
      }
    }
  }
</style>
