export interface ApiResponse<T = any> {
  status: string;
  data: T; // 'data' contains the actual API response
  message?: string; // Optional message field
}

export interface ApiState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ExtendedApiState<T = null> extends ApiState {
  response: ApiResponse<T> | null; // 'response' contains the actual API response
}
