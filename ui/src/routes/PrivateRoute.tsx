import React from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
