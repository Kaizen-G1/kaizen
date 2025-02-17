import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../screens/authentication/slice/AuthSlice";
import productReducer from "../screens/vendors/product/slice/ProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
