<template>
  <div class="app-menu__item" v-if="!route.meta.hidden">
    <template v-if="!route.children || !route.children.length">
      <el-menu-item v-if="!route.meta.hidden" :index="route.path">
        <i :class="['nav__icon', route.meta.icon]" v-if="route.meta.icon"></i>
        <span slot="title">{{route.meta.title}}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" popper-append-to-body :index="route.path">
      <template slot="title" v-if="!route.meta.hidden">
        <i :class="['nav__icon', route.meta.icon]" v-if="route.meta.icon"></i>
        <span slot="title" v-show="!collapse">{{route.meta.title}}</span>
      </template>
      <AppMenuItem
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :collapse="collapse"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component({ name: 'AppMenuItem' })
export default class extends Vue {
  @Prop({ type: Object, required: true }) route!: RouteConfig;

  @Prop({ type: Boolean, required: true }) collapse!: boolean;

  // /**
  //  * onMenuItemClick：左侧菜单项的点击事件
  //  * @description 若在当前项，再次点击不跳转；否则跳转对应路由
  //  * @param { RouteConfig } menuItem 菜单项数据
  //  */
  // private onMenuItemClick(menuItem: RouteConfig): void {
  //   if (menuItem.name !== this.$route.name) {
  //     this.$router.push({
  //       name: menuItem.name,
  //     });
  //   }
  // }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var');
</style>
