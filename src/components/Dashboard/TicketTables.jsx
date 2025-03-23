import React from 'react'
import { useAuth } from '../../context/AuthContext';


export default function TicketTables({ tickets }) {

    const { user } = useAuth();

    if (user.role === 'handler') {
        tickets = tickets.filter(t => t.assignedHandler === user.username
        )
    }

    return (
        <div className="mt-3 border rounded shadow-sm p-3">
            
            <h4>{user.role === 'admin' ? 'Recent Tickets' : 'My Tickets'}</h4>
            <p className="text-muted">{user.role === 'admin' ? 'Here are recent tickets that were submitted.' :  user.role ==='handler' ? 'Here’s a list of all tickets.' :'Here are your most recent ticket submissions.'}</p>
            {tickets.length === 0 ? <div className="text-center mt-3">
                <img src="/images/empty.png" className="w-25" alt="No Tickets" />
                <p className="text-muted">No tickets available</p>
            </div> :
                <div className='table-responsive'>
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

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>}
        </div>
    )
}
