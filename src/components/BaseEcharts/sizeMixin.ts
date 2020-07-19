import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop({ type: [String, Number], default: '100%' }) width!: string | number

  @Prop({ type: [String, Number], default: '100%' }) height!: string | number

  private get wrapperStyle() {
    return {
      width: this.formatSize(this.width),
      height: this.formatSize(this.height),
    };
  }

  private formatSize(val: string | number) {
    if (typeof val === 'string') return val;
    return `${val}px`;
  }
}
