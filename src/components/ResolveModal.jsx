import React from 'react';

export default function ResolveModal({ show, ticket, notes, setResolveNotes, onClose, onResolve }) {
    if (!show) return null; // Prevent rendering if not shown

    return (
        <>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Resolve?</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-success">
                                <h1><i className="bi bi-check-circle-fill"></i></h1>
                                <p>Are you sure you want to mark this ticket as resolved?</p>
                                <p><strong>Ticket Title:</strong> {ticket?.title}</p>
                            </div>

                            {/* Textarea for resolution notes */}
                            <div className="mb-3">
                                <label className="form-label"><strong>Resolution Notes:</strong></label>
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    value={notes} 
                                    onChange={(e) => setResolveNotes(e.target.value)}
                                    placeholder="Describe how the issue was resolved..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-success" onClick={onResolve}>Resolve</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
