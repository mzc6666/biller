/*
 * @Description: 按钮组件
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 13:43:45
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-15 15:44:34
 */
import colors from '@/assets/colors';
import {pxToPercent} from '@/utils';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

/**
 * @description: 按钮组件
 * @param {string} title 内容
 * @param {Function} pressHandler press的处理函数
 * @param {object} containerStyle 外部容器的样式
 * @param {object} textStyle 内容羊水
 * @return {}
 * @author: mzc
 */
const Button = ({
  title,
  pressHandler = () => {},
  containerStyle = {},
  textStyle = {},
  ...rest
}) => {
  return (
    <Pressable
      style={StyleSheet.flatten([containerStyle, styles.container])}
      onPress={pressHandler}
      {...rest}>
      <Text style={StyleSheet.flatten([textStyle, styles.text])}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors['blue'],
    marginHorizontal: pxToPercent(20),
    paddingVertical: 10,
    borderRadius: 6,
  },
  text: {
    fontSize: 18,
    lineHeight: 27,
    color: '#FFF',
  },
});

export default Button;
