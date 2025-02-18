import { ApiResponse, ExtendedApiState } from "../../../../services/apiState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../../config/config";
import { handleApiCall } from "../../../../services/reducerUtils";

export interface VendorProductResponseData {
  message: string;
  product: Object;
}

export interface VendorProductListResponseData {
  message: string;
  products: ProductPayload[];
}

// Product type for the slice state
export interface ProductPayload {
  id?: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  discount: number;
  images: string[];
  costPrice: number;
  lowStockWarning: number;
  category: string;
  unit: string;
  vendorId: string;
}

// Product slice state interface
interface ProductState {
  productSave: ExtendedApiState<VendorProductResponseData>;
  productList: ExtendedApiState<VendorProductListResponseData>;
  productDelete: ExtendedApiState<{ message: string }>; // Added delete state
}

// Initial state
const initialState: ProductState = {
  productSave: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  productList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  productDelete: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch product list
export const getProductThunk = createAsyncThunk(
  "products/productList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/products/productList`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data: ApiResponse = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch products");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Create or update product
export const saveProductThunk = createAsyncThunk(
  "product/save",
  async (payload: ProductPayload, { rejectWithValue }) => {
    try {
      const isUpdate = !!payload.id;
      const endpoint = isUpdate
        ? `${config.API_URL}/api/products/updateProduct/${payload.id}`
        : `${config.API_URL}/api/products/createProduct`;

      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(
          data?.data?.message || data?.message || "Product operation failed"
        );
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete product
export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/products/deleteProductById/${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data: ApiResponse = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete product");
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Reset state for product save (create/update)
    productSaveAction: (state) => {
      state.productSave = initialState.productSave;
    },
    // Reset state for product list
    productListAction: (state) => {
      state.productList = initialState.productList;
    },
    // Reset state for product delete
    productDeleteAction: (state) => {
      state.productDelete = initialState.productDelete;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save (Create/Update) Product
      .addCase(saveProductThunk.pending, (state) => {
        handleApiCall(state.productSave, {}, "loading");
      })
      .addCase(saveProductThunk.fulfilled, (state, action) => {
        handleApiCall(state.productSave, action, "success");
        state.productSave.response = action.payload;
      })
      .addCase(saveProductThunk.rejected, (state, action) => {
        handleApiCall(state.productSave, { error: action.payload }, "failed");
      })

      // Fetch product list
      .addCase(getProductThunk.pending, (state) => {
        handleApiCall(state.productList, {}, "loading");
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        handleApiCall(state.productList, action, "success");
        state.productList.response = action.payload;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        handleApiCall(state.productList, { error: action.payload }, "failed");
      })

      // Delete Product
      .addCase(deleteProductThunk.pending, (state) => {
        handleApiCall(state.productDelete, {}, "loading");
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        handleApiCall(state.productDelete, action, "success");
        state.productDelete.response = action.payload;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        handleApiCall(state.productDelete, { error: action.payload }, "failed");
      });
  },
});

// Action creators
export const { productSaveAction, productListAction, productDeleteAction } =
  productSlice.actions;
export default productSlice.reducer;
