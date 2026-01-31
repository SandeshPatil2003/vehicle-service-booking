import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "./auth";

const ProtectedRoute = ({ children, roles }) => {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  if (roles && !roles.includes(getRole())) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
