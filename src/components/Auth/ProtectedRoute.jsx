import { Navigate, useLocation }  from "react-router";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../UI/LoadingSpinner.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
