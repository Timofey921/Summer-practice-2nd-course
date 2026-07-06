import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const AuthorizedUserRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authService.validate();
      setIsAuthorized(isValid);
    };

    checkAuth();

  }, []);

  if (isAuthorized === null) {
    return <div>Authorization verification...</div>
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
};

export default AuthorizedUserRoute;