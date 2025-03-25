import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../screens/authentication/slice/AuthSlice";
import productReducer from "../screens/vendors/product/slice/ProductSlice";
import orderReducer from "../screens/vendors/home/slice/OrderSlice";
import categoryReducer from "../screens/category/slice/CategorySlice";
import wishlistReducer from "../screens/favourites/slice/WishlistSlice";
import vendorSlice from "../screens/vendors/vendordetails/slice/VendorSlice";
import cartReducer from "../screens/cart/slice/CartSlice";
import notificationReducer from "../screens/notifcations/slice/NotificatiosSlice";
import searchReducer from "../screens/search/slice/SearchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    orders: orderReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    vendor: vendorSlice,
    cart: cartReducer,
    notifications: notificationReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
