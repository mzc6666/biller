/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 23:49:08
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-27 18:52:59
 */
import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BILL_RECORD, BILL_HISTORY, ME_CENTER, BILL_ADD} from './names';
import colors from '@/assets/colors';
import BillAdd from '@/pages/Bill-Add/Bill-Add';
import BillHistory from '@/pages/Bill-History/Bill-History';
import MyCenter from '@/pages/Me-Center/Me-Center';
import Icon from '@/components/Icon/Icon';

const TabStack = createBottomTabNavigator();

const BottomRoutes = () => {
  return (
    <TabStack.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors['blue'],
        tabBarIcon: ({focused}) => {
          const routeName = route.name;
          if (route.name === BILL_HISTORY) {
            return (
              <Icon
                iconStyle={[
                  styles.iconStyle,
                  {
                    color: focused ? colors['blue'] : colors['gray-color'],
                  },
                ]}
                iconCode={'\ue62c'}
              />
            );
          } else if (route.name === BILL_RECORD) {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate(BILL_ADD);
                }}
                style={{
                  padding: 12,
                  backgroundColor: colors['blue'],
                  borderRadius: 6,
                }}>
                <Icon iconCode={'\ue716'} iconStyle={{color: '#FFF'}} />
              </Pressable>
            );
          } else if (route.name === ME_CENTER) {
            return (
              <Icon
                iconCode={'\ue75d'}
                iconStyle={{
                  color: focused ? colors['blue'] : colors['gray-color'],
                }}
              />
            );
          }
        },
      })}>
      <TabStack.Screen
        name={BILL_HISTORY}
        component={BillHistory}
        options={{
          tabBarLabel: '账单',
          // tabBarIcon: ({focused}) => (
          //   <Icon
          //     iconStyle={[
          //       styles.iconStyle,
          //       {
          //         color: focused ? colors['blue'] : colors['gray-color'],
          //       },
          //     ]}
          //     iconCode={'\ue62c'}
          //   />
          // ),
        }}
      />

      <TabStack.Screen
        name={BILL_RECORD}
        component={BillAdd}
        options={{
          tabBarLabelStyle: {display: 'none'},
          // tabBarIcon: () => (
          //   <View
          //     style={{
          //       padding: 12,
          //       backgroundColor: colors['blue'],
          //       borderRadius: 6,
          //     }}>
          //     <Icon iconCode={'\ue716'} iconStyle={{color: '#FFF'}} />
          //   </View>
          // ),
        }}
      />

      <TabStack.Screen
        name={ME_CENTER}
        component={MyCenter}
        options={{
          tabBarLabel: '我的',
          // tabBarIcon: ({focused}) => (
          //   <Icon
          //     iconCode={'\ue75d'}
          //     iconStyle={{
          //       color: focused ? colors['blue'] : colors['gray-color'],
          //     }}
          //   />
          // ),
        }}
      />
    </TabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 20,
  },
});

export default BottomRoutes;
