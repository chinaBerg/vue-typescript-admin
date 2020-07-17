<template>
  <div class="page-dashboard-container">
    wrokplace
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Wrokplace',
  components: {
  },
})
export default class extends Vue {
}
</script>

<style lang="less" scoped>
  .page-dashboard-container {
    .dashboard__item {
      padding: 20px;
      margin: 20px;
      background: #fff;
    }
  }
</style>
