import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext(); // Create Context

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    // Load user from localStorage if exists
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect user if already logged in
    if (user && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [user, navigate, location]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Logged in successfully!");
    // Navigate to dashboard
    navigate("/dashboard");

  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // Update state first
    toast.info("Logged out successfully!"); // Blue info toast
    setTimeout(() => {
      navigate("/login", { replace: true }); // Navigate AFTER state updates
    }, 10); // Small delay
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // Hook to access AuthContext
}

export default AuthProvider;
