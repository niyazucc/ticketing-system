import React from 'react'
import Navbar from '../components/Dashboard/Navbar';
import tickets from '../data/tickets';

export default function Dashboard() {


  return (
    <>
      <Navbar />
      <div className='container py-3'>
        {/* Quick Stats */}
        <div className="row g-3">
          <h4>Overview</h4>
          <div className="col-md-3">
            <div className="card bg-outline-primary p-3 shadow-none">
              <h5>Total Tickets</h5>
              <h3>12</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-outline-primary p-3 shadow-none">
              <h5>Pending Tickets</h5>
              <h3>5</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-outline-primary p-3 shadow-none">
              <h5>Resolved Tickets</h5>
              <h3>7</h3>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h4>My Tickets</h4>
          <table className="table ">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>
                    <span className={`${ticket.status === 'Closed' ? 'text-danger' : ticket.status === 'Open' ? 'text-success' : ticket.status === 'In Progress' ? 'text-warning' : ''}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
