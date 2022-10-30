import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customer-slice";
import ProductArrangeReducer from "./product-arrange-slice";
import favouriteReducer from "./favourite-slice";
import cartReducer from "./cart-slice";

export default configureStore({
  reducer: {
    customer: customerReducer,
    productArrange: ProductArrangeReducer,
    favouriteList: favouriteReducer,
    cartList: cartReducer,
  },
});
