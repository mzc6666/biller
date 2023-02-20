import React from "react";
import { useState,Ref } from "react";
import { StyleSheet,Text,Pressable, View } from 'react-native'
import { ButtonGroup,Button } from '@rneui/base'
import { useEffect } from "react";
import { getYearList } from '@/utils'

const monthArr = new Array(12).fill(null).map((item,index) => index + 1)

/**
 * @description: 时间选择组件内容
 * @param {number} year 年丰
 * @param {Function} setYear 修改yer的方法
 * @param {number} month 月份
 * @param {Function} setMonth 修改month的方法
 * @param {Ref} refObj Ref对象
 * @return {*}
 * @author: mzc
 */
const TimeSelect = ({year, setYear, month, setMonth,refObj}) => {
  const [y, setY] = useState(year); 
  const [m, setM] = useState(month)
  const yearArr = getYearList(year);
  
  /**
   * 修改函数
   */
  const handleChange = () => {
    setMonth(m);
    setYear(y);
    refObj.current.closeDrawer();
  }
  return <Pressable style={{ flex: 1}}>
    {/* 年份 */}
     <View style={styles.yearContainer}>
        <View style={{paddingHorizontal: 10}}>
        <Button>{year.toString()}</Button>
        </View>
        <Text style={{fontWeight: '500',paddingLeft: 10,paddingVertical: 6}}>选择年份:</Text>
        {new Array(Math.ceil(yearArr.length / 6)).fill(null).map((_,index) => {
          const buttons = yearArr.slice(index * 6, (index + 1) * 6);
          return <ButtonGroup
            key={index}
            selectedIndex={buttons.includes(y) && y - buttons[0]}
            buttons={buttons}
            onPress={value => {
              setY(buttons[0] + value)
            }}
          />
        })}
      </View>
      {/* 月份 */}
    <View style={styles.monthContainer}>
      <Text style={{fontWeight: '500',paddingLeft: 10,paddingVertical: 6}}>选择月份:</Text>
    {new Array(3).fill(null).map((_,index) => {
      return <ButtonGroup 
      key={index}
      selectedIndex={(m >= index * 6 && m < (index + 1) * 6) ? m % 6 : -1}
      onPress={(value) => {
        setM(index*6+value)
      }}
      buttons={monthArr.slice(index * 6, (index + 1) * 6)}
       />
    })}
    </View>
    {/* 按钮组 */}
    <View style={styles.buttonGroup}>
      <Button onPress={handleChange}>修改</Button>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  buttonGroup: {
    padding: 20,
  },
  yearContainer: {
    paddingTop: 30,
    paddingBottom: 15
  },
  monthContainer: {
    paddingVertical: 15
  }
})

export default TimeSelect;