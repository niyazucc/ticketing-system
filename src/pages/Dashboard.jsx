import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

const Dashboard = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]); // ✅ Only runs when `user` changes

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.username}! Role: {user.role}</p> : <p>Redirecting...</p>}
      <button className="btn btn-danger mt-3" onClick={logout}>Logout</button>
    </DashboardLayout>
  );
};

export default Dashboard;
