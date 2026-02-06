import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
