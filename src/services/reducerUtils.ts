import { ApiState } from "./apiState";

export const handleApiCall = <T>(
  state: ApiState,
  action: { payload?: T; error?: any },
  status: "loading" | "success" | "failed"
) => {
  switch (status) {
    case "loading":
      state.loading = true;
      state.error = null;
      break;
    case "success":
      state.loading = false;
      state.success = true;
      break;
    case "failed":
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
      break;
  }
};
