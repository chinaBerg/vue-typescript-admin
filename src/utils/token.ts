import { Account as AccountInterface } from '@/interface';
import { isFalsy } from 'utility-types';

/**
 * 获取用户token
 */
export const getToken = (): AccountInterface.UserToken => {
  const token = localStorage.getItem('token');
  if (isFalsy(token)) return '';
  return token;
};

/**
 * 设置用户token
 */
export const setToken = (token: AccountInterface.UserToken): void => {
  if (!isFalsy(token)) {
    localStorage.setItem('token', token);
  }
};

/**
 * 重置用户token
 */
export const resetToken = (): void => {
  localStorage.removeItem('token');
};
