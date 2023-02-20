/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-15 14:23:31
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-22 20:39:00
 */

import {useEffect, useState} from 'react';
import {getBillsByYearAndMonth} from '@/api/modules/bill';

/**
 * @description: 根据 年份 和 月份 获取账单列表
 * @param {number} year 年份
 * @param {number} month 月份
 * @return {Array}
 * @author: mzc
 */
export const useBillList = (year, month) => {
  console.log('useBill');
  const [bills, setBills] = useState([]); // 账单列表

  useEffect(() => {
    getBillsByYearAndMonth(year, month)
      .then(result => {
        setBills(result.data.data);
      })
      .catch(() => {
        setBills([]);
      });
  }, [year, month]);

  return bills;
};
