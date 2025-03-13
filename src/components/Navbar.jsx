import React from "react";
import "../styles/Navbar.css"; // Import the CSS file
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const {user} = useAuth(); // Replace with actual login check

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Ticketing System.
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {user ? (
                <a className="btn btn-light" href="login">
                  <i className="bi bi-person" style={{ marginRight: "5px" }}></i>My Account
                </a>
              ) : (
                <a className="btn btn-light" href="login">
                  <i className="bi bi-box-arrow-in-right" style={{ marginRight: "5px" }}></i>Login
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
