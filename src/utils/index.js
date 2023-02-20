/*
 * @Description: 工具函数
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 14:06:11
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-17 00:13:28
 */
import {UI_WIDTH} from '@/config';

/**
 * @description: 根据设计稿将像素调整为百分比
 * @param { number } px 像素
 * @return { string } 百分比字符串
 * @author: mzc
 */
export const pxToPercent = px => `${(px / UI_WIDTH) * 100}%`;

/**
 * @description: 检测是否是账号的格式
 * @param {string} account 账号
 * @return {boolean}
 * @author: mzc
 */
export const isAccountFormat = account => {
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  return reg.test(account);
};

/**
 * @description: 检测是否是密码的格式
 * @param {string} password 密码
 * @return {boolean}
 * @author: mzc
 */
export const isPasswordFormat = password => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{8,16}$/;
  return reg.test(password);
};

/**
 * @description: 返回Date对象的星期字符串 如 `星期天`
 * @param {Date} date Date对象
 * @return {string} 星期字符串
 * @author: mzc
 */
export const getWeekName = date => {
  let str = '星期';
  switch (date.getDay()) {
    case 0:
      str += '天';
      break;
    case 1:
      str += '一';
      break;
    case 2:
      str += '二';
      break;
    case 3:
      str += '三';
      break;
    case 4:
      str += '四';
      break;
    case 5:
      str += '五';
      break;
    case 6:
      str += '六';
      break;
  }
  return str;
};

/**
 * @description: 深克隆函数
 * @param {object} origonObj 被克隆对象
 * @return {object}
 * @author: mzc
 */
export const deepClone = origonObj => {
  const type = typeof origonObj;
  if (['string', 'number', 'boolean'].includes(type)) {
    return origonObj;
  }
  const returnObj = origonObj instanceof Array ? [] : {};
  for (let key in origonObj) {
    if (typeof origonObj[key] !== 'object') {
      returnObj[key] = origonObj[key];
    } else {
      returnObj[key] = deepClone(origonObj[key]);
    }
  }
  return returnObj;
};

const times = 6;

/**
 * @description:  生成滚动选择的年份数组
 * @param {number} year 年份
 * @return {Array}
 * @author: mzc
 */
export const getYearList = (year) => {
  const arr = [];
  new Array(times).fill(null).forEach((item,index) => {
    arr.push(year + index + 1);
    arr.unshift(year - index - 1);
  })
  return arr;
}

/**
 * @description: 生成滚动选择的月份数组
 * @param {number} month
 * @return {Array}
 * @author: mzc
 */
export const getMonthList = (month) => {
  const arr = [];
  arr.push(month + 1)
  for(let i = month; i >= 1; i--) {
    arr.unshift(i)
  }
  for(let i = month + 2; i <= 12; i++) {
    arr.push(i)
  }
  new Array(times).fill(null).forEach(() => {
    new Array(12).fill(null).forEach((_,index) => {
      arr.unshift(12 - index);
      arr.push(index + 1);
    })
  })
  return arr;
}