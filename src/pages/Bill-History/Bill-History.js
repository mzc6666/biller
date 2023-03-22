/*
 * @Description: 订单历史
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-14 09:33:19
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-23 20:05:38
 */
import React, {useEffect, useState} from 'react';
import {
  Text,
  Pressable,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  DrawerLayoutAndroid,
  TextInput
} from 'react-native';
import {BILL_DETAIL} from '@/routes/names';
import {selectBills, getListThunk, getAllMoney,setBills} from '@/store/modules/bills';
import {useDispatch, useSelector} from 'react-redux';
import colors from '@/assets/colors';
import {getWeekName} from '@/utils';
import Icon from '@/components/Icon/Icon';
import { getIconCode} from '@/config';
import { RefreshControl } from 'react-native'
import { getBillsByYearAndMonth } from '@/api/modules/bill'
import { windowHeight, windowWidth } from '@/config/devices'
import { useRef } from 'react';
import TimeSelect from './components/TimeSelect'
import HightOrderComponent from '@/components/HighOrderComponent/HighOrderComponent';


const curTime = new Date();
const cur_year = curTime.getFullYear(); // 当前年
const cur_month = curTime.getMonth(); // 当前月(从0 开始)
/**
 * @description: 订单记录 screen
 * @param {*} navigation
 * @return {*}
 * @author: mzc
 */
const BillHistory = ({navigation}) => {
  const dispatch = useDispatch(); // dispatch对象
  const [year, setYear] = useState(cur_year); // 年
  const [month, setMonth] = useState(cur_month); // 月
  const bills = useSelector(selectBills);
  const {pay, earn} = useSelector(getAllMoney); // 当前年和月的总收入、支出
 
  const [refresh, setRefresh] = useState(false);
  const onRefersh = async () => {
    try {
      setRefresh(true)
      const result = await getBillsByYearAndMonth(year,month);
      dispatch(setBills(result.data.data))
    } catch(error) {
      console.log("onRefersh error: ",JSON.stringify(error))
    }
    setRefresh(false)
  }

  useEffect(() => {
    console.log("updated");
    dispatch(getListThunk(year, month));
  }, [month, year]);


  const drawer = useRef(null);
  return (
    <DrawerLayoutAndroid 
    ref={drawer}
    drawerWidth={windowWidth() * 2 / 3}
    renderNavigationView={() => <TimeSelect 
      year={year} 
      setYear={setYear} 
      month={month} 
      setMonth={setMonth}
      refObj = {drawer}
      />}
    drawerPosition="left">
    <Pressable style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar backgroundColor={colors['blue']} />
      {/* 顶部总结 */}
      <View
        style={{
          paddingVertical: 20,
          alignItems: 'center',
          backgroundColor: colors['blue'],
        }}>
        <Text style={styles.header.titleText}>mzc记账</Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <Pressable style={[styles.header.item]} onPress={() => void drawer.current.openDrawer()}>
            <Text style={styles.header.moneyText}>{year + '年'}</Text>
            <Text style={styles.header.smallText}>{(month  + 1) + '月'}</Text>
          </Pressable>
          <View style={styles.header.item}>
            <Text style={[styles.header.moneyText, {color: colors['green']}]}>
              {earn}
            </Text>
            <Text style={styles.header.smallText}>当月收入</Text>
          </View>
          <View style={styles.header.item}>
            <Text
              style={[styles.header.moneyText, {color: colors['danger-red']}]}>
              {pay}
            </Text>
            <Text style={styles.header.smallText}>当月支出</Text>
          </View>
        </View>
      </View>
      {/* 每日数据 */}
      <FlatList
        data={bills}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefersh} />
        }
        renderItem={({item, index}) => {
          let pay = 0,
            earn = 0;
          item.forEach(singleBill => {
            if (singleBill.type === 'pay') {
              pay += singleBill.money;
            } else {
              earn += singleBill.money;
            }
          });
          const dailyBillCount = item.length;
          const index1 = index;
          return (
            <>
              {/* 头部总结 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 6,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text>{item[0].month + 1 + '月' + item[0].day + '日'}</Text>
                  <Text style={{marginLeft: 10}}>
                    {getWeekName(new Date(item[0].time))}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginRight: 6}}>收入: {earn.toFixed(2)}</Text>
                  <Text>支出: {pay.toFixed(2)}</Text>
                </View>
              </View>
              <FlatList
                data={item}
                renderItem={({item, index}) => {
                  const index2 = index;
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate(BILL_DETAIL, {
                          index1,
                          index2,
                        });
                      }}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomColor:
                          index !== dailyBillCount - 1
                            ? colors['tiny-gray']
                            : '#FFF',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          iconStyle={{
                            padding: 6,
                            borderRadius: 6,
                            backgroundColor: '#D7DDE8',
                            color: '#0082c8',
                          }}
                          iconCode={getIconCode(item.tag, item.type).iconCode}
                        />
                        <Text style={{marginLeft: 6}}>{item.name}</Text>
                      </View>
                      <View>
                        <Text>
                          {(item.type === 'pay' ? '-' : '+') +
                            parseFloat(item.money).toFixed(2)}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </>
          );
        }}
        keyExtractor={item => JSON.stringify(item)}
      />
    </Pressable>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  header: {
    titleText: {
      fontSize: 20,
      lineHeight: 30,
      color: '#FFF',
    },
    item: {
      alignItems: 'center',
    },
    moneyText: {
      fontSize: 18,
      lineHeight: 27,
    },
    smallText: {
      fontSize: 12,
      lineHeight: 18,
    },
  },
});

const styles2 = StyleSheet.create({
  modal_content_top: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors['main-font-size-black'],
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  }
})

export default BillHistory;
