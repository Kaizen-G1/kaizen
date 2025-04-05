import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExtendedApiState } from "../../../services/apiState";
import http from "../../../services/httpService";
import { handleApiCall } from "../../../services/reducerUtils";
import { ProductPayload } from "../../vendors/product/slice/ProductSlice";
import API_ROUTES from "../../../api/apiRoutes";

export interface CartPayload {
  id?: string;
  customerId: string;
  productId: string;
  quantity: number;
  status: string;
  product: ProductPayload;
}

export interface AddCartResponseData {
  message: string;
  cart: CartPayload;
}

export interface CartListResponseData {
  message: string;
  cart: CartPayload[];
}

interface CartState {
  cartSave: ExtendedApiState<AddCartResponseData>;
  cartList: ExtendedApiState<CartListResponseData>;
  cartDelete: ExtendedApiState<{ message: string }>;
  subTotal: number;
}

const initialState: CartState = {
  cartSave: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  cartList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  cartDelete: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  subTotal: 0.0,
};

// Fetch cart list
export const getCartThunk = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const queryParams = {
        customerId: await AsyncStorage.getItem("vendorId"),
      };
      const response = await http.get(API_ROUTES.shoppingCart.getCartList, {
        params: queryParams,
      });
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

// Add to cart
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (payload: CartPayload, { rejectWithValue }) => {
    try {
      const response = await http.post(API_ROUTES.shoppingCart.addToCart, {
        customerId: payload.customerId,
        productId: payload.productId,
        quantity: payload.quantity,
      });
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to add to cart");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete from cart
export const deleteFromCartThunk = createAsyncThunk(
  "cart/delete",
  async (payload: CartPayload, { rejectWithValue }) => {
    try {
      const response = await http.delete(
        API_ROUTES.shoppingCart.delete(payload.id || "")
      );
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to delete from cart");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartSaveAction: (state, action) => {
      state.cartSave = initialState.cartSave;
    },

    cartListAction: (state, action) => {
      state.cartList = initialState.cartList;
      state.subTotal = 0.0;
    },

    cartDeleteAction: (state, action) => {
      state.cartDelete = initialState.cartDelete;
    },
    updateSubTotal: (state, action) => {
      const { id, quantity } = action.payload;
      let total = 0;

      if (state.cartList.response?.data.cart) {
        state.cartList.response.data.cart =
          state.cartList.response.data.cart.map((item) => {
            if (item.id === id) {
              item.quantity = quantity; // Update quantity
            }
            total += item.product.price * item.quantity;
            return item;
          });
      }

      state.subTotal = total; // Update subtotal
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCartThunk.pending, (state) => {
        handleApiCall(state.cartSave, {}, "loading");
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        handleApiCall(state.cartSave, action, "success");
        state.cartSave.response = action.payload;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        handleApiCall(state.cartSave, { error: action.payload }, "failed");
      })

      // Fetch cart list
      .addCase(getCartThunk.pending, (state) => {
        handleApiCall(state.cartList, {}, "loading");
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        handleApiCall(state.cartList, action, "success");
        state.cartList.response = action.payload;

        // Calculate subTotal by summing up all item (price * quantity)
        let total = 0;
        const cartItems = action.payload.data.cart;
        for (let i = 0; i < cartItems.length; i++) {
          total += cartItems[i].product.price * cartItems[i].quantity;
        }
        state.subTotal = total;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        handleApiCall(state.cartList, { error: action.payload }, "failed");
      })

      // Delete from cart
      .addCase(deleteFromCartThunk.pending, (state) => {
        handleApiCall(state.cartDelete, {}, "loading");
      })
      .addCase(deleteFromCartThunk.fulfilled, (state, action) => {
        handleApiCall(state.cartDelete, action, "success");
        state.cartDelete.response = action.payload;
      })
      .addCase(deleteFromCartThunk.rejected, (state, action) => {
        handleApiCall(state.cartDelete, { error: action.payload }, "failed");
      });
  },
});

export const {
  cartSaveAction,
  cartListAction,
  cartDeleteAction,
  updateSubTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
