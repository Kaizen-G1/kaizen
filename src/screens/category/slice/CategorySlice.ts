import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ExtendedApiState } from "../../../services/apiState";
import http from "../../../services/httpService";
import { handleApiCall } from "../../../services/reducerUtils";
import API_ROUTES from "../../../api/apiRoutes";

export interface CategoryPayload {
  id: string;
  name: string;
  count: number;
  demoImages: string[];
  subcategories?: SubCategoryPayload[];
}

export interface SubCategoryPayload {
  id: string;
  name: string;
}

export interface CategoryWithSubCategoriesPayload {
  id: string;
  name: string;
  count: number;
  subcategories: SubCategoryPayload[];
}

export interface CategoryListResponseData {
  message: string;
  categories: CategoryPayload[];
}

export interface SubCategoryListResponseData {
  message: string;
  categories: SubCategoryPayload[];
}

export interface CategoryWithSubCategoriesListResponseData {
  message: string;
  categories: CategoryWithSubCategoriesPayload[];
}

export interface CategoryByIdResponseData {
  message: string;
  category: CategoryPayload;
}

interface CategoryState {
  selectedCategory: CategoryPayload;
  selectedSubCategory: SubCategoryPayload;
  categoryList: ExtendedApiState<CategoryListResponseData>;
  subCategoryList: ExtendedApiState<SubCategoryListResponseData>;
  categoryById: ExtendedApiState<CategoryByIdResponseData>;
  categoryWithSubCategoriesList: ExtendedApiState<CategoryWithSubCategoriesListResponseData>;
}

const initialState: CategoryState = {
  selectedCategory: {
    id: "",
    name: "",
    count: 0,
    demoImages: [],
  },
  selectedSubCategory: {
    id: "",
    name: "",
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
  categoryWithSubCategoriesList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  subCategoryList: {
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
      const response = await http.get(API_ROUTES.categories.getAll);
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

// Fetch subcategory list
export const getAllSubcategoriesThunk = createAsyncThunk(
  "subcategories/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(
        API_ROUTES.categories.getAllSubcategories
      );
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch subcategories");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk to fetch categories with subcategories
export const getCategoriesWithSubcategoriesThunk = createAsyncThunk(
  "categories/getWithSubcategories",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching categories with subcategories");
      const response = await http.get(
        API_ROUTES.categories.getWithSubcategories
      );
      // console.log(response.data.data.categories);
      return response.data; // Adjusted to match response structure
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getCategoryByIdThunk = createAsyncThunk(
  "categories/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await http.get(API_ROUTES.categories.getById(id));
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
    setSelectedSubCategory: (
      state,
      action: PayloadAction<SubCategoryPayload>
    ) => {
      state.selectedSubCategory = action.payload;
    },
    resetSelectedCategory: (state) => {
      console.log("resetting selected category");
      state.selectedCategory = initialState.selectedCategory;
      state.selectedSubCategory = initialState.selectedSubCategory;
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

      // Fetch subcategory list
      .addCase(getAllSubcategoriesThunk.pending, (state) => {
        handleApiCall(state.subCategoryList, {}, "loading");
      })
      .addCase(getAllSubcategoriesThunk.fulfilled, (state, action) => {
        handleApiCall(state.subCategoryList, action, "success");
        state.subCategoryList.response = action.payload;
      })
      .addCase(getAllSubcategoriesThunk.rejected, (state, action) => {
        handleApiCall(
          state.subCategoryList,
          { error: action.payload },
          "failed"
        );
      })

      .addCase(getCategoriesWithSubcategoriesThunk.pending, (state) => {
        handleApiCall(state.categoryWithSubCategoriesList, {}, "loading");
      })
      .addCase(
        getCategoriesWithSubcategoriesThunk.fulfilled,
        (state, action) => {
          handleApiCall(state.categoryWithSubCategoriesList, action, "success");
          state.categoryWithSubCategoriesList.response = action.payload;
        }
      )
      .addCase(
        getCategoriesWithSubcategoriesThunk.rejected,
        (state, action) => {
          handleApiCall(
            state.categoryWithSubCategoriesList,
            { error: action.payload },
            "failed"
          );
        }
      )

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
  setSelectedSubCategory,
  resetSelectedCategory,
  resetCategoryList,
  resetCategoryById,
} = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;
