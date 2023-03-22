/*
 * @Description: 一些常量
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 14:07:18
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-23 15:58:05
 */
export const UI_WIDTH = 390;

// export const BASE_URL = 'https://mock.apifox.cn/m1/2058362-0-default';
// export const BASE_URL = 'http://10.0.2.2:8888';
export const BASE_URL = 'http://49.234.98.161:8888';

export const DEFAULT_TIMEOUT = 4000;

export const payTagGroup = [
  {
    iconCode: '\ue600',
    text: '约会',
    tag: 'appointment',
  },
  {
    iconCode: '\ue66f',
    text: '数码',
    tag: 'digital',
  },
  {
    iconCode: '\ue612',
    text: '房租',
    tag: 'rent',
  },
  {
    iconCode: '\ue650',
    text: '零食',
    tag: 'snacks',
  },
  {
    iconCode: '\ue613',
    text: '餐饮',
    tag: 'meal',
  },
  {
    iconCode: '\ue60d',
    text: '交通',
    tag: 'transport',
  },
  {
    iconCode: '\ue63a',
    text: '其他',
    tag: 'other',
  },
];

export const earnTagGrup = [
  {
    iconCode: '\ue66e',
    text: '工资',
    tag: 'wage',
  },
  {
    iconCode: '\ue61d',
    text: '兼职',
    tag: 'part-time-job',
  },
  {
    iconCode: '\ue8b0',
    text: '礼金',
    tag: 'gift',
  },
  {
    iconCode: '\ue63a',
    text: '其他',
    tag: 'other',
  },
];

/**
 * 根据 tag 获取 iconCode
 */
export const tagToIconCode = tag =>
  payTagGroup.find(item => {
    return item.tag === tag;
  }) ||
  earnTagGrup.find(item => {
    return item.tag === tag;
  });

export const getIconCode = (tag, type) => {
  console.log(JSON.stringify({tag, type}));
  const searchArr = type === 'earn' ? earnTagGrup : payTagGroup;
  return searchArr.find(tagItem => tagItem.tag === tag);
};
