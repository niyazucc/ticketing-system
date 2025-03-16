import React from 'react';
import tickets from '../data/tickets';

export default function Issues() {
    const getBadgeClass = (status) => {
        switch (status) {
            case "Open": return "text-bg-primary";  
            case "In Progress": return "text-bg-warning";  
            case "Resolved": return "text-bg-success";  
            case "Closed": return "text-bg-danger";   
            default: return "text-bg-secondary"; 
        }
    };

    // Group tickets into chunks of 3
    const chunkSize = 3;
    const ticketChunks = [];
    for (let i = 0; i < tickets.length; i += chunkSize) {
        ticketChunks.push(tickets.slice(i, i + chunkSize));
    }

    return (
        <div className="container mt-4">
            <div id="ticketCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {ticketChunks.map((group, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row">
                                {group.map((issue) => (
                                    <div key={issue.id} className="col-md-4">
                                        <div className="card shadow-sm p-3 text-center">
                                            <h5>
                                                {issue.title}{" "}
                                                <span className={`badge ${getBadgeClass(issue.status)}`}>
                                                    {issue.status}
                                                </span>
                                            </h5>
                                            <p>{issue.description}</p>
                                            <p className="text-muted">
                                                📍 Location: ({issue.location?.lat}, {issue.location?.lng})
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#ticketCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#ticketCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
}
