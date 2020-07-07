import axios, { Canceler, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import router from '@/router';
import { AccountModule } from '@/store';
import { RESET_TOKEN } from '@/store/mutation-types';
import { Message } from 'element-ui';

interface RequestCancel {
  name: string;
  cancel: Canceler;
}

/**
 * 待取消请求列表
 */
const requestList: RequestCancel[] = [];

/**
 * cancelRequest 取消请求
 * @param { string | number } abortName 如果为string，则取消对应的请求；为空则取消全部
 */
const cancelRequest = (abortName?: string) => {
  if (typeof abortName === undefined) {
    while (requestList.length) {
      const req = requestList.shift();
      if (req) req.cancel();
    }
  } else {
    for (let i = 0; i < requestList.length; i++) {
      if (requestList[i].name === abortName) {
        const similarReq = requestList.splice(i, 1)[0];
        similarReq.cancel('手动取消请求');
        i--;
      }
    }
  }
};

/**
 * 默认的axios请求参数
 */
const defaultConfig: AxiosRequestConfig = {
  timeout: 50000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
};

const service = axios.create(defaultConfig);

// 请求拦截，携带token
service.interceptors.request.use(
  (config) => {
    // 设置请求头Authorization，作为权限验证的标识
    // 也可以自定义其他的请求头
    if (AccountModule.userToken) {
      config.headers.Authorization = AccountModule.userToken;
    }

    // 如果存在重复请求，则Abord掉
    cancelRequest(config.url);

    // 将此次请求推入requestList中，用于后续的Abord
    config.cancelToken = new axios.CancelToken(((cancel) => {
      requestList.push({ name: config.url as string, cancel });
    }));

    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 如果返回的结果是一个流文件，
    // 则不需要判断对应的code，直接返回数据使用
    const contentType = response.headers['content-type'];
    const isStream = contentType.indexOf('application/octet-stream') > -1;
    if (isStream) return response.data;

    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        AccountModule[RESET_TOKEN]();
        Message.error('登录失效，请重新登录！');
        const { fullPath } = router.currentRoute;
        router.push(`/login?redirect=${encodeURIComponent(fullPath)}`);
      }
      return Promise.reject(res.message || '请求发送错误！');
    }
    return response.data.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('已手动取消');
    } else {
      console.log(error);
      Promise.reject(error.message);
    }
  },
);

export default service;

export {
  requestList,
  cancelRequest,
};
