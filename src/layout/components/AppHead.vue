<template>
  <div class="app-head jus-b ali-c">
    <div class="head__toggle ali-c">
      <i :class="iconClasss" @click="$emit('toggle')"></i>
    </div>

    <div class="head__infos ali-c">
      <div class="head__icon flex-c mr10">
        <i class="el-icon-bell"></i>
      </div>

      <TheScreenfull class="mr10" />

      <el-dropdown placement="bottom-end" @command="handleCommand">
        <div class="head__avator-wrap ali-c">
          <img class="head__avator" src="@/assets/images/temp/head.png" alt="">
          <span>用户名</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-switch-button"
            command="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule, AccountModule } from '@/store';
import { TheScreenfull } from '@/components';
import * as types from '@/store/mutation-types';

@Component({
  name: 'AppHead',
  components: {
    TheScreenfull,
  },
})
export default class extends Vue {
  private activeIndex: string | null = null

  private get navCollapse() {
    return AppModule.navCollapse;
  }

  private get iconClasss() {
    return ['toggle__icon', !this.navCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'];
  }

  private toggleNav() {
    AppModule[types.TOGGLE_COLLAPSE](!this.navCollapse);
  }

  private async handleCommand(command: string) {
    if (command === 'logout') {
      try {
        await AccountModule.logout();
        this.$message.success('退出系统成功！');
        console.log(encodeURIComponent(this.$route.fullPath));
        this.$router.push({
          name: 'Login',
          query: {
            redirect: encodeURIComponent(this.$route.fullPath),
          },
        });
      } catch (error) {
        this.$message.error(error);
      }
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
    box-shadow: 0 2px 3px 0 rgba(100,100,100,0.06);
    z-index: 10;
    .head__toggle {
      height: 100%;
      .toggle__icon {
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 24px;
        user-select: none;
        cursor: pointer;
        color: #6b6b6b;
        &:hover {
          color: @primary-color;
        }
      }
    }
    .head__icon {
      width: 30px;
      height: 30px;
      font-size: 24px;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: @primary-color;
      }
    }

    /* 头像区 */
    .head__avator-wrap {
      cursor: pointer;
      user-select: none;
    }
    .head__avator {
      width: 32px;
      height: 32px;
      margin-right: 6px;
      border: 2px solid #f1f1f1;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
