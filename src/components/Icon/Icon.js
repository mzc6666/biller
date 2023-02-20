/*
 * @Description: iconfont组件
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-13 00:33:41
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-16 11:01:30
 */
import React from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * @description: iconfont组件
 * @param { string } iconCode unicode代码
 * @param { object } iconStyle 样式对象
 * @param {Array} rest
 * @return {*}
 * @author: mzc
 */
const Icon = ({iconCode, iconStyle = {}, ...rest}) => {
  return (
    <Text style={StyleSheet.flatten([styles.icon, iconStyle])} {...rest}>
      {iconCode}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
    fontSize: 20,
    lineHeight: 20,
  },
});

export default Icon;
