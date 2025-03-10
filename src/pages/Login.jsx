import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("Please enter username and password.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {/* Left Side - Image */}
          <div className="col">
            <img className="img-fluid" src="images/login.png" alt="Login" />
          </div>

          {/* Right Side - Login Form */}
          <div className="col border rounded m-3 p-4">
            <h2 className="text-left">Welcome back</h2>
            <p className="text-left ">
              Don’t have an account yet? <Link to="/register">Sign up here</Link>
            </p>
            {/* Social Login Buttons */}
            <button className="btn btn-light w-100 mb-2"><i className="bi bi-google"></i> Log in with Google</button>
            <button className="btn btn-light w-100 mb-3"><i className="bi bi-apple"></i> Log in with Apple</button>

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

              <button type="submit" className="btn btn-primary w-100 mt-3">Sign in to your account</button>
            </form>

            
          </div>
        </div>
      </div>
    </>
  );
}
