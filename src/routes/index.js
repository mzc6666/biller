/*
 * @Description: 页面路由
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 11:04:56
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-27 18:50:53
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  BILL_SCREENS,
  BILL_DETAIL,
  BILL_EDITOR,
  BILL_ADD,
} from './names';
import LoginScreen from '../pages/Login/LoginScreen';
import RegisterScreen from '../pages/Register/RegisterScreen';
import BottomRoutes from './bottom';
import {useSelector} from 'react-redux';
import BillDetail from '@/pages/Bill-Detail/Bill-Detail';
import BillEditor from '@/pages/Bill-Editor/Bill-Editor';
import BillAddScreen from '@/pages/Bill-Add-Screen/Bill-Add-Screen';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const isLogin = useSelector(state => state.login.login);
  console.log('login', isLogin);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLogin ? (
        <>
          <Stack.Screen name={BILL_SCREENS} component={BottomRoutes} />
          <Stack.Screen name={BILL_DETAIL} component={BillDetail} />
          <Stack.Screen name={BILL_EDITOR} component={BillEditor} />
          <Stack.Screen name={BILL_ADD} component={BillAddScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
          <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppRoutes;
