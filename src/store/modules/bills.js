/*
 * @Description: 账单相关数据
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-17 23:52:36
 * @LastEditors: mzc
 * @LastEditTime: 2023-02-18 10:23:36
 */
import {createSlice} from '@reduxjs/toolkit';
import {
  getBillsByYearAndMonth,
  deleteBill,
  changeBill,
  addNewBill,
} from '@/api/modules/bill';
import {deepClone} from '@/utils';

const billsSlice = createSlice({
  name: 'bills',
  initialState: {
    bills: [], // 总账单
    error: '',
  },
  reducers: {
    setBills(state, action) {
      state.bills = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    deleteDetailBill(state, action) {
      state.bills[action.payload.index1].splice(action.payload.index2, 1);
      if (state.bills[action.payload.index1].length === 0) {
        state.bills.splice(action.payload.index1, 1);
      }
    },
    setDetailBill(state, action) {
      state.bills[action.payload.index1][action.payload.index2] = action.payload.bill;
    },
    addBill(state, action) {
      const bills = state.bills;
      if (bills.length === 0 || bills[0][0].day !== action.payload.day) {
        bills.unshift([action.payload]);
      } else {
        bills[0].unshift(action.payload);
      }
    },
  },
});

/**
 * selector function to select bill array
 */
export const selectBills = state => state.bills.bills;

/**
 * selector function to select detail bill
 */
export const detailBillSelector = (index1, index2) => state => {
  return state.bills.bills?.[index1]?.[index2] ?? {};
};

/**
 * selector function to get all pay money and all earn money
 */
export const getAllMoney = state => {
  let pay = 0,
    earn = 0;
  for (let i = 0; i < state.bills.bills.length; i++) {
    for (let j = 0; j < state.bills.bills[i].length; j++) {
      switch (state.bills.bills[i][j].type) {
        case 'earn':
          earn += state.bills.bills[i][j].money;
          break;
        case 'pay':
          pay += state.bills.bills[i][j].money;
          break;
        default:
          break;
      }
    }
  }
  return {pay, earn};
};

export const {setBills, deleteDetailBill, setDetailBill, addBill, setError} =
  billsSlice.actions;

/**
 * 获取账单记录thunk
 */
export const getListThunk = (year, month) => async (dispatch, getState) => {
  try {
    console.log('before year: ', year, 'month: ', month);
    const result = await getBillsByYearAndMonth(year, month);
    console.log('after year: ', year, 'month: ', month);
    console.log('network lists: ', result.data.data);
    dispatch(setBills(result.data.data));
  } catch (error) {
    dispatch(setError(true))
  }
};

/**
 * 添加 thunk
 */
export const addBillThunk =
  (type, money, tag, name, description) => async (dispatch, getState) => {
    try {
      const result = await addNewBill(type, money, tag, name, description);
      dispatch(addBill(result.data.data));
      console.log('addNewBill result: ', result.data.data);
    } catch (error) {
      console.log('addBillThunk error: ', error);
    }
  };

export default billsSlice.reducer;
