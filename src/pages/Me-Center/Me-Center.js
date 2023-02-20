/*
 * @Description: 我的中心 screen
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 23:41:10
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-16 10:46:41
 */
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Alert,
  Pressable,
  View,
} from 'react-native';
import {setToken, logout, clearToken} from '@/store/modules/login';
import {useDispatch} from 'react-redux';
import colors from '@/assets/colors';
import {getBillSummary} from '@/api/modules/bill';
import Icon from '@/components/Icon/Icon';
import {clearAllState} from '@/store';
import axios from 'axios';

const MyCenter = ({navigation}) => {
  const dispatch = useDispatch(); // 触发对象
  const [info, setInfo] = useState(); // 信息

  useEffect(() => {
    let has_exit = false;
    getBillSummary()
      .then(result => {
        if (!has_exit) {
          setInfo(result.data);
        }
      })
      .catch(error => {});
    return () => void (has_exit = true);
  });

  // 退出登录处理
  const handleExit = () => {
    clearAllState(); // 清除缓存
    dispatch(logout()); // 退出登录
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor={colors['blue']} />
      <Pressable style={{flex: 1, backgroundColor: '#FFF'}}>
        {/* 头部总结 */}
        <View
          style={{
            height: 180,
            backgroundColor: colors['blue'],
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}>
          <View style={[styles.view]}>
            <Text style={[styles.moneyText]}>{info?.num_days}</Text>
            <Text>记账总天数</Text>
          </View>
          <View style={[styles.view]}>
            <Text style={[styles.moneyText]}>{info?.num_bills}</Text>
            <Text>记账总笔数</Text>
          </View>
          <View style={[styles.view]}>
            <Text style={[styles.moneyText]}>{info?.balance.toFixed(2)}</Text>
            <Text>余额</Text>
          </View>
        </View>
        {/* 退出 */}
        <Pressable
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: colors['tiny-gray'],
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={handleExit}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon iconCode={'\ue795'} iconStyle={{fontSize: 24}} />
            <Text style={{marginLeft: 16}}>退出</Text>
          </View>
          <Icon iconCode={'\ue641'} iconStyle={{fontSize: 24}} />
        </Pressable>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 27,
    alignItems: 'center',
  },
  moneyText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    marginBottom: 7,
  },
  titleText: {
    color: colors['gray-color'],
    fontSize: 12,
    lineHeight: 18,
  },
});

export default MyCenter;
