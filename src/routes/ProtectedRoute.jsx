import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const loggedUser = localStorage.getItem("loggedUser");

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;