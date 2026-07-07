import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../ui/LoadingScreen';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
