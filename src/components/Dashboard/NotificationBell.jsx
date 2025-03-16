import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


export function addNotification(role, message) {
  const storageKey = `notifications_${role}`;
  const storedNotifications = JSON.parse(localStorage.getItem(storageKey)) || [];

  storedNotifications.push({ message });
  localStorage.setItem(storageKey, JSON.stringify(storedNotifications));
}


export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  // Get the correct storage key based on role
  const storageKey = `notifications_${user.role}`;

  

  useEffect(() => {
    if (!user.role) return; // Ensure role is provided

    // Retrieve notifications based on role
    const storedNotifications = JSON.parse(localStorage.getItem(storageKey)) || [];
    setNotifications(storedNotifications);
  }, [user.role]);

  useEffect(() => {
    const checkNewTicket = () => {
      const storedNotifications = JSON.parse(localStorage.getItem(storageKey)) || [];
      setNotifications(storedNotifications);
    };

    window.addEventListener("storage", checkNewTicket);
    return () => window.removeEventListener("storage", checkNewTicket);
  }, [user.role]);

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.setItem(storageKey, JSON.stringify([]));
  };

  return (
    <div className="dropdown me-3">
      <button className="btn btn-light position-relative" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        {notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown List */}
      <ul className="dropdown-menu dropdown-menu-end">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <li key={index} className="dropdown-item">
              <i className="bi bi-ticket-detailed"></i> {notif.message}
            </li>
          ))
        ) : (
          <li className="dropdown-item text-muted">No new notifications</li>
        )}
        {notifications.length > 0 && (
          <li>
            <button className="dropdown-item text-center text-primary" onClick={clearNotifications}>
              Clear Notifications
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
