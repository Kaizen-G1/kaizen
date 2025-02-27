import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { get } from "mongoose";
import { ExtendedApiState } from "../../../services/apiState";
import http from "../../../services/httpService";
import { handleApiCall } from "../../../services/reducerUtils";

export interface CategoryPayload {
  id: string;
  name: string;
  count: number;
  demoImages: string[];
}

export interface CategoryListResponseData {
  message: string;
  categories: CategoryPayload[];
}

export interface CategoryByIdResponseData {
  message: string;
  category: CategoryPayload;
}

interface CategoryState {
  selectedCategory: CategoryPayload;
  categoryList: ExtendedApiState<CategoryListResponseData>;
  categoryById: ExtendedApiState<CategoryByIdResponseData>;
}

const initialState: CategoryState = {
  selectedCategory: {
    id: "",
    name: "",
    count: 0,
    demoImages: [],
  },
  categoryList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  categoryById: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch category list
export const getCategoryThunk = createAsyncThunk(
  "categories/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`/api/v1/company/categories`);
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch categories");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCategoryByIdThunk = createAsyncThunk(
  "categories/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await http.get(`/api/v1/company/categories/${id}`);
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

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<CategoryPayload>) => {
      state.selectedCategory = action.payload;
    },
    resetSelectedCategory: (state) => {
      console.log("resetting selected category");
      state.selectedCategory = initialState.selectedCategory;
      console.log(state.selectedCategory);
    },
    resetCategoryList: (state) => {
      state.categoryList = initialState.categoryList;
    },
    resetCategoryById: (state) => {
      state.categoryById = initialState.categoryById;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch category list
      .addCase(getCategoryThunk.pending, (state) => {
        handleApiCall(state.categoryList, {}, "loading");
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        handleApiCall(state.categoryList, action, "success");
        state.categoryList.response = action.payload;
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        handleApiCall(state.categoryList, { error: action.payload }, "failed");
      })

      // Fetch category by id
      .addCase(getCategoryByIdThunk.pending, (state) => {
        handleApiCall(state.categoryById, {}, "loading");
      })
      .addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
        handleApiCall(state.categoryById, action, "success");
        state.categoryById.response = action.payload;
      })
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        handleApiCall(state.categoryById, { error: action.payload }, "failed");
      });
  },
});

// Export actions
export const {
  setSelectedCategory,
  resetSelectedCategory,
  resetCategoryList,
  resetCategoryById,
} = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;
