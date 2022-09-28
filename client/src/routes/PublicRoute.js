import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  let isAuthenticated = Cookies.get("accessToken");
  if (!isAuthenticated) return children;
  return <Navigate to={"/dashboard"} replace />;
}

export default PublicRoute;
