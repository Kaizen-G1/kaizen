import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderRepository from "../data/OrderRepository";
import { Order } from "../data/OrderTypes";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  totalCompletedAmount: number;
  loading: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  totalCompletedAmount: 0, //initial value would be 0
  loading: false,
  updating: false,
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
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await OrderRepository.fetchOrderById(orderId);
    } catch (error) {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      return await OrderRepository.updateOrderStatus(orderId, status);
    } catch (error) {
      return rejectWithValue("Failed to update order status");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrder(state, action) {
      state.selectedOrder = initialState.selectedOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;

        const completedOrders = action.payload.filter(
          (order) => order.status === "Complete"
        );

        state.totalCompletedAmount = completedOrders.reduce(
          (total, order) => total + order.total_price,
          0
        );
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
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updating = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
        if (state.selectedOrder?.id === updatedOrder.id) {
          state.selectedOrder = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
