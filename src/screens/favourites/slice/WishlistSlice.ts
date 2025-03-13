import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedApiState } from "../../../services/apiState";
import http from "../../../services/httpService";
import { ProductPayload } from "../../vendors/product/slice/ProductSlice";
import { handleApiCall } from "../../../services/reducerUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_ROUTES from "../../../api/apiRoutes";

export interface WishlistResponseData {
  message: string;
  wishList: ProductPayload[];
}

export interface WishlistState {
  wishlist: ExtendedApiState<WishlistResponseData>;
}

const initialState: WishlistState = {
  wishlist: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch wishlist list
export const getWishlistThunk = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const customerId = await AsyncStorage.getItem("vendorId");
      const response = await http.get(API_ROUTES.wishlist.getWishlist(`${customerId}`));
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

// Add to wishlist
export const addToWishlistThunk = createAsyncThunk(
  "wishlist/add",
  async (payload: ProductPayload, { rejectWithValue }) => {
    try {
      const customerId = await AsyncStorage.getItem("vendorId");
      const response = await http.post(API_ROUTES.wishlist.getWishlist(`${customerId}`), {
          productId: payload.id,
        }
      );
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to add to wishlist");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Remove from wishlist

export const removeFromWishlistThunk = createAsyncThunk(
  "wishlist/remove",
  async (payload: ProductPayload, { rejectWithValue }) => {
    try {
      const customerId = await AsyncStorage.getItem("vendorId");
      const response = await http.delete(API_ROUTES.wishlist.getWishlist(`${customerId}`),{
          data: { productId: payload.id },
        }
      );
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to remove from wishlist");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishListAction: (state) => {
      state.wishlist = initialState.wishlist;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist list
      .addCase(getWishlistThunk.pending, (state) => {
        handleApiCall(state.wishlist, {}, "loading");
      })
      .addCase(getWishlistThunk.fulfilled, (state, action) => {
        handleApiCall(state.wishlist, action, "success");
        state.wishlist.response = action.payload;
      })
      .addCase(getWishlistThunk.rejected, (state, action) => {
        handleApiCall(state.wishlist, { error: action.payload }, "failed");
      })

      //   Add to wishlist
      .addCase(addToWishlistThunk.pending, (state) => {
        handleApiCall(state.wishlist, {}, "loading");
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        handleApiCall(state.wishlist, action, "success");
        state.wishlist.response = action.payload;
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        handleApiCall(state.wishlist, { error: action.payload }, "failed");
      })

      //   Remove from wishlist
      .addCase(removeFromWishlistThunk.pending, (state) => {
        handleApiCall(state.wishlist, {}, "loading");
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        handleApiCall(state.wishlist, action, "success");
        state.wishlist.response = action.payload;
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        handleApiCall(state.wishlist, { error: action.payload }, "failed");
      });
  },
});

export const { wishListAction } = wishlistSlice.actions;
export default wishlistSlice.reducer;
