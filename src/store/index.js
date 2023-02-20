/*
 * @Description:  store config
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 13:03:13
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-15 20:30:20
 */
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import loginReducer from './modules/login';
import billsReducer from './modules/bills';
import {createStore, applyMiddleware} from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const config = {
  key: 'root',
  storage,
};

const persist_reducer = persistReducer(
  config,
  combineReducers({
    login: loginReducer,
    bills: billsReducer,
  }),
);

// const store = createStore(persist_reducer, applyMiddleware(thunk));

const store = configureStore({
  reducer: persist_reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// const store = configureStore({
//   reducer: {
//     login: loginReducer,
//     bills: billsReducer,
//   },
// });

export const persist = persistStore(store);

export const clearAllState = () => void persist.purge();

export default store;
