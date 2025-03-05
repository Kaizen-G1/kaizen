import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderRepository from "../data/OrderRepository";
import { Order } from "../data/OrderTypes";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await OrderRepository.fetchOrders();
    } catch (error) {
      return rejectWithValue("Failed to fetch orders");
    }
});

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await OrderRepository.fetchOrderById(orderId);
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
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.selectedOrder = null;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
