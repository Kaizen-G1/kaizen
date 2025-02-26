import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Product {
  product_id: string;
  product_name?: string;
  price?: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string;
  products: Product[];
  total_price: number;
  status: "Pending" | "Awaiting Pickup" | "In transit" | "Complete" | "Cancelled";
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Fetch orders asynchronously
export const getOrdersThunk = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await axios.get(`${config.API_URL}/api/v1/companies/67a40eff40c34d9517f5aef0/orders`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.data.orders;
  } catch (error) {
    return rejectWithValue("Failed to fetch orders");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
