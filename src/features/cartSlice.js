import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
     name: 'cartList',
     initialState: {
          cartList: null
     },
     reducers: {
          initCartList: (state, action) => {
               state.cartList = action.payload;
          },

          addCartItemToRedux: (state, action) => {
               state.cartList = [...state.cartList || [], action.payload];
          },

          removeCartItemFromRedux: (state, action) => {
               state.cartList = state.cartList.filter(item => item !== action.payload);
          },

          clearCartList: (state) => {
               state.cartList = [];
          }
     }
});

export const { initCartList, addCartItemToRedux, removeCartItemFromRedux, clearCartList } = cartSlice.actions;
export const selectCartList = state => state.cartList.cartList;
export default cartSlice.reducer;