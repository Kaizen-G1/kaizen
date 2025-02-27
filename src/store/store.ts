import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../screens/authentication/slice/AuthSlice";
import productReducer from "../screens/vendors/product/slice/ProductSlice";
import orderReducer from "../screens/vendors/home/slice/OrderSlice";
import categoryReducer from "../screens/category/slice/CategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    orders: orderReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
