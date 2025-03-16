import React, { useEffect, useState } from 'react'

export default function AdminDashboard() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        // Get tickets from localStorage (or empty array if none exist)
        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(storedTickets);
    }, []);

    const totalTickets = tickets.length;
    const openTickets = tickets.filter(ticket => ticket.status === "Open").length;
    const pendingTickets = tickets.filter(ticket => ticket.status === "In Progress").length;
    const resolvedTickets = tickets.filter(ticket => ticket.status === "Closed").length;
    return (
        <>
            {/* Quick Stats */}
            <div className="border rounded shadow-sm p-3">
                <div className="row g-3 ">
                    <h4>Overview</h4>
                    <div className="col-md-3">
                        <div className="card bg-outline-primary p-3 shadow-none">
                            <h5>Total Tickets</h5>
                            <h3>{totalTickets}</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card bg-outline-primary p-3 shadow-none">
                            <h5>Open Tickets</h5>
                            <h3>{openTickets}</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card bg-outline-primary p-3 shadow-none">
                            <h5>Pending Tickets</h5>
                            <h3>{pendingTickets}</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card bg-outline-primary p-3 shadow-none">
                            <h5>Resolved Tickets</h5>
                            <h3>{resolvedTickets}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 border rounded shadow-sm p-3">
                <h4>Recent Tickets</h4>
                <table className="table mt-3 px-4">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.slice(0, 5).map((t) => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.title}</td>
                                <td>{t.category}</td>
                                <td>{t.location ? `${t.location.lat.toFixed(5)}, ${t.location.lng.toFixed(5)}` : "No location"}</td>
                                <td>{t.date}</td>
                                <td>
                                    <span className={`badge ${t.status === "Open" ? "bg-success" :
                                            t.status === "In Progress" ? "bg-warning text-dark" :
                                                t.status === "Resolved" ? "bg-primary" :
                                                    t.status === "Closed" ? "bg-danger" : "bg-secondary"
                                        }`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm bg-primary text-white">
                                        <i className="bi bi-eye"></i>
                                    </button>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            setSelectedTicket(t.id);
                                            setShowDeleteModal(true);
                                        }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}
