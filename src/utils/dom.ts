/**
 * @method formatUiSize
 * @description 根据参数类型格式化为尺寸单位。
 * - 如果是字符串则直接返回
 * - 如果是数字，则加上px单位
 * @returns 返回尺寸大小，eg：200px，'50%'
 */
export const formatUiSize = (val: string | number): string | number => (typeof val === 'number'
  ? `${val}px`
  : val);

/**
 * @method setStyle
 * @description 设置dom的样式
 */
// export const setStyle = (dom: HTMLElement, styles: {[prop: string]: string | number} = {}) => {
//   for (const prop in styles) {
//     if (styles.hasOwnProperty(prop)) {
//       dom.style[prop] = styles[prop];
//     }
//   }
// };

/** 事件监听函数 */
export const on = (
  dom: EventTarget,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
  use = false,
): void => {
  dom.addEventListener(eventName, callback, use);
};

/** 移除事件监听 */
export const off = (
  dom: EventTarget,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
  use = false,
): void => {
  dom.removeEventListener(eventName, callback, use);
};

/** 劫持窗口离开 */
export const hijackWindowLeave = (event: Event, isTip = true): any => {
  if (isTip) {
    const e = (event || window.event) as Event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) e.returnValue = true;
    return '关闭提示';
  }
};
