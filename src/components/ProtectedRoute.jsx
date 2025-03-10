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
// This component is a wrapper around the children components. It checks if the user is logged in. If the user is not logged in, it redirects to the unauthorized page. If the user is logged in, it renders the children components.