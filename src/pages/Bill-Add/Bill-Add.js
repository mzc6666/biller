/*
 * @Description: 添加账单 scrren 这个screen没有用
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 23:36:40
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-27 18:47:33
 */
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Button} from 'react-native';

const BillAdd = ({}) => {
  console.log('hello,world');
  const [type, setType] = useState(true);
  const [message, setMessage] = useState('ssss');
  const changeType = () => {
    setType(!type);
  };
  const changeMessage = () => {
    setMessage(message + 's');
  };

  useEffect(() => {
    return () => {
      console.log('unmounted');
    };
  });
  return (
    <>
      <Text>{message}</Text>
      <Button title="change type" onPress={changeType} />
      <Button title="change message" onPress={changeMessage} />
    </>
  );
};

const styles = StyleSheet.create({});

export default BillAdd;
