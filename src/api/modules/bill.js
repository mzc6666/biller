import {Delete, get, post} from '../request';

/*
 * @Description: 账单 api
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-15 13:46:30
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-27 20:04:38
 */

/**
 * @description: 通过年份和月份获取账单列表
 * @param {number} year 年份
 * @param {number} month 月份
 * @return {Promise}
 * @author: mzc
 */
export const getBillsByYearAndMonth = (year, month) => {
  return get({
    url: '/bill',
    params: {
      year,
      month,
    },
  });
};

/**
 * @description: 获取记账总结，即记账日期等信息
 * @return {Promise}
 * @author: mzc
 */
export const getBillSummary = () => {
  return get({
    url: '/bill/userinfo',
  });
};

/**
 * @description: 根据id删除指定的账单
 * @param {number} id 账单id值
 * @return {Promise}
 * @author: mzc
 */
export const deleteBill = id => {
  return Delete({
    url: '/bill',
    params: {
      id,
    },
  });
};

/**
 * @description: 根据 id 修改指定的账单
 * @param {number} id 账单的id
 * @param {object} configObj 账单的信息
 * @return {Promise}
 * @author: mzc
 */
export const changeBill = (id, configObj) => {
  return post({
    url: '/bill/change',
    data: {
      id,
      configObj,
    },
  });
};

/**
 * @description: 添加订单
 * @param {string} type 类型 `pay` / 'earn
 * @param {number} money 金钱数量
 * @param {string} tag 当前账单的标签 如 `other`
 * @param {string} name 名称
 * @param {string} description 描述
 * @return {Promise}
 * @author: mzc
 */
export const addNewBill = (type, money, tag, name, description) => {
  return post({
    url: '/bill/add',
    data: {
      type,
      money,
      tag,
      name,
      description,
    },
  });
};
