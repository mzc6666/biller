/*
 * @Description: user slice
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 13:04:15
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-17 20:48:28
 */
import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    token: '',
  },
  reducers: {
    login(state) {
      state.login = true;
    },
    logout(state) {
      state.login = false;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = '';
    },
  },
});

export const {login, logout, setToken, clearToken} = loginSlice.actions;

export default loginSlice.reducer;
