import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedApiState } from "../../../services/apiState";
import { ProductPayload } from "../../vendors/product/slice/ProductSlice";
import API_ROUTES from "../../../api/apiRoutes";
import http from "../../../services/httpService";
import { handleApiCall } from "../../../services/reducerUtils";

export interface FlashSalePayload {
  productId: string;
  flashSaleStartDate: Date;
  flashSaleEndDate: Date;
  flashSalePrice: number;
  flashSaleStock: number;
}

export interface FlashSaleResponseData {
  message: string;
  products: ProductPayload[];
  timeLeft: number;
}

export interface FlashSaleState {
  flashSaleList: ExtendedApiState<FlashSaleResponseData>;
}

const initialState: FlashSaleState = {
  flashSaleList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

export const enabaleFlashSale = createAsyncThunk(
  "flashSale/enable",
  async (payload: FlashSalePayload, { rejectWithValue }) => {
    try {
      const response = await http.post(
        API_ROUTES.flashSale.enable(`${payload.productId}`),
        {
          flashSaleStartDate: payload.flashSaleStartDate,
          flashSaleEndDate: payload.flashSaleEndDate,
          flashSalePrice: payload.flashSalePrice,
          flashSaleStock: payload.flashSaleStock,
        }
      );
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to enable flash sale");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const disableFlashSale = createAsyncThunk(
  "flashSale/disable",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await http.post(
        API_ROUTES.flashSale.disable(`${productId}`)
      );
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to disable flash sale");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getFlashSaleListThunk = createAsyncThunk(
  "flashSale/get",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching flash sale list");
      const response = await http.get(API_ROUTES.flashSale.getAll);
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch flash sale list");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const flashSaleSlice = createSlice({
  name: "flashSale",
  initialState,
  reducers: {
    flashSaleListAction: (state) => {
      state.flashSaleList = initialState.flashSaleList;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch flash sale list
      .addCase(getFlashSaleListThunk.pending, (state) => {
        handleApiCall(state.flashSaleList, {}, "loading");
      })
      .addCase(getFlashSaleListThunk.fulfilled, (state, action) => {
        handleApiCall(state.flashSaleList, action, "success");
        state.flashSaleList.response = action.payload;
      })
      .addCase(getFlashSaleListThunk.rejected, (state, action) => {
        handleApiCall(state.flashSaleList, { error: action.payload }, "failed");
      })

      // enable flash sale
      .addCase(enabaleFlashSale.pending, (state) => {
        handleApiCall(state.flashSaleList, {}, "loading");
      })
      .addCase(enabaleFlashSale.fulfilled, (state, action) => {
        handleApiCall(state.flashSaleList, action, "success");
        state.flashSaleList.response = action.payload;
      })
      .addCase(enabaleFlashSale.rejected, (state, action) => {
        handleApiCall(state.flashSaleList, { error: action.payload }, "failed");
      })

      // disable flash sale
      .addCase(disableFlashSale.pending, (state) => {
        handleApiCall(state.flashSaleList, {}, "loading");
      })
      .addCase(disableFlashSale.fulfilled, (state, action) => {
        handleApiCall(state.flashSaleList, action, "success");
        state.flashSaleList.response = action.payload;
      })
      .addCase(disableFlashSale.rejected, (state, action) => {
        handleApiCall(state.flashSaleList, { error: action.payload }, "failed");
      });
  },
});

export const { flashSaleListAction } = flashSaleSlice.actions;

export default flashSaleSlice.reducer;
