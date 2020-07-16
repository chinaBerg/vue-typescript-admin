import { Falsy } from 'utility-types'
/** 用户Token */
export type UserToken = string | Falsy;

/** 用户详情 */
export interface Userinfo {
  id: number;
  name: string;
  account: string;
  roles: string[];
}
