import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiResponse, ExtendedApiState } from "../../services/apiState";
import { ProductPayload } from "../vendors/product/slice/ProductSlice";

export interface WishItemResponseData {
  message: string;
  product: Object;
}

export interface WishItemResponseData {
  message: string;
  products: ProductPayload[];
}

interface WishListState {
  wishListSave: ExtendedApiState<WishItemResponseData>;
  wishList: ExtendedApiState<WishItemResponseData>;
  wishItemDelete: ExtendedApiState<{ message: string }>; // Added delete state
}

const initialState: WishListState = {
  wishListSave: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  wishList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  wishItemDelete: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch wishlist list
export const getWishList = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await fetch(`${config.API_URL}/api/wishlist/id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
