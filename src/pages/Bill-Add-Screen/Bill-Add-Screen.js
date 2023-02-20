/*
 * @Description: 添加 账单 screen
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-27 18:48:54
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-17 14:13:04
 */
import colors from '@/assets/colors';
import {earnTagGrup, payTagGroup} from '@/config';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import Icon from '@/components/Icon/Icon';
import {Switch} from '@rneui/themed';
import Button from '@/components/Button';
import {addNewBill} from '@/api/modules/bill';
import {addBill} from '@/store/modules/bills';
import {useDispatch} from 'react-redux';
import {BILL_SCREENS, BILL_HISTORY} from '@/routes/names';

const BillAddScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [classify, setClassify] = useState(''); // 分类
  const [isPayBill, setIsPayBill] = useState(true); // 是否为支出账单
  const [money, setMoney] = useState(''); // 金额
  const [title, setTitle] = useState(''); // 订单名称
  const [description, setDescription] = useState(''); // 订单描述

  const [iconGroup, setIconGroup] = useState(payTagGroup);
  useEffect(() => {
    setIconGroup(isPayBill ? payTagGroup : earnTagGrup);
  }, [isPayBill]);

  const handleAdd = async () => {
    try {
      const result = await addNewBill(
        isPayBill ? 'pay' : 'earn',
        parseFloat(money).toFixed(2),
        classify,
        title,
        description,
      );
      dispatch(addBill(result.data.data));
      navigation.navigate(BILL_SCREENS, {
        screen: BILL_HISTORY,
      });
    } catch (error) {
      console.log('handleAdd error: ', JSON.stringify(error));
    }
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
        {/* 账单类型 */}
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
            keyboardType="numeric"
            placeholder="输入金额数"
            style={{flex: 1}}
            value={money}
            onChangeText={setMoney}
          />
        </View>
        {/* 订单名称 */}
        <View style={styles.item}>
          <Text style={{marginRight: 4}}>订单名称</Text>
          <TextInput
            style={{flex: 1}}
            placeholder="请输入订单的名称"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        {/* 订单描述 */}
        <View style={styles.item}>
          <Text style={{marginRight: 4}}>订单描述</Text>
          <TextInput
            style={{flex: 1}}
            placeholder="请对该账单进行描述"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <Button
          title="确定添加"
          pressHandler={handleAdd}
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

export default BillAddScreen;
