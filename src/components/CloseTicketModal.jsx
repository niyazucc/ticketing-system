import React, { useState } from "react";

export default function CloseTicketModal({ show, onClose, onConfirm }) {
    if (!show) return null; // Prevent rendering if not shown

    return (
        <>
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Ticket Closure</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-warning">
                                <h1><i className="bi bi-exclamation-circle-fill"></i></h1>
                                <p>Are you sure you want to close this ticket?</p>
                                <p>This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-danger" onClick={onConfirm}>Close Ticket</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
