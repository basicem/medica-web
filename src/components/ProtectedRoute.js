import React from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "./LogIn/StoreContext";

const ProtectedRoute = ({ allowedRoles, element }) => {
  const { user } = useStore();
  const isUserAuthorized = allowedRoles.includes(user?.role);

  return (isUserAuthorized ? element : <Navigate to="/forbidden" />);
};

export default ProtectedRoute;
