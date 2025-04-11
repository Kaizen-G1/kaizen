import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API_ROUTES from "../../api/apiRoutes";
import { ExtendedApiState } from "../../services/apiState";
import http from "../../services/httpService";
import { ProductPayload } from "../vendors/product/slice/ProductSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleApiCall } from "../../services/reducerUtils";
import { CartPayload } from "../cart/slice/CartSlice";

export interface OrderPayload {
  customer_id: string;
  products: CartPayload[];
  total_price: number;
}

interface PaymentPayload {
  orderId: string;
}
export interface PaymentResponseData {
  message: string;
  order: OrderPayload[];
}

export interface PaymentState {
  payment: ExtendedApiState<PaymentResponseData>;
}

const initialState: PaymentState = {
  payment: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

export const createOrderThunk = createAsyncThunk(
  "payment/createOrder",
  async (payload: OrderPayload, { rejectWithValue }) => {
    try {
      const customerId = await AsyncStorage.getItem("vendorId");
      const response = await http.post(API_ROUTES.orders.getPayments, {
        customer_id: customerId,
        products: payload.products,
        total_price: payload.total_price,
      });
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to create order");
      }

      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentAction: (state) => {
      state.payment = initialState.payment;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        handleApiCall(state.payment, {}, "loading");
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        handleApiCall(state.payment, action, "success");
        state.payment.response = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        handleApiCall(state.payment, { error: action.payload }, "failed");
      });
  },
});

export const { paymentAction } = paymentSlice.actions;
export default paymentSlice.reducer;
