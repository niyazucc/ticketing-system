import React from 'react'
import tickets from '../data/tickets'

export default function Issues() {
    const getBadgeClass = (status) => {
        switch (status) {
            case "Open":
                return "text-bg-primary";  // Blue for open issues
            case "In Progress":
                return "text-bg-warning";  // Yellow for in-progress issues
            case "Resolved":
                return "text-bg-success";  // Green for resolved issues
            case "Closed":
                return "text-bg-danger";   // Red for closed issues
            default:
                return "text-bg-secondary"; // Grey for unknown status
        }
    };
    return (
        <>
            <div className="container mt-4">
                <div className="row g-3">
                    {tickets.length > 0 ? (
                        tickets.map((issue) => (
                            <div className="col-md-4" key={issue.id}>
                                <div className="card shadow-sm p-3">
                                    <h5>
                                        {issue.title}{" "}
                                        <span className={`badge ${getBadgeClass(issue.status)}`}>
                                            {issue.status}
                                        </span>
                                    </h5>
                                    <p>{issue.description}</p>
                                    <p className="text-muted">📍 Location: ({issue.latitude}, {issue.longitude})</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tickets reported yet.</p>
                    )}
                </div>
            </div>
        </>
    )
}
