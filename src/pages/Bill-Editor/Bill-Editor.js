/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-26 22:39:36
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-23 20:07:07
 */
import colors from '@/assets/colors';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {Switch} from '@rneui/themed';
import {detailBillSelector, setDetailBill} from '@/store/modules/bills';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@/components/Button';
import {earnTagGrup, payTagGroup} from '@/config';
import Icon from '@/components/Icon/Icon';
import {changeBill} from '@/api/modules/bill';
import {BILL_HISTORY, BILL_SCREENS} from '@/routes/names';
/**
 * @description: 编辑页面 screen
 * @param {object} navigation 导航器对象
 * @param {object} route 路由对象
 * @return {*}
 * @author: mzc
 */
const BillEditor = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {index1, index2} = route.params; // 索引
  const bill = useSelector(detailBillSelector(index1, index2)); // 账单信息
  console.log('bill: ', JSON.stringify(bill, null, 2));
  const [isPayBill, setIsPayBill] = useState(
    bill.type === 'pay' ? true : false,
  ); // 是否是花费的订单
  const [money, setMoney] = useState(String(bill.money)); // 金额
  const [title, setTitle] = useState(bill.name); // 账单名称
  const [classify, setClassify] = useState(bill.tag); // 账单的分类
  const [description, setDescription] = useState(bill.description); // 订单描述

  // icon图标
  const [iconGroup, setIconGroup] = useState(
    isPayBill ? payTagGroup : earnTagGrup,
  );
  useEffect(() => {
    setIconGroup(isPayBill ? payTagGroup : earnTagGrup);
  }, [isPayBill]);
  /**
   * 修改账单回调函数
   */
  const changeBillCallback =  () => {
    if (!classify || isNaN(Number(money)) || !title || !description) {
      return;
    }
    changeBill(bill.id, {
        tag: classify,
        type: isPayBill ? 'pay' : 'earn',
        money: parseFloat(money).toFixed(2),
        name: title,
        description,
      }).then(result => {
        dispatch(
          setDetailBill({
            index1,
            index2,
            bill: result.data.data,
          }),
        );
        navigation.navigate(BILL_SCREENS, {
          screen: BILL_HISTORY,
        });
      }).catch(error => {
        console.log('changeBillCallback error: ', error);
      })
  };
  return (
    <>
      <StatusBar backgroundColor={colors['blue']} />
      <Pressable
        style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 20}}>
        {/* 类别 */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 20,
          }}>
          {iconGroup.map((item, index) => (
            <Pressable
              key={index}
              style={{
                width: '25%',
                marginVertical: 12,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setClassify(item.tag);
              }}>
              <Icon
                iconCode={item.iconCode}
                iconStyle={{
                  lineHeight: 30,
                  fontSize: 30,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: '#D7DDE8',
                  color: classify === item.tag ? '#0082c8' : '#bdc3c7',
                }}
              />
              <Text style={{marginTop: 6}}>{item.text}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.item}>
          <Text style={{marginRight: 4}}>类型</Text>
          <Switch
            value={isPayBill}
            onValueChange={value => setIsPayBill(value)}
          />
          <Text>{`(${isPayBill ? '支出' : '收入'})`}</Text>
        </View>
        {/* 金额 */}
        <View style={styles.item}>
          <Text style={{marginRight: 4}}>金额</Text>
          <TextInput
            style={{flex: 1}}
            keyboardType="numeric"
            value={money}
            onChangeText={setMoney}
          />
        </View>
        {/* 订单名称 */}
        <View style={styles.item}>
          <Text style={{marginRight: 4}}>订单名称</Text>
          <TextInput
            style={{flex: 1}}
            placeholder={title}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        {/* 订单描述 */}
        <View style={styles.item}>
          <Text style={{marginRight: 4}}>订单描述</Text>
          <TextInput
            style={{flex: 1}}
            placeholder={description}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <Button
          title="确定修改"
          pressHandler={changeBillCallback}
          containerStyle={{
            marginTop: 20,
          }}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
});

export default BillEditor;
