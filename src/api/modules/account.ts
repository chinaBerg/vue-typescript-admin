import request from '@/utils/request';

const { VUE_APP_API_KB, VUE_APP_API_BMS } = process.env;

export interface Login {
  account: string;
  password: string;
}

// 登录
export const login = (data: Login): Promise<object> => request({
  url: `${VUE_APP_API_KB}login`,
  method: 'post',
  data,
});

// 退出
export const logout = (): Promise<object> => request({
  url: `${VUE_APP_API_KB}logout`,
  method: 'get',
});

// 获取用户信息
export const getUserInfo = (): Promise<object> => request({
  url: `${VUE_APP_API_KB}loginInfo`,
  method: 'get',
});

// 获取用户信息
export const getConfig = (): Promise<object> => request({
  url: `${VUE_APP_API_BMS}cus/config/get`,
  method: 'get',
});

export const cancelTest = (): Promise<object> => request({
  url: 'http://cronus.dev.1datatech.cn/api/manual-reports/snap/8aaad38072d727680172fb587264007b',
  method: 'get',
});
