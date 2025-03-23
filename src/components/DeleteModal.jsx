export default function DeleteModal({ show, ticket, onClose, onDelete, isReject }) {
    if (!show) return null; // Prevent rendering if not shown

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center text-danger">

                        <h1><i class="bi bi-exclamation-triangle-fill"></i></h1>
                        <p>Are you sure you want to delete this ticket?</p>
                        <p><strong>Ticket Title:</strong>   {ticket?.title}</p> 
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
