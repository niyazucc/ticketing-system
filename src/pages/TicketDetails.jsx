import { useParams } from "react-router-dom";
import MapComponent from "../components/Map";


export default function TicketDetails() {
    const { id } = useParams();
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const ticket = tickets.find(t => t.id === parseInt(id));

    if (!ticket) return <p>Ticket not found.</p>;

    return (
        <>
            <div className="border rounded shadow-sm p-3">

                <div className="row">
                    <div className="col-lg-6">
                        <div className="grid gap-2">
                            <h3>Ticket Details</h3>
                            <p className="text-muted">Here are the details of your ticket.</p>
                            <p><strong>ID:</strong> {ticket.id}</p>
                            <p><strong>Title:</strong> {ticket.title}</p>
                            <p><strong>Category:</strong> {ticket.category}</p>
                            <p><strong>Description:</strong> {ticket.description}</p>

                            <p><strong>Location:</strong> {ticket.location ? `${ticket.location.lat}, ${ticket.location.lng}` : "No location"}</p>
                            <p><strong>Date:</strong> {ticket.date}</p>
                            <p><strong>Status:</strong> <span className={`badge bg-${ticket.status === "Open" ? "success" : "secondary"}`}>{ticket.status}</span></p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                         <MapComponent ticket={ticket} />
                    </div>
                </div>


            </div>



        </>

    );
}
