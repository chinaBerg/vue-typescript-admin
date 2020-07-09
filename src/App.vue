<template>
  <div id="app">
    <component :is="frame" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FrameIn, FrameOut } from '@/layout';

@Component({
  name: 'AppWrapper',
  components: {
    FrameIn,
    FrameOut,
  },
})
export default class extends Vue {
  private get frame() {
    return this.$route.meta.frameIn ? 'frameIn' : 'frameOut';
  }
}
</script>

<style lang="less">

</style>
