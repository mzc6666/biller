/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 10:13:25
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-15 12:06:07
 */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppRoutes from './src/routes';
import { PersistGate } from 'redux-persist/integration/react'
import store,{persist} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
