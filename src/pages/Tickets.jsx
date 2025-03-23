import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { addNotification } from "../components/Dashboard/NotificationBell";
import { useNavigate } from "react-router-dom";
import { getTickets, createTicket } from "../services/ticketServices";
import { useAuth } from "../context/AuthContext";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Tickets() {

  const { user } = useAuth();
  const [viewport, setViewport] = useState({
    latitude: 3.139,
    longitude: 101.6869,
    zoom: 12,
  });
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tickets, setTickets] = useState(JSON.parse(localStorage.getItem("tickets")) || []); const [showModal, setShowModal] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    category: "",
    description: "",
    location: { lat: null, lng: null },
    date: new Date().toLocaleDateString("en-GB"),
  });

  const filteredTickets = user.role === "handler"
    ? tickets.filter(t => t.assignedHandler === user.username)
    : tickets;


  useEffect(() => {
    setTickets(getTickets());
  }, []);


  const handleDelete = () => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.filter(t => t.id !== parseInt(selectedTicket));

    // Update state to trigger re-render
    setTickets(updatedTickets);

    // Update localStorage
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    // Close modal and reset selected ticket
    setShowDeleteModal(false);
    setSelectedTicket(null);
    toast.success("Ticket deleted successfully");
  };



  const handleCreateTicket = () => {
    if (!ticket.title || !ticket.category || !ticket.description || !ticket.location.lat) {
      toast.error("Please fill in all fields");
      return;
    }

    const newTicket = createTicket(ticket);
    setTickets([...tickets, newTicket]);

    setTicket({
      title: "",
      category: "",
      description: "",
      location: { lat: null, lng: null },
      date: new Date().toLocaleDateString("en-GB"),
    });

    addNotification("admin", "A new ticket has been submitted.");
    setShowModal(false);
    toast.success("Ticket created successfully");
  };
  return (
    <div className="border rounded shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4>{(user.role === "admin" || user.role === "handler") ? 'All Tickets' : 'My Tickets'}</h4>
          <p className="text-muted">{(user.role === "admin" || user.role === "handler") ? 'Here’s a list of all tickets.' : 'Here’s a summary of your tickets.'}</p>
        </div>
        {user.role === 'user' && (
          <button className="btn btn-sm bg-primary text-white d-flex align-items-center gap-1" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus"></i> Create Ticket
          </button>
        )}
      </div>

      {/* Display Tickets */}
      {filteredTickets.length > 0 ? (
        <div className="table-responsive">
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
              {filteredTickets.map((t) => (
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
                    <button className="btn btn-sm bg-primary text-white"
                      onClick={() => navigate(`/tickets/${t.id}`)}>
                      <i className="bi bi-eye"></i>
                    </button>
                    {user.role !== 'handler' && (
                      <button className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedTicket(t.id);
                          setShowDeleteModal(true);
                        }}>
                        <i className="bi bi-trash"></i>
                      </button>)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-3">
          <img src="/images/empty.png" className="w-25" alt="No Tickets" />
          <p className="text-muted">No tickets available</p>
        </div>
      )
      }

      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          ticket={selectedTicket}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}

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
