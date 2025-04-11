export interface ApiResponse<T = any> {
  status: string;
  data: T;
  message?: string;
}

export interface ApiState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ExtendedApiState<T = null> extends ApiState {
  response: ApiResponse<T> | null;
}
