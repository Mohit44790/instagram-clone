import React from "react";

const PushNotification = () => {
  return (
    <div>
      <h2>Push Notifications</h2>
      <p>
        Configure your push notification settings here. You can choose to
        receive notifications for various events and updates.
      </p>
      <div>
        <label>
          <input type="checkbox" /> Receive push notifications
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" /> Receive notifications for new messages
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" /> Receive notifications for updates
        </label>
      </div>
    </div>
  );
};

export default PushNotification;
