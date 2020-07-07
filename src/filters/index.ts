import Vue from 'vue';
import dayjs from 'dayjs';
import { isFalsy, Falsey } from 'utility-types';
import { DateFormat } from '@/store/constant';

export default {
  install(vm: typeof Vue) {
    // 格式化日期
    vm.filter('formatDate', (t: string | number | Date | Falsey, format = DateFormat.default) => {
      if (isFalsy(t)) return '-';
      return dayjs(t).format(format);
    });
  },
};
