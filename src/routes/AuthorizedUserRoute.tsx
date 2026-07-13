import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const AuthorizedUserRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Authorization verification...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthorizedUserRoute;
