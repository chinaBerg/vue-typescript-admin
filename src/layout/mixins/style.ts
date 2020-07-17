import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store';
import { MenuConfig } from '@/store/constant';

@Component
export default class extends Vue {
  private get containerStyle() {
    return (type) => ({
      [type]: this.collapseDefault ? MenuConfig.widthCollapse : MenuConfig.width,
    });
  }

  private readonly collapseDefault: boolean = AppModule.navCollapse
}
