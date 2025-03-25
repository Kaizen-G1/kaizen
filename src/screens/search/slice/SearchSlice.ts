import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedApiState } from "../../../services/apiState";
import { ProductPayload } from "../../vendors/product/slice/ProductSlice";
import API_ROUTES from "../../../api/apiRoutes";
import http from "../../../services/httpService";
import { handleApiCall } from "../../../services/reducerUtils";

export interface SearchResponseData {
  message: string;
  products: ProductPayload[];
  page: number;
  limit: number;
}

export interface SearchPayload {
  query?: string;
  subCategoryId?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface SearchState {
  searchList: ExtendedApiState<SearchResponseData>;
  query: SearchPayload;
}

const initialState: SearchState = {
  searchList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  query: {
    query: "",
    subCategoryId: "",
    minPrice: 0,
    maxPrice: 0,
    page: 1,
    limit: 10,
    sortBy: "",
  },
};

export const searchListThunk = createAsyncThunk(
  "search/get",
  async (payload: SearchPayload, { rejectWithValue }) => {
    try {
      // Convert array of subCategoryId to multiple query parameters if it's an array
      const params: any = {
        query: payload.query,
        minPrice: payload.minPrice,
        maxPrice: payload.maxPrice,
        page: payload.page,
        limit: payload.limit,
        sortBy: payload.sortBy,
      };

      // Check if subCategoryId is an array and append each value as a separate param
      if (Array.isArray(payload.subCategoryId)) {
        payload.subCategoryId.forEach((id, index) => {
          params[`subCategoryId[${index}]`] = id;
        });
      } else if (payload.subCategoryId) {
        // If it's a single string, send it normally
        params.subCategoryId = payload.subCategoryId;
      }

      const response = await http.get(API_ROUTES.search.getAll, {
        params,
      });

      const data = await response.data;

      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch products");
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchList",
  initialState,
  reducers: {
    searchListAction: (state) => {
      state.searchList = initialState.searchList;
    },
    searchQueryAction: (state, action) => {
      state.query = action.payload;
    },
    resetQueryAction: (state) => {
      state.query = initialState.query;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchListThunk.pending, (state) => {
        handleApiCall(state.searchList, {}, "loading");
      })
      .addCase(searchListThunk.fulfilled, (state, action) => {
        handleApiCall(state.searchList, action, "success");
        state.searchList.response = action.payload;
      })
      .addCase(searchListThunk.rejected, (state, action) => {
        handleApiCall(state.searchList, { error: action.payload }, "failed");
      });
  },
});

export const { searchListAction, searchQueryAction, resetQueryAction } =
  searchSlice.actions;
export default searchSlice.reducer;
