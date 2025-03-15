import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get logged-in user

  if (!user) {
    return <Navigate to="/unauthorized" replace />; // Redirect if not logged in
  }

  return children; // Render the protected page
};

export default ProtectedRoute;
