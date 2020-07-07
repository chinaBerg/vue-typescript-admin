import dayjs from 'dayjs';

export type ITimeTabType = 'all' | 'custom' | 'today' | 'past24h' | 'yesterday' | 'past7d' | 'past30d'

/*  @name getPastTimestamp
 *  @description 获取时间段的时间戳表示
 *  @param { String } time 今天、近24小时、昨天、近七天、近30天
 *  @return { Array } 返回对应时间区间的时间戳表示
 */
export function getPastTimestamp(time: ITimeTabType) {
  let end: dayjs.ConfigType = Date.now();
  let start: dayjs.ConfigType = Date.now();
  switch (time) {
    case 'today':
      start = dayjs().format('YYYY-MM-DD 00:00:00');
      break;
    case 'past24h':
      start = dayjs().subtract(1, 'day');
      break;
    case 'yesterday':
      start = dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00');
      end = dayjs().format('YYYY-MM-DD 00:00:00');
      break;
    case 'past7d':
      start = dayjs().subtract(7, 'day');
      break;
    case 'past30d':
      start = dayjs().subtract(30, 'day');
      break;
    default:
      return [];
  }
  return [dayjs(start).valueOf(), dayjs(end).valueOf()];
}

// 截取n位的时间戳，默认截取10位
export function sliceTimestamp(t: Date | string | number, len = 10) {
  const time: any = new Date(t);
  return Number(Date.parse(time).toString().slice(0, len));
}

/**
 * @method calcTimeLevel 计算时间区间
 * @params { Number } 时间戳的差值
 * @return
 *  0: <= 72h
 *  1: 72h < t <= 60day
 *  2: > 60day
 */
const calcTimeLevel = (t: number) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const THREE_DAY = ONE_DAY * 3;
  const SIXTY_DAY = ONE_DAY * 60;
  const ONE_YEAR = ONE_DAY * 365 * 3;
  if (t <= THREE_DAY) return 0;
  if (t > THREE_DAY && t <= SIXTY_DAY) return 1;
  if (t > ONE_YEAR) return 3;
  return 2;
};

// 判断声量趋势图x坐标的显示类型，
type ITime = string | number | Date
export const formatLineChartsTime = (time: ITime, startTime: ITime, endTime: ITime) => {
  const st = (new Date(startTime)).getTime();
  const et = (new Date(endTime)).getTime();
  const type = calcTimeLevel(et - st);
  const dataMaps = {
    0: 'MM-DD HH:mm',
    1: 'MM-DD',
    2: 'YYYY-MM',
    3: 'YYYY',
  };
  return dayjs(time).format(dataMaps[type] || 'YYYY-MM-DD HH:mm');
};
