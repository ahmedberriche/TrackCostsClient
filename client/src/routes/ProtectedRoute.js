import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let isAuthenticated = Cookies.get("accessToken");
  if (!isAuthenticated) return <Navigate to={"/"} replace />;
  return children;
}

export default ProtectedRoute;
