import React from "react";
import "./Notifications.css";
import NotificationData from "./NotificationData";

function Notifications({ onClose }) {
  const notifications = NotificationData; // Use NotificationData directly

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <img
              src={notification.user.profileImage}
              alt={`${notification.user.username}'s Profile`}
              className="notification-profile"
            />
            <div className="notification-content">
              <span className="notification-username">
                {notification.user.username}
              </span>
              <span>{notification.content}</span>
            </div>
            <div className="notification-timestamp">
              {formatTimestamp(notification.timestamp)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTimestamp(timestamp) {
  // Implement your logic for formatting the timestamp (e.g., using a library like Moment.js)
  return timestamp.toDateString();
}

export default Notifications;
