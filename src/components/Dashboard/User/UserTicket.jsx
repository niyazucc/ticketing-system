import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { toast } from "react-toastify";
import DeleteModal from "../../../components/DeleteModal";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function TicketList() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ticket, setTicket] = useState({
        title: "",
        category: "",
        description: "",
        location: { lat: null, lng: null },
        date: new Date().toLocaleDateString("en-GB"),
    });

    useEffect(() => {
        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(storedTickets);
    }, []);


    const [viewport, setViewport] = useState({
        latitude: 3.139,
        longitude: 101.6869,
        zoom: 12,
    });

    const deleteTicket = (id) => {
        const updatedTickets = tickets.filter(ticket => ticket.id !== id);
        setTickets(updatedTickets);
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));
        setShowDeleteModal(false);
        toast.success("Ticket deleted successfully");
    };


    const handleCreateTicket = () => {
        if (!ticket.title || !ticket.category || !ticket.description || !ticket.location.lat) {
            toast.error("Please fill in all fields");
            return;
        }

        // Save new ticket
        const newTicket = {
            id: tickets.length + 1,
            ...ticket,
            status: "Open",
        };

        const updatedTickets = [...tickets, newTicket];
        setTickets(updatedTickets);
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));

        // Reset & close modal
        setTicket({
            title: "",
            category: "",
            description: "",
            location: { lat: null, lng: null },
            date: new Date().toLocaleDateString("en-GB"), // Reset with new date
        });

        // Add notification to localStorage
        const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
        notifications.push({ message: `New ticket added: ${newTicket.title}` });
        localStorage.setItem("notifications", JSON.stringify(notifications));

        
        setShowModal(false);
        toast.success("Ticket created successfully");
    };

    return (
        <div className="mt-3 border rounded shadow-sm p-3">
            <div className="d-flex justify-content-between">
                <h4>My Tickets</h4>
                <button className="btn bg-primary text-white" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus"></i> Create Ticket
                </button>
            </div>


            {/* Display Tickets */}
            {tickets.length > 0 ? (
                <table className="table mt-3 px-4">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>

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
                                <td>
                                    <button className="btn btn-sm bg-primary text-white"><i className="bi bi-eye"></i></button>
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
            ) : (
                <div className="text-center mt-3">
                    <img src="/images/empty.png" className="w-25" alt="No Tickets" />
                    <p className="text-muted">No tickets available</p>
                </div>
            )
            }
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => deleteTicket(selectedTicket)}
            />

            {/* Modal */}
            {
                showModal && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create New Ticket</h5>
                                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {/* Title */}
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Title"
                                        value={ticket.title}
                                        onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
                                    />

                                    {/* Category */}
                                    <select
                                        className="form-select mb-2"
                                        value={ticket.category}
                                        onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Bug">Bug</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Technical Issue">Technical Issue</option>
                                    </select>

                                    {/* Description */}
                                    <textarea
                                        className="form-control mb-2"
                                        rows="3"
                                        placeholder="Description"
                                        value={ticket.description}
                                        onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                                    ></textarea>

                                    {/* Mapbox Location Picker */}
                                    <div className="mb-3">
                                        <label className="form-label">Pick Location:</label>
                                        <Map
                                            mapboxAccessToken={MAPBOX_TOKEN}
                                            initialViewState={viewport}
                                            style={{ width: "100%", height: 300 }}
                                            mapStyle="mapbox://styles/mapbox/streets-v11"
                                            onMove={(evt) => setViewport(evt.viewState)}
                                            onClick={(e) => setTicket({ ...ticket, location: { lat: e.lngLat.lat, lng: e.lngLat.lng } })}
                                        >
                                            {ticket.location.lat && (
                                                <Marker latitude={ticket.location.lat} longitude={ticket.location.lng}>
                                                    <span role="img" aria-label="marker">📍</span>
                                                </Marker>
                                            )}
                                        </Map>
                                        {ticket.location.lat && (
                                            <p className="mt-2 text-muted">
                                                Selected: {ticket.location.lat.toFixed(5)}, {ticket.location.lng.toFixed(5)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn bg-primary text-white" onClick={handleCreateTicket}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
