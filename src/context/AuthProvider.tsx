import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import authService from '../services/authService';
import { onForceLogout } from '../services/authEvents';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './AuthContext';
import type { AuthCredentials, AuthUser } from '../types/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    authService
      .me()
      .then((fetchedUser) => {
        if (isMounted) setUser(fetchedUser);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {return onForceLogout(() => setUser(null));}, []);

  const signIn = async (credentials: AuthCredentials): Promise<void> => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
  };

  const signUp = async (credentials: AuthCredentials): Promise<void> => {
    const registeredUser = await authService.register(credentials);
    setUser(registeredUser);
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: !!user,
      isLoading,
      login: user?.login ?? null,
      signIn,
      signUp,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
