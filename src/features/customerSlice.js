import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
  },
  reducers: {
    login: (state, action) => {
      state.customer = action.payload;
    },

    logout: (state) => {
      state.customer = null;
    },

    update: (state, action) => {
      state.customer.name = action.payload.name;
      state.customer.gender = action.payload.gender;
      state.customer.address = action.payload.address;
      state.customer.phone = action.payload.phone;
    },
  },
});

export const { login, logout, update } = customerSlice.actions;
export const selectCustomer = (state) => state.customer.customer;
export default customerSlice.reducer;
