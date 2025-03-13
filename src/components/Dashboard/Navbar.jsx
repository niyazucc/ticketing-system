import React from "react";
import "../../styles/Navbar.css"; // Import the CSS file
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();
  const { user, logout } = useAuth(); // Import the useAuth hook

  return (
    <>
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
              <>

                <li className="nav-item">
                  <div class="dropdown">
                    <li>
                      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person"></i> {user.username}
                      </button>
                      <ul class="dropdown-menu btn-light">
                        <li><a class="dropdown-item btn-light" onClick={logout}><i className="bi bi-door-closed"></i> Logout</a></li>

                      </ul>
                    </li>

                  </div>
                </li>
              </>

            </ul>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg bg-primary py-2 navbar-dark">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className={`nav-item ${location.pathname === "/dashboard" ? "border-bottom border-white" : ""}`}>
                <Link className="nav-link" to="/dashboard">
                  <i className="bi bi-house"></i> Dashboard
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "" ? "border-bottom border-white" : ""}`}>
                <Link className="nav-link" to="">
                  <i className="bi bi-ticket-detailed"></i> My Tickets
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "" ? "border-bottom border-white" : ""}`}>
                <Link className="nav-link" to="">
                  <i className="bi bi-person"></i> My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
