import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SideNav() {
  return (
    <div className="d-flex flex-column p-3 bg-primary text-white min-vh-100 rounded">
    <h4 className="text-center mb-4">Dashboard</h4>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="" className="nav-link text-white active">
          <i className="bi bi-house-door me-2"></i> Home
        </Link>
      </li>
      <li>
        <Link to="/" className="nav-link text-white">
          <i className="bi bi-ticket-detailed me-2"></i> My Tickets
        </Link>
      </li>
      <li>
        <Link to="" className="nav-link text-white">
          <i className="bi bi-plus-circle me-2"></i> Create Ticket
        </Link>
      </li>
      <li>
        <Link to="" className="nav-link text-white">
          <i className="bi bi-person me-2"></i> Profile
        </Link>
      </li>
    </ul>
    <hr />
    <div className="text-center">
      <Link to="/logout" className="btn btn-danger w-100">
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </Link>
    </div>
  </div>
  )
}
