<template>
  <div class="app-head">
    <div class="head__toggle ali-c">
      <i :class="iconClasss" @click="toggleNav"></i>
    </div>
    <!-- <el-menu :default-active="currentHeadMenu.name" mode="horizontal">
      <el-menu-item
        v-for="(item, index) in userMenuData"
        :key="index"
        :index="item.name"
        @click="onMenuClick(item)">
        {{item.meta.title}}
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store';
import * as types from '@/store/mutation-types';

@Component({ name: 'AppHead' })
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
  }
</style>
