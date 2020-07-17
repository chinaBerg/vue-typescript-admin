<template>
  <div class="page-dashboard-container">
    Base Form
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TheBaseLayout } from '@/components';
import RobotDialog from './components/RobotDialog.vue';

@Component({
  name: 'FormBase',
  components: {
    TheBaseLayout,
    RobotDialog,
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
