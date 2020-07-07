import request from '@/utils/request';

const { VUE_APP_API_KB, VUE_APP_API_BMS } = process.env;

export interface LabelParams {
  defCategoryLevel1Id: number;
  defCategoryLevel2Id: number;
}

// 获取方案分类的列表数据
export const getSchemas = (): Promise<object> => request({
  url: `${VUE_APP_API_KB}monitorGroup/list/tree`,
  method: 'get',
});

// 获取用户的标签数据
export const getLabels = (data: LabelParams): Promise<object> => request({
  url: `${VUE_APP_API_BMS}label/list/tree`,
  method: 'post',
  data,
});

// 获取电商平台列表
export const getPlatforms = (): Promise<object> => request({
  url: `${VUE_APP_API_BMS}sys/platform/list`,
  method: 'get',
});

// 获取产品品类的数据
export const getClassifies = (): Promise<object> => request({
  url: `${VUE_APP_API_BMS}cus/category/tree`,
  method: 'get',
});
