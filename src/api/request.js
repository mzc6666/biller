/*
 * @Description: 基础请求配置
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 15:41:35
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-15 12:35:01
 */
import axios, {AxiosRequestConfig} from 'axios';
import {BASE_URL, DEFAULT_TIMEOUT} from '@/config';
import {useSelector, useDispatch} from 'react-redux';
import {setToken, userLogout} from '@/store/modules/login';
import store from '@/store';

/**
 * @description: 基础的网络请求配置
 * @param { AxiosRequestConfig } config 请求config
 * @return {Promise}
 * @author: mzc
 */
const baseRequest = config => {
  // axios实例
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    request => {
      // 每次请求都添加token
      request.headers.token = store.getState().login.token;
      return request;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    response => {
      // 判断 token 是否已经过期，过期就退出登录

      return response;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance(config);
};

/**
 * @description: get请求
 * @param { AxiosRequestConfig } config 配置
 * @return {*}
 * @author: mzc
 */
export const get = config => {
  return baseRequest({
    method: 'get',
    ...config,
  });
};

/**
 * @description: post请求
 * @param { AxiosRequestConfig } config
 * @return {*}
 * @author: mzc
 */
export const post = config => {
  return baseRequest({
    method: 'post',
    ...config,
  });
};

/**
 * @description: delete请求
 * @param {AxiosRequestConfig} config 配置对象
 * @return {Promise}
 * @author: mzc
 */
export const Delete = config => {
  return baseRequest({
    method: 'delete',
    ...config,
  });
};