<template>
  <div class="app-container">
    <AppAside />

    <div class="app-main">
      <AppHead/>
      <AppMain />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import AppAside from './components/AppAside.vue';
import AppHead from './components/AppHead.vue';
import AppMain from './components/AppMain.vue';

@Component({
  name: 'AppWrapper',
  components: {
    AppAside,
    AppHead,
    AppMain,
  },
})
export default class extends Vue {
}
</script>

<style lang="less" scoped>
  @import url('../styles/var.less');
  .app-container {
    height: 100%;
  }
  .app-main {
    height: 100%;
    padding-left: 206px;
    background: @primary-bg;
  }
</style>
