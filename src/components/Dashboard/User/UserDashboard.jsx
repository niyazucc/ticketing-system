import React, { use, useEffect, useState } from 'react';
import TicketTables from '../TicketTables';
import { useAuth } from '../../../context/AuthContext';

export default function UserDashboard() {
    const [tickets, setTickets] = useState([]);
    const { user } = useAuth(); // Assuming useAuth() returns an object with `user`

    useEffect(() => {
        // Get tickets from localStorage (or empty array if none exist)
        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(storedTickets);
    }, []);

    // Apply filtering only if the user is a handler
    const filteredTickets = user.role === "handler"
        ? tickets.filter(t => t.assignedHandler === user.username)
        : tickets;

    // Categorize tickets (using filteredTickets instead of tickets)
    const totalTickets = filteredTickets.length;
    const openTickets = filteredTickets.filter(ticket => ticket.status === "Open").length;
    const pendingTickets = filteredTickets.filter(ticket => ticket.status === "In Progress").length;
    const resolvedTickets = filteredTickets.filter(ticket => ticket.status === "Resolved").length;

    return (
        <>
            {/* Quick Stats */}
            <div className="border rounded shadow-sm p-3">
                <div className="row g-3">
                    <div>
                        <h4>Overview</h4>
                        <p className="text-muted">{user.role ==='user' ? 'Here’s a summary of your tickets.' : 'Here’s a summary of tickets assigned to you.' }</p>
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
    );
}
