import { createContext, useContext, useState , useEffect} from "react";
import { useNavigate ,useLocation } from "react-router-dom";

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

    // Navigate to dashboard
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
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
