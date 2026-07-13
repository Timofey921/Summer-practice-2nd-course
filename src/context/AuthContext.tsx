import { createContext } from 'react';
import type { AuthCredentials } from '../types/auth';

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: string | null;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
