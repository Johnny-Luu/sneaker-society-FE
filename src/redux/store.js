import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import ProductArrangeReducer from "./productArrangeSlice";
import favouriteReducer from "./favouriteSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    customer: customerReducer,
    productArrange: ProductArrangeReducer,
    favouriteList: favouriteReducer,
    cartList: cartReducer,
  },
});
