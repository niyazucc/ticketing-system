import React, { useEffect, useState } from 'react';

export default function UserDashboard() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        // Get tickets from localStorage (or empty array if none exist)
        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(storedTickets);
    }, []);

    // Categorize tickets
    const totalTickets = tickets.length;
    const openTickets = tickets.filter(ticket => ticket.status === "Open").length;
    const pendingTickets = tickets.filter(ticket => ticket.status === "Pending").length;
    const resolvedTickets = tickets.filter(ticket => ticket.status === "Resolved").length;

    return (
        <>
            {/* Quick Stats */}
            <div className="border rounded shadow-sm p-3">
                <div className="row g-3">
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

            {/* Ticket List */}
            <div className="mt-3 border rounded shadow-sm p-3 ">
                <h4>My Tickets</h4>

                {tickets.length === 0 ? (
                    <>
                        <div className="text-center">
                            <div className="img-fluid">
                                <img src="/images/empty.png" className='w-25' alt="No Tickets" />
                            </div>
                            <p className="text-muted">No tickets available</p>

                        </div>
                    </>

                ) : (
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
                            {tickets.map((t) => (
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
                                                        t.status === "Closed" ? "bg-danger" :
                                                            "bg-secondary" // Default case
                                            }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
