/*
 * @Description: 查看账单详情
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-17 23:48:47
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-16 20:39:24
 */
import React, {useEffect} from 'react';
import {StyleSheet, Text, StatusBar, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {detailBillSelector, deleteDetailBill} from '@/store/modules/bills';
import colors from '@/assets/colors';
import Icon from '@/components/Icon/Icon';
import {getWeekName} from '@/utils';
import {deleteBill} from '@/api/modules/bill';
import {BILL_SCREENS, BILL_HISTORY, BILL_EDITOR} from '@/routes/names';
import {getIconCode} from '@/config';
import { useState } from 'react';
import { Alert } from 'react-native'
/**
 * @description: 查看订单详情 screen
 * @param {object} navigation 导航器对象
 * @param {object} route 路由对象
 * @return {*}
 * @author: mzc
 */
const BillDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {index1, index2} = route.params;

  const billObj = useSelector(detailBillSelector(index1, index2)) ?? {};
  const [detailBill, setDetailBill] = useState(billObj)
  /**
   * 删除
   */
  const handleDelete = () => {
    Alert.alert('警告','确定删除该账单吗??',[
      {
        text: '取消',
        onPress: () => {},
        style: "cancel"
      },
      {
        text: '确定',
        onPress: async () => {
          try {
            await deleteBill(billObj.id);
            dispatch(deleteDetailBill({index1, index2}));
            navigation.navigate(BILL_SCREENS, {
              screen: BILL_HISTORY,
            });
          } catch (error) {
            console.log(`handleDelete error: `, error);
          }
        },
        style: "destructive"
      }
    ])
  }
  /**
   * 前往编辑页面函数
   */
  const handleEdit = () => {
    navigation.navigate(BILL_EDITOR, {
      index1,
      index2,
    });
  };
  const content = <>
    <Text>DrawerLayoutAndroid</Text>
  </>
  return (
    <>
      <StatusBar backgroundColor={colors['blue']} />
      <View
        style={{
          justifyContent: 'space-between',
          position: 'relative',
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        {/* 上部数据 */}
        <View>
          {/* 顶部 */}
          <View
            style={{
              backgroundColor: colors['blue'],
              paddingVertical: 12,
              alignItems: 'center',
            }}>
            <Icon
              iconCode={getIconCode(detailBill.tag, detailBill.type)?.iconCode}
              iconStyle={{color: '#0082c8'}}
            />
            <Text style={{marginTop: 4}}>
              {getIconCode(detailBill.tag, detailBill.type).text}
            </Text>
          </View>
          {/* 数据渲染 */}
          <View style={styles.item}>
            <Text style={styles.tagText}>类型:</Text>
            <Text style={styles.text}>
              {detailBill.type === 'pay' ? '支出' : '收入'}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.tagText}>金额</Text>
            <Text style={styles.text}> {detailBill.money}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.tagText}>日期</Text>
            <Text style={styles.text}>
              {detailBill.year +
                '年' +
                (detailBill.month + 1) +
                '月' +
                detailBill.day +
                '日' +
                getWeekName(new Date(detailBill.time))}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.tagText}>备注</Text>
            <Text style={styles.text}>{detailBill.name}</Text>
          </View>
        </View>
        {/* 顶部options */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderTopColor: colors['tiny-gray'],
            borderTopWidth: 2,
          }}>
          <Pressable style={styles.optionView} onPress={handleEdit}>
            <Text>编辑</Text>
          </Pressable>
          <Text>|</Text>
          <Pressable style={styles.optionView} onPress={handleDelete}>
            <Text>删除</Text>
          </Pressable>
        </View>
      </View>
      {/* 模态框 */}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    borderBottomColor: colors['tiny-gray'],
    borderBottomWidth: 1,
  },
  tagText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors['gray-color'],
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    marginLeft: 8,
    color: colors['main-font-size-black'],
  },
  optionView: {
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
});

export default BillDetail;
