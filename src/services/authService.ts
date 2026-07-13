import { AxiosError } from 'axios';
import api from '../api/axiosInstance';
import { clearAccessToken, getAccessToken, setAccessToken } from './tokenStorage';
import type { AuthCredentials, AuthResponse, AuthUser, MeResponse } from '../types/auth';

function toReadableError(error: unknown, fallback: string): Error {
  if (error instanceof AxiosError) {
    const serverMessage = (error.response?.data as { error?: string } | undefined)?.error;
    return new Error(serverMessage ?? fallback);
  }

  return error instanceof Error ? error : new Error(fallback);
}

class AuthService {
  async login(credentials: AuthCredentials): Promise<AuthUser> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      setAccessToken(data.token);
      return data.user;
    } catch (error) {
      throw toReadableError(error, 'Couldn\'t log in');
    }
  }

  async register(credentials: AuthCredentials): Promise<AuthUser> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', credentials);
      setAccessToken(data.token);
      return data.user;
    } catch (error) {
      throw toReadableError(error, 'Couldn\'t sign in');
    }
  }

  async me(): Promise<AuthUser | null> {
    if (!getAccessToken()) return null;

    try {
      const { data } = await api.get<MeResponse>('/auth/me');
      return data.user;
    } catch {
      clearAccessToken();
      return null;
    }
  }

  async validate(): Promise<boolean> {
    const user = await this.me();
    return !!user;
  }

  logout(): void {
    clearAccessToken();
  }
}

export default new AuthService();
