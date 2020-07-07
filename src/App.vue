<template>
  <div id="app">
    <component :is="frame" v-if="isRoutesGenerated" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FrameIn, FrameOut } from '@/layout';
import { AccountModule } from '@/store';

@Component({
  name: 'AppWrapper',
  components: {
    FrameIn,
    FrameOut,
  },
})
export default class extends Vue {
  get isRoutesGenerated() {
    return AccountModule.isRoutesGenerated;
  }

  private get frame() {
    return this.$route.meta.frameIn ? 'frameIn' : 'frameOut';
  }
}
</script>

<style lang="less">

</style>
