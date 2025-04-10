import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedApiState } from "../../../services/apiState";
import { CategoryPayload } from "../../category/slice/CategorySlice";
import { ProductPayload } from "../../vendors/product/slice/ProductSlice";
import http from "../../../services/httpService";
import API_ROUTES from "../../../api/apiRoutes";
import { handleApiCall } from "../../../services/reducerUtils";

export interface BannerPayload {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface CustomerDashboardResponseData {
  message: string;
  dashboard: {
    banners: BannerPayload[];
    categories: CategoryPayload[];
    topProducts: ProductPayload[];
    newItems: ProductPayload[];
    flashSales: ProductPayload[];
    allProducts: ProductPayload[];
  };
}

export interface CustomerDashboardState {
  dashboard: ExtendedApiState<CustomerDashboardResponseData>;
}

const initialState: CustomerDashboardState = {
  dashboard: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch customer dashboard
export const getCustomerDashboardThunk = createAsyncThunk(
  "customerDashboard/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(API_ROUTES.dashboard.get);
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch categories");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const customerDashboardSlice = createSlice({
  name: "customerDashboard",
  initialState,
  reducers: {
    customerDashboardAction: (state) => {
      state.dashboard = initialState.dashboard;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist list
      .addCase(getCustomerDashboardThunk.pending, (state) => {
        handleApiCall(state.dashboard, {}, "loading");
      })
      .addCase(getCustomerDashboardThunk.fulfilled, (state, action) => {
        handleApiCall(state.dashboard, action, "success");
        state.dashboard.response = action.payload;
      })
      .addCase(getCustomerDashboardThunk.rejected, (state, action) => {
        handleApiCall(state.dashboard, { error: action.payload }, "failed");
      });
  },
});

export const { customerDashboardAction } = customerDashboardSlice.actions;
export default customerDashboardSlice.reducer;
