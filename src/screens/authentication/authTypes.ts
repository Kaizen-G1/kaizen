export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface Verify2FAPayload {
  code: string;
  customerEmail: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  requires2FA?: boolean;
}
