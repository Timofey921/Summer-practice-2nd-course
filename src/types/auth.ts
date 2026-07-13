export interface AuthUser {
  _id: number;
  login: string;
}

export interface AuthCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  ok: boolean;
  token: string;
  tokenType: 'Bearer';
  user: AuthUser;
}

export interface MeResponse {
  ok: boolean;
  user: AuthUser;
}
