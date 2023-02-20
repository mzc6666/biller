/*
 * @Description: 用户模块 api
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 21:22:04
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-15 14:47:20
 */
import {post} from '../request';

/**
 * @description: 用户登录
 * @param {string} account 账号
 * @param {string} password 密码
 * @return {Promise}
 * @author: mzc
 */
export const userLogin = (account, password) => {
  return post({
    url: '/user/login',
    data: {
      account,
      password,
    },
  });
};

/**
 * @description: 用户注册
 * @param {string} account 账号
 * @param {string} password 密码
 * @param {string} confirmPassword 再次输入密码
 * @return {Promise}
 * @author: mzc
 */
export const userRegister = (account, password, confirmPassword) => {
  return post({
    url: '/user/register',
    data: {
      account,
      password,
      confirmPassword,
    },
  });
};
