import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import MapComponent from "../components/Map";
import DeleteModal from "../components/DeleteModal";
import RejectModal from "../components/RejectModal";
import ResolveModal from "../components/ResolveModal";
import CloseTicketModal from "../components/CloseTicketModal";
import { useAuth } from "../context/AuthContext";
import users from "../data/users";
import { toast } from "react-toastify";
import { addNotification } from "../components/Dashboard/NotificationBell";

export default function TicketDetails() {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const ticketIndex = tickets.findIndex(t => t.id === parseInt(id));
    const [isAssigning, setIsAssigning] = useState(false);
    if (ticketIndex === -1) return <p>Ticket not found.</p>;
    const [selectedHandler, setSelectedHandler] = useState("");
    const [notes, setNotes] = useState("");
    const [ticket, setTicket] = useState(tickets[ticketIndex]);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectNotes, setRejectNotes] = useState("");

    const [showResolveModal, setShowResolveModal] = useState(false);
    const [resolveNotes, setResolveNotes] = useState("");

    const [showCloseModal, setShowCloseModal] = useState(false);

    const openResolveModal = () => {
        setResolveNotes(""); // Reset notes when opening
        setShowResolveModal(true);
    };

    const handleCloseTicket = () => {
        const updatedTicket = { ...ticket, status: "Closed" };
        tickets[ticketIndex] = updatedTicket;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        setTicket(updatedTicket);
        addNotification("handler", "A ticket has been confirmed and closed.");
        addNotification("user", "Your submitted has been solved and closed.");
        toast.success("Ticket closed.");
        setShowCloseModal(false);
    };

    const handleResolve = () => {
        const updatedTicket = { ...ticket, status: "Resolved", resolveNotes: resolveNotes };
        tickets[ticketIndex] = updatedTicket;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        setTicket(updatedTicket);
        addNotification("admin", "A ticket has been resolved.");
        toast.success("Ticket resolved.");
        setShowResolveModal(false);
        setResolveNotes(""); // Clear notes after resolving
    };

    const handleChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value, });
    };
    const handleSave = () => {
        tickets[ticketIndex] = ticket;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        setIsEditing(false);
        setIsUpdate(false);
        toast.success("Ticket updated successfully.");
    };

    const handleReject = () => {
        const updatedTicket = { ...ticket, assignedHandler: null, status: "Rejected", notes: rejectNotes };
        tickets[ticketIndex] = updatedTicket;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        setTicket(updatedTicket);
        addNotification("admin", "A ticket has been rejected.");
        toast.error("Ticket rejected.");
        setShowRejectModal(false);
        navigate("/tickets");
        setRejectNotes(""); // Clear notes after rejection
    };

    const handleDelete = () => {
        const updatedTickets = tickets.filter(t => t.id !== parseInt(id));
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));
        setShowDeleteModal(false);
        navigate("/tickets");
    };

    // Function to assign a handler to the ticket
    const assignTicket = (handlerUsername) => {
        if (!handlerUsername) return;

        const updatedTicket = { ...ticket, assignedHandler: handlerUsername, status: "In Progress", notes: notes };

        tickets[ticketIndex] = updatedTicket;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        toast.success(`Ticket assigned to ${handlerUsername}`);
        addNotification('handler', `A ticket has been assigned to you.`);
        addNotification('user', `Your ticket has been assigned to handler.`);
        setTicket(updatedTicket);
    };

    console.log("Ticket Details:", ticket);
    return (
        <div className="border rounded shadow-sm p-3">
            <div className="row">
                <div className="col-lg-6">
                    <div className="grid gap-2">
                        <h3><i className="bi bi-ticket-detailed"></i> Ticket Details</h3>
                        <p className="text-muted">Here are the details of your ticket.</p>

                        {isEditing ? (
                            <>
                                <div className="mb-2">
                                    <label className="form-label"><strong>Title:</strong></label>
                                    <input type="text" name="title" className="form-control" value={ticket.title} onChange={handleChange} />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Category:</strong></label>
                                    <input type="text" name="category" className="form-control" value={ticket.category} onChange={handleChange} />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Description:</strong></label>
                                    <textarea name="description" className="form-control" value={ticket.description} onChange={handleChange} />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Location:</strong></label>
                                    <input type="text" name="location" className="form-control" value={ticket.location ? `${ticket.location.lat}, ${ticket.location.lng}` : "No location"} disabled />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-2">
                                    <label className="form-label"><strong>ID:</strong></label>
                                    <span className="form-control-plaintext text-muted">{ticket.id}</span>
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Title:</strong></label>
                                    <span className="form-control-plaintext text-muted">{ticket.title}</span>
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Category:</strong></label>
                                    <span className="form-control-plaintext text-muted">{ticket.category}</span>
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Description:</strong></label>
                                    <span className="form-control-plaintext text-muted">{ticket.description}</span>
                                </div>

                                <div className="mb-2">
                                    <label className="form-label"><strong>Location:</strong></label>
                                    <span className="form-control-plaintext text-muted">{ticket.location ? `${ticket.location.lat}, ${ticket.location.lng}` : "No location"}</span>
                                </div>
                            </>
                        )}

                        <div className="mb-2">
                            <label className="form-label"><strong>Date:</strong></label>
                            <span className="form-control-plaintext text-muted">{ticket.date}</span>
                        </div>

                        <div className="mb-2">
                            <label className="form-label"><strong>Status:</strong></label>
                            <br />
                            <span className={`badge text-bg-${ticket.status === "Open" ? "info" :
                                ticket.status === "In Progress" ? "warning" :
                                    ticket.status === "Resolved" ? "success" :
                                        ticket.status === "Closed" ? "secondary" :
                                            "danger"} ms-2`}>
                                {ticket.status}
                            </span>
                        </div>

                        {user.role === "admin" && ticket.status === "Rejected" && (
                            <div className="mb-2">
                                <label className="form-label"><strong>Reason Reject:</strong></label>
                                <div class="alert alert-danger" role="alert">
                                    {ticket.notes}
                                </div>
                            </div>
                        )}

                        {user.role === "admin" && ticket.status === "Resolved" && (
                            <div className="mb-2">
                                <label className="form-label"><strong>Resolved Notes:</strong></label>
                                <div class="alert alert-success" role="alert">
                                    {ticket.resolveNotes}
                                </div>
                            </div>
                        )}

                        <div className="mb-2">
                            <label className="form-label"><strong>Handler:</strong></label>
                            <span className="form-control-plaintext">{ticket.assignedHandler || "Not Assigned"}</span>
                        </div>

                        {user.role === "admin" && (isAssigning ? (
                            <>
                                <label className="form-label"><strong>Assign to Handler:</strong></label>
                                <select
                                    className="form-select"
                                    value={selectedHandler} // Track the temporary selection
                                    onChange={(e) => setSelectedHandler(e.target.value)} // Store selection but don’t apply it yet
                                >
                                    <option value="">Select Handler</option>
                                    {users
                                        .filter((h) => h.role === "handler")
                                        .map((h) => (
                                            <option key={h.username} value={h.username}>
                                                {h.username}
                                            </option>
                                        ))}
                                </select>

                                <div className="mb-3">
                                    <label className="form-label">Notes</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)} // Track notes input
                                    ></textarea>
                                </div>
                                <button
                                    className="btn bg-primary text-white mt-2"
                                    onClick={() => {
                                        if (!selectedHandler) return; // Prevent empty selection
                                        setTicket({ ...ticket, assignedHandler: selectedHandler, notes: notes }); // Confirm selection
                                        assignTicket(selectedHandler); // Assign ticket
                                        setIsAssigning(false); // Close UI if needed
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setIsAssigning(false)}
                                    class="btn btn-outline-dark mt-2 ms-2"
                                >
                                    Cancel
                                </button>

                            </>
                        ) : (<>

                            {ticket.status !== "Closed" && (
                                <button className="btn bg-primary text-white mt-2" onClick={() => setIsAssigning(true)}>Assign Handler</button>
                            )}
                            {ticket.status === "Resolved" && (
                                <button className="btn btn-success mt-2 ms-2" onClick={() => setShowCloseModal(true)}>Close Ticket</button>
                            )}
                        </>))}

                        {user.role === "handler" && ticket.status !== "Closed" && (
                            <>
                                <div className="mb-2">
                                    <label className="form-label"><strong>Notes:</strong></label>
                                    <textarea name="notes" className="form-control" value={ticket.notes} onChange={handleChange} disabled />
                                </div>

                                <div className="mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-success me-2"
                                        onClick={openResolveModal}
                                    >
                                        Resolve
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger me-2"
                                        onClick={() => {
                                            setSelectedTicket(ticket);
                                            setShowRejectModal(true);
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </>

                        )}

                        {ticket.status !== "Closed" && (
                            <>
                                {user.role === "user" && (
                                    isEditing ? (
                                        <button className="btn btn-success mt-2" onClick={handleSave}>Save</button>
                                    ) : (
                                        <button className="btn btn-primary mt-2" onClick={() => { setIsEditing(true); setIsUpdate(true); }}>
                                            Edit
                                        </button>
                                    )
                                )}

                                {user.role === "user" && (
                                    <button className="btn btn-danger mt-2 ms-2" onClick={() => {
                                        setSelectedTicket(ticket);
                                        console.log("Opening Delete Modal...");
                                        setShowDeleteModal(true);
                                    }}>
                                        Delete
                                    </button>
                                )}
                            </>
                        )}

                    </div>
                </div>
                <div className="col-lg-6 mt-lg-0 mt-3">
                    <MapComponent ticket={ticket} onLocationChange={handleChange} isUpdate={isUpdate} />
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteModal
                    show={showDeleteModal}
                    ticket={selectedTicket}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}

            {showRejectModal && (
                <RejectModal
                    show={showRejectModal}
                    ticket={ticket}
                    notes={rejectNotes}
                    setNotes={setRejectNotes}
                    onClose={() => setShowRejectModal(false)}
                    onReject={handleReject}
                />
            )}
            {showResolveModal && (
                <ResolveModal
                    show={showResolveModal}
                    ticket={ticket}
                    notes={resolveNotes}
                    setResolveNotes={setResolveNotes}
                    onClose={() => setShowResolveModal(false)}
                    onResolve={handleResolve}
                />
            )}
            {showCloseModal && (
                <CloseTicketModal
                    show={showCloseModal}
                    onClose={() => setShowCloseModal(false)}
                    onConfirm={handleCloseTicket}
                />
            )}
        </div>
    );
}
