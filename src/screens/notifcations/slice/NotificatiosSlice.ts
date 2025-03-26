import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API_ROUTES from "../../../api/apiRoutes";
import { ExtendedApiState } from "../../../services/apiState";
import http from "../../../services/httpService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleApiCall } from "../../../services/reducerUtils";
import { ProductPayload } from "../../vendors/product/slice/ProductSlice";

export interface NotificationPayload {
  id?: string;
  userId?: string;
  title: string;
  message: string;
  data?: DataObject;
  isRead: boolean;
  createdDate: string;
}

export interface DataObject {
  product: ProductPayload;
}

export interface NotificationResponseData {
  message: string;
  notifications: NotificationPayload[];
  count: number;
}

export interface NotificationState {
  notifications: ExtendedApiState<NotificationResponseData>;
}

const initialState: NotificationState = {
  notifications: {
    loading: false,
    error: null,
    success: false,
    response: null,
  },
};

export const getNotificationsThunk = createAsyncThunk(
  "notifications/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(API_ROUTES.notifcation.getAll);
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch notifcation");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getNotificationsByUserIdThunk = createAsyncThunk(
  "notifications/getByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await http.get(API_ROUTES.notifcation.getById(userId));
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to fetch notifcation");
      }
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNotificationThunk = createAsyncThunk(
  "notifications/add",
  async (payload: NotificationPayload, { rejectWithValue }) => {
    try {
      const customerId = await AsyncStorage.getItem("vendorId");
      const response = await http.post(API_ROUTES.notifcation.create, {
        userId: customerId,
        title: payload.title,
        message: payload.message,
        data: payload.data || null,
      });
      const data = await response.data;
      if (data.status !== "success") {
        throw new Error(data?.message || "Failed to add to notifcation");
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeNotificationThunk = createAsyncThunk(
  "notifcation/remove",
  async (payload: NotificationPayload, { rejectWithValue }) => {
    try {
      const response = await http.delete(
        API_ROUTES.notifcation.delete(`${payload.id}`)
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

export const markAsReadThunk = createAsyncThunk(
  "notifcation/markAsRead",
  async (payload: NotificationPayload, { rejectWithValue }) => {
    try {
      const response = await http.put(
        API_ROUTES.notifcation.markAsRead(`${payload.id}`)
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

export const notificationsSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    notificationListAction: (state) => {
      state.notifications = initialState.notifications;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch notifications
      .addCase(getNotificationsThunk.pending, (state) => {
        handleApiCall(state.notifications, {}, "loading");
      })
      .addCase(getNotificationsThunk.fulfilled, (state, action) => {
        handleApiCall(state.notifications, action, "success");
        state.notifications.response = action.payload;
      })
      .addCase(getNotificationsThunk.rejected, (state, action) => {
        handleApiCall(state.notifications, { error: action.payload }, "failed");
      })

      // fetch notifications by user id
      .addCase(getNotificationsByUserIdThunk.pending, (state) => {
        handleApiCall(state.notifications, {}, "loading");
      })
      .addCase(getNotificationsByUserIdThunk.fulfilled, (state, action) => {
        handleApiCall(state.notifications, action, "success");
        state.notifications.response = action.payload;
      })
      .addCase(getNotificationsByUserIdThunk.rejected, (state, action) => {
        handleApiCall(state.notifications, { error: action.payload }, "failed");
      })

      // create notification

      .addCase(createNotificationThunk.pending, (state) => {
        handleApiCall(state.notifications, {}, "loading");
      })
      .addCase(createNotificationThunk.fulfilled, (state, action) => {
        handleApiCall(state.notifications, action, "success");
        state.notifications.response = action.payload;
      })
      .addCase(createNotificationThunk.rejected, (state, action) => {
        handleApiCall(state.notifications, { error: action.payload }, "failed");
      })

      // remove notification

      .addCase(removeNotificationThunk.pending, (state) => {
        handleApiCall(state.notifications, {}, "loading");
      })
      .addCase(removeNotificationThunk.fulfilled, (state, action) => {
        handleApiCall(state.notifications, action, "success");
        state.notifications.response = action.payload;
      })
      .addCase(removeNotificationThunk.rejected, (state, action) => {
        handleApiCall(state.notifications, { error: action.payload }, "failed");
      })

      // mark as read
      .addCase(markAsReadThunk.pending, (state) => {
        handleApiCall(state.notifications, {}, "loading");
      })
      .addCase(markAsReadThunk.fulfilled, (state, action) => {
        handleApiCall(state.notifications, action, "success");
        state.notifications.response = action.payload;
      })
      .addCase(markAsReadThunk.rejected, (state, action) => {
        handleApiCall(state.notifications, { error: action.payload }, "failed");
      });
  },
});

export const { notificationListAction } = notificationsSlice.actions;

export default notificationsSlice.reducer;
