import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';


export default function Login() {
  const { login } = useAuth(); // ✅ Use login function from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Show error below input

  const users = [
    { username: "user@gmail.com", password: "user", role: "user" },
    { username: "admin@gmail.com", password: "admin", role: "admin" }
  ];
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      login(user); // ✅ Login & redirect automatically
    } else {
      setError("Invalid username or password."); // ✅ Show error
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {/* Left Side - Image */}
          <div className="col-sm-6 col-md">
            <img className="img-fluid" src="images/login.png" alt="Login" />
          </div>

          {/* Right Side - Login Form */}
          <div className="col-sm-6 col-md border shadow-sm rounded m-3 p-4">
            <h2 className="text-left">Welcome back</h2>
            <p className="text-left ">
              Don’t have an account yet? <Link to="/register">Sign up here</Link>
            </p>
            {/* Social Login Buttons */}
            <button className="btn btn-outline-dark w-100 mb-2"><i className="bi bi-google"></i> Log in with Google</button>
            <button className="btn btn-outline-dark w-100 mb-3"><i className="bi bi-apple"></i> Log in with Apple</button>

            <p className="text-center text-muted">or</p>


            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {error && <small className="text-danger">{error}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-light w-100 mt-3">Sign in to your account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
