import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiCall } from "../../../services/reducerUtils";
import { ExtendedApiState, ApiResponse } from "../../../services/apiState";
import config from "../../../config/config";
import { RegisterPayload, Verify2FAPayload } from "../authTypes";
import API_ROUTES from "../../../api/apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RegisterResponseData {
  message: string;
  customerEmail: string;
}

export interface Verify2FAResponseData {
  message: string;
}

interface AuthState {
  register: ExtendedApiState<RegisterResponseData>;
  verify2FA: ExtendedApiState<Verify2FAResponseData>;
}

const initialState: AuthState = {
  register: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  verify2FA: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.auth.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.data || "Registration failed");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const verify2FA = createAsyncThunk(
  "auth/verify2FA",
  async (payload: Verify2FAPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ROUTES.auth.verify2fa, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.data || "Verification failed");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCustomerById = createAsyncThunk(
  "auth/getCustomerById",
  async (_, { rejectWithValue }) => {
    try {
      
      const customer_id = await AsyncStorage.getItem("vendorId");
      const token = await AsyncStorage.getItem("accessToken");
      const response = await fetch(API_ROUTES.auth.getCustomerById(`${customer_id}`), {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.data || "Failed to get customer details");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.register = initialState.register;
      state.verify2FA = initialState.verify2FA;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        handleApiCall(state.register, {}, "loading");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        handleApiCall(state.register, action, "success");
        state.register.response = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        handleApiCall(state.register, { error: action.payload }, "failed");
      })

      // Verify 2FA
      .addCase(verify2FA.pending, (state) => {
        handleApiCall(state.verify2FA, {}, "loading");
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        handleApiCall(state.verify2FA, action, "success");
        state.verify2FA.response = action.payload;
      })
      .addCase(verify2FA.rejected, (state, action) => {
        handleApiCall(state.verify2FA, { error: action.payload }, "failed");
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
