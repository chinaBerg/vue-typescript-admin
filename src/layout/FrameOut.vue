<template>
  <router-view class="app-container" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'AppFullScreen',
})
export default class extends Vue {
}
</script>

<style lang="less" scoped>
  .app-container {
    height: 100%;
  }
</style>
