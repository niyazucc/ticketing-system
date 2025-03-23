import React, { useState, useEffect } from "react";
import "../../styles/Navbar.css"; // Import the CSS file
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import { useLocation, Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

export default function Navbar() {

  const location = useLocation();
  const { user, logout } = useAuth(); // Import the useAuth hook


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3 shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            Ticketing System.
          </a>

          <NotificationBell role={user.role === 'admin' ? 'admin' : user.role === 'user' ? 'user' : 'handler'} />
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

            <ul className="navbar-nav ms-auto g-3">
              <>
                {/* Second navbar (links) inside the same collapse div */}
                <ul className="navbar-nav">

                  <li className={`nav-item ${location.pathname === "/dashboard" ? "border-bottom border-white" : ""}`}>
                    <Link className="nav-link" to="/dashboard">
                      <i className="bi bi-house"></i> Dashboard
                    </Link>
                  </li>
                  <li className={`nav-item ${location.pathname === "/tickets" ? "border-bottom border-white" : ""}`}>
                    <Link className="nav-link" to="/tickets">
                      <i className="bi bi-ticket-detailed"></i> {(user.role === "admin" || user.role === "handler") ? "All Tickets" :  "My Tickets"}
                    </Link>
                  </li>
                </ul>
                <ul className="nav-item">
                  <div className="dropdown">
                    <li>
                      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person"></i> {user.username}
                      </button>
                      <ul className="dropdown-menu bg-primary">
                        <li><a className="dropdown-item bg-primary text-primary" onClick={logout}><i className="bi bi-person"></i> My Profile</a></li>
                        <li><a className="dropdown-item bg-primary text-primary" onClick={logout}><i className="bi bi-door-closed"></i> Logout</a></li>
                      </ul>

                    </li>
                  </div>
                </ul>
              </>

            </ul>

          </div>
        </div>
      </nav>


    </>
  );
}
