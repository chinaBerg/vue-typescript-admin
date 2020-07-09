<template>
  <div class="app-aside flex">
    <div class="app-aside__logo flex-c">
      <router-link to="/" class="flex-c">
        <img src="../../assets/images/common/logo.png" alt="">
        <span class="flex1">RBAC管理系统</span>
      </router-link>
    </div>

    <div class="app-aside__nav flex1 custom-scroll">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="navCollapse"
        background-color="#001225"
        text-color="#909399"
        active-text-color="#fff">
        <el-menu-item index="2">
          <i class="nav__icon el-icon-menu"></i>
          <span slot="title">面板</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="nav__icon el-icon-location"></i>
            <span>组件</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="nav__icon el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AccountModule, AppModule } from '@/store';
import { RouteConfig } from 'vue-router';

@Component({ name: 'AppHead' })
export default class extends Vue {
  private get navCollapse() {
    return AppModule.navCollapse;
  }

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
    width: @aside-width;
    background: #fff;
    flex-direction: column;
    z-index: 99;
    border-right: 1px solid #e5e5e5;
    box-shadow: 0 2px 3px 0 rgba(100,100,100,0.06);
    transition: all .3s linear;
    &--collapse {
      width: 64px;
      .app-aside__logo span {
        display: none;
      }
    }
    .app-aside__logo {
      width: 100%;
      height: @app-head-height;
      flex: @app-head-height 0 0;
      font-size: 20px;
      text-align: center;
      line-height: 64px;
      background: #00284d;
      user-select: none;
      overflow: hidden;
      img {
        height: 40px;
      }
      span {
        color: #fff;
        margin-left: 10px;
        white-space: nowrap;
      }
    }
    .app-aside__nav {
      overflow-y: auto;
      background: #00152a;
      /deep/ .el-menu {
        border-right: 0;
        .el-submenu .el-menu-item {
          padding-left: 46px !important;
          background: #000b17 !important;
        }
        .el-menu-item.is-active {
          background-color: #1990ff !important;
        }
        .nav__icon {
          width: 20px;
          margin-right: 6px;
          font-size: 18px;
        }
      }
    }
  }
</style>
