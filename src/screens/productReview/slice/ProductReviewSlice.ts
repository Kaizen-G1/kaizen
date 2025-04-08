import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiCall } from "../../../services/reducerUtils";
import http from "../../../services/httpService";
import API_ROUTES from "../../../api/apiRoutes";
import { ExtendedApiState } from "../../../services/apiState";

// Review type for the slice state
export interface ReviewPayload {
  id?: string;
  product_id: string;
  customer_id: string;
  customer_name: string;
  rating: number;
  comment: string;
}

export interface ReviewResponseData {
  message: string;
  review: ReviewPayload;
}

export interface ReviewListResponseData {
  message: string;
  reviews: ReviewPayload[];
}

// Review slice state interface
interface ReviewState {
  reviewSave: ExtendedApiState<ReviewResponseData>;
  reviewList: ExtendedApiState<ReviewListResponseData>;
  reviewDelete: ExtendedApiState<{ message: string }>;
}

// Initial state
const initialState: ReviewState = {
  reviewSave: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  reviewList: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
  reviewDelete: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

// Fetch reviews by product
export const getReviewsByProductThunk = createAsyncThunk(
  "reviews/getReviewsByProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await http.get(API_ROUTES.reviews.get(productId));
      const data = response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch reviews");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Save (Create/Update) Review
export const saveReviewThunk = createAsyncThunk(
  "reviews/save",
  async (payload: ReviewPayload, { rejectWithValue }) => {
    try {
      const isUpdate = !!payload.id;
      const endpoint = isUpdate ? API_ROUTES.reviews.update(`${payload.id}`) : API_ROUTES.reviews.create;
      const method = isUpdate ? "PUT" : "POST";
      const response = await http.request({
        url: endpoint,
        method,
        data: payload,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete review
export const deleteReviewThunk = createAsyncThunk(
  "reviews/delete",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      const response = await http.delete(API_ROUTES.reviews.delete(reviewId));
      const data = response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to delete review");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewSaveAction: (state) => {
      state.reviewSave = initialState.reviewSave;
    },
    reviewListAction: (state) => {
      state.reviewList = initialState.reviewList;
    },
    reviewDeleteAction: (state) => {
      state.reviewDelete = initialState.reviewDelete;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveReviewThunk.pending, (state) => {
        handleApiCall(state.reviewSave, {}, "loading");
      })
      .addCase(saveReviewThunk.fulfilled, (state, action) => {
        handleApiCall(state.reviewSave, action, "success");
        state.reviewSave.response = action.payload;
      })
      .addCase(saveReviewThunk.rejected, (state, action) => {
        handleApiCall(state.reviewSave, { error: action.payload }, "failed");
      })

      .addCase(getReviewsByProductThunk.pending, (state) => {
        handleApiCall(state.reviewList, {}, "loading");
      })
      .addCase(getReviewsByProductThunk.fulfilled, (state, action) => {
        handleApiCall(state.reviewList, action, "success");
        state.reviewList.response = action.payload;
      })
      .addCase(getReviewsByProductThunk.rejected, (state, action) => {
        handleApiCall(state.reviewList, { error: action.payload }, "failed");
      })
      
      .addCase(deleteReviewThunk.pending, (state) => {
        handleApiCall(state.reviewDelete, {}, "loading");
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        handleApiCall(state.reviewDelete, action, "success");
        state.reviewDelete.response = action.payload;
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        handleApiCall(state.reviewDelete, { error: action.payload }, "failed");
      });
  },
});

export const { reviewSaveAction, reviewListAction, reviewDeleteAction } = reviewSlice.actions;
export default reviewSlice.reducer;
