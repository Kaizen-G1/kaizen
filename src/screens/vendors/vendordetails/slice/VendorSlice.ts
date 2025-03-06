import { ApiResponse, ExtendedApiState } from "../../../../services/apiState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../../config/config";
import { handleApiCall } from "../../../../services/reducerUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface VendorPayload {
  _id?: string;
  customer_id?: string;
  name: string;
  email: string;
  address: string;
  companyLogo?: string;
  shipping_time: string;
  business_number: string;
  status: string;
  bank_account_number: string;
}

interface VendorResponseData {
  message: string;
  vendor: VendorPayload;
}

interface VendorListResponseData {
  message: string;
  vendors: VendorPayload;
}

interface VendorState {
  vendorSave: ExtendedApiState<VendorResponseData>;
  vendorData: ExtendedApiState<VendorResponseData>;
}

const initialState: VendorState = {
  vendorSave: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  vendorData: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch vendor details by customer_id
export const getVendorsThunk = createAsyncThunk(
  "vendors/vendordetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const vendorId = await AsyncStorage.getItem("vendorId");
      console.log("vendorId", vendorId);
      const response = await fetch(
        `${config.API_URL}/api/v1/company/${vendorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to fetch vendors");
      }
      
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Create or update vendor
export const saveVendorThunk = createAsyncThunk(
  "vendor/save",
  async (payload: VendorPayload, { rejectWithValue }) => {
    try {
      console.log("Save Vendor Payload:", payload); // Debugging

      const isUpdate = !!payload._id;
      console.log("Is Update:", isUpdate);

      if (isUpdate) {
        console.log("Updating vendor with ID:", payload._id);
      } else {
        console.log("Creating a new vendor");
      }

      const endpoint = isUpdate
        ? `${config.API_URL}/api/v1/company/${payload._id}`
        : `${config.API_URL}/api/v1/company/`;

      const method = isUpdate ? "PUT" : "POST";
      const token = await AsyncStorage.getItem("accessToken");
      const customer_id = await AsyncStorage.getItem("vendorId");

      // const updatedPayload = {
      //   ...payload,
      //   customer_id: customer_id,
      // };

      
      // Ensure customer_id is added dynamically
      const { _id, ...updatedPayload } = payload; // Remove _id for updates
      const finalPayload = {
        ...updatedPayload,
        customer_id: customer_id, // Only add customer_id if it exists
      };

      console.log("Final Payload Sent to API:", finalPayload);
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Vendor operation failed");
      }

      return await response.json();
    } catch (err: any) {
      console.error("Error saving vendor:", err.message);
      return rejectWithValue(err.message);
    }
  }
);


const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    resetVendorSaveState: (state) => {
      state.vendorSave = initialState.vendorSave;
    },
    resetVendorListState: (state) => {
      state.vendorData = initialState.vendorData;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save (Create/Update) Vendor
      .addCase(saveVendorThunk.pending, (state) => {
        handleApiCall(state.vendorSave, {}, "loading");
      })
      .addCase(saveVendorThunk.fulfilled, (state, action) => {
        handleApiCall(state.vendorSave, action, "success");
        state.vendorSave.response = action.payload;
      })
      .addCase(saveVendorThunk.rejected, (state, action) => {
        handleApiCall(state.vendorSave, { error: action.payload }, "failed");
      })

      // Fetch vendor data
      .addCase(getVendorsThunk.pending, (state) => {
        handleApiCall(state.vendorData, {}, "loading");
      })
      .addCase(getVendorsThunk.fulfilled, (state, action) => {
        handleApiCall(state.vendorData, action, "success");
        state.vendorData.response = action.payload;
      })
      .addCase(getVendorsThunk.rejected, (state, action) => {
        handleApiCall(state.vendorData, { error: action.payload }, "failed");
      });
  },
});

export const { resetVendorSaveState, resetVendorListState } = vendorSlice.actions;
export default vendorSlice.reducer;
