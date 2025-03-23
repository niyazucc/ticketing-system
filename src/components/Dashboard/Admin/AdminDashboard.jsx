import React, { useEffect, useState } from 'react'
import TicketTables from '../TicketTables';

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
                    <div>
                        <h4>Overview</h4>
                        <p className="text-muted">Here’s an overview of all tickets.</p>

                    </div>
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
                            <h5>In Progress Tickets</h5>
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

            <TicketTables tickets={tickets} />
        </>
    )
}
