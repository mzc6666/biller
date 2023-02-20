/*
 * @Description: 注册 screen
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 12:22:14
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-17 23:41:54
 */
import React, {useState} from 'react';
import {
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {pxToPercent} from '@/utils';
import Button from '@/components/Button';
import {isAccountFormat, isPasswordFormat} from '@/utils';
import {userRegister} from '@/api/modules/user';
import {LOGIN_SCREEN} from '@/routes/names';

/**
 * @description: 注册 screen
 * @param { object } navigation 导航器对象
 * @return {*}
 * @author: mzc
 */
const RegisterScreen = ({navigation}) => {
  /**
   * 注册处理函数
   */
  const handleRegister = async () => {
    console.log(isAccountFormat(account), isPasswordFormat(password));
    if (
      isAccountFormat(account) &&
      isPasswordFormat(password) &&
      password === confirmPass
    ) {
      userRegister(account, password, confirmPass)
        .then(res => {
          if (res.data.status === 'ok') {
            console.log('register', res.data);
            navigation.navigate(LOGIN_SCREEN);
          }
        })
        .catch(err => {});
    }
  };

  const [account, setAccount] = useState(''); // 账号
  const [password, setPassword] = useState(''); //密码
  const [confirmPass, setConfirmPass] = useState(''); // 再次输入密码

  return (
    <Pressable style={{flex: 1}}>
      <ImageBackground
        source={require('@/assets/bg1.png')}
        style={{flex: 1, justifyContent: 'center'}}>
        <TextInput
          placeholder="注册账号"
          textAlign="center"
          textContentType="username"
          style={styles.input}
          value={account}
          onChangeText={setAccount}
        />

        <TextInput
          placeholder="请输入密码"
          textAlign="center"
          style={[
            styles.input,
            {
              marginTop: 30,
            },
          ]}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="请再次输入密码"
          textAlign="center"
          style={[
            styles.input,
            {
              marginTop: 30,
            },
          ]}
          textContentType="password"
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <Button
          title="注册"
          containerStyle={{marginTop: 50}}
          pressHandler={handleRegister}
        />
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 12,
    marginHorizontal: pxToPercent(20),
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
});

export default RegisterScreen;
