import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth"; // Import useAuth from your Auth context

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace /> // Redirect to login if not authenticated
  );
};
export default ProtectedRoute;
