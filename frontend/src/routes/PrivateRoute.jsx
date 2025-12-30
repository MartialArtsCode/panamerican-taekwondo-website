import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
