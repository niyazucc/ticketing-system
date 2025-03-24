import React from 'react';

export default function RejectModal({ show, ticket, notes, setNotes, onClose, onReject }) {
    if (!show) return null; // Prevent rendering if not shown

    return (
        <>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Reject?</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-danger">
                                <h1><i className="bi bi-exclamation-triangle-fill"></i></h1>
                                <p>Are you sure you want to reject this ticket?</p>
                                <p><strong>Ticket Title:</strong> {ticket?.title}</p>
                            </div>

                            {/* Textarea for rejection notes */}
                            <div className="mb-3">
                                <label className="form-label"><strong>Reason for Rejection:</strong></label>
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    value={notes} 
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Enter rejection reason..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-danger" onClick={onReject}>Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
