/*
 * @Description: 登录 screen
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 11:12:33
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-23 19:04:26
 */
import React, {useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import Button from '@/components/Button';
import {REGISTER_SCREEN} from '@/routes/names';
import colors from '@/assets/colors';
import {pxToPercent, isAccountFormat, isPasswordFormat} from '@/utils';
import {userLogin} from '@/api/modules/user';
import {setToken, login} from '@/store/modules/login';
import {useDispatch} from 'react-redux';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [account, setAccount] = useState(''); // 账号
  const [password, setPassword] = useState(''); //密码
  /**
   * 登录处理函数
   */
  const handleLogin = async () => {
    if (!isAccountFormat(account) || !isPasswordFormat(password)) {
      return;
    }
    userLogin(account, password)
      .then(result => {
        if (result.data.status === 'ok') {
          console.log(result.data.token);
          dispatch(setToken(result.data.token));
          dispatch(login());
        }
      })
      .catch(err => {
        console.log('userlogin error');
      });
  };

  return (
    <Pressable style={{height: '100%'}}>
      <ImageBackground
        source={require('@/assets/bg1.png')}
        style={{flex: 1, justifyContent: 'center'}}>
        <TextInput
          placeholder="登录账号"
          textAlign="center"
          textContentType="username"
          style={styles.input}
          value={account}
          onChangeText={setAccount}
        />
        <TextInput
          placeholder="登录密码"
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
        <Button
          title="登录"
          containerStyle={{marginTop: 50, marginBottom: 30}}
          pressHandler={handleLogin}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.tagText}>忘记密码</Text>
          <Text style={[styles.tagText, styles.divide]}>|</Text>
          <Text
            style={styles.tagText}
            onPress={() => {
              navigation.navigate(REGISTER_SCREEN);
            }}>
            用户注册
          </Text>
        </View>
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
  tagText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors['gray-color-1'],
  },
  divide: {
    marginHorizontal: pxToPercent(40),
  },
});

export default LoginScreen;
