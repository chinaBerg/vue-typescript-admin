<template>
  <div class="app-aside flex" :style="containerStyle('width')">
    <div class="app-aside__logo flex-c">
      <router-link to="/" class="flex-c">
        <img
          src="@/assets/images/common/logo-big.png"
          class="logo--big"
          alt="logo"
          v-show="!collapse"
        />
        <img
          src="@/assets/images/common/logo.png"
          class="logo"
          alt="logo"
          v-show="collapse"
        />
      </router-link>
    </div>

    <div class="app-aside__nav flex1 custom-scroll">
      <el-menu
        :collapse="collapse"
        :collapse-transition="false"
        :default-active="menuActive"
        router
        class="el-menu-vertical-demo"
        background-color="#001225"
        text-color="#909399"
        active-text-color="#d6ad60">
        <AppMenuItem
          v-for="route in navData"
          :key="route.path"
          :route="route"
          :collapse="collapse"
        />
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AccountModule, AppModule } from '@/store';
import { RouteConfig } from 'vue-router';
import styleMixin from '../mixins/style';
import AppMenuItem from './AppMenuItem.vue';

@Component({
  name: 'AppAside',
  components: {
    AppMenuItem,
  },
})
export default class extends Mixins(styleMixin) {
  /** 菜单状态 */
  private get collapse() {
    return AppModule.navCollapse;
  }

  /**
   * menuData 菜单数据
   */
  private get navData(): RouteConfig[] {
    return AccountModule.userRoutes;
  }

  /** 菜单选中项 */
  private get menuActive() {
    return this.$route.path;
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
    z-index: 99;
    flex-direction: column;
    width: @aside-width;
    background: #00152a;
    box-shadow: 0 2px 9px 2px #3c3d3d;
    .app-aside__logo {
      width: 100%;
      height: @app-head-height;
      flex: @app-head-height 0 0;
      font-size: 20px;
      text-align: center;
      line-height: 64px;
      user-select: none;
      overflow: hidden;
      .logo--big {
        width: 100%;
      }
      .logo {
        width: 80%;
      }
    }
    .app-aside__nav {
      overflow-y: auto;
      /deep/ .el-menu {
        border-right: 0;
        .nav__icon {
          width: 20px;
          margin-right: 6px;
          font-size: 18px;
        }
        .el-submenu__title {
          font-size: 16px;
          .nav__icon {
            font-size: 22px;
          }
        }
        &.el-menu--collapse {
          .nav__icon {
            margin-right: 0;
          }
          .el-submenu__icon-arrow {
            display: none;
          }
          .el-submenu.is-active {
            .el-submenu__title .nav__icon {
              color: #d6ad60;
            }
          }
        }
      }
    }
  }
</style>
