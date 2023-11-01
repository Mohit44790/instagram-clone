import React, { useState } from "react";
import "./SettingsPage.css";
import AccountCenter from "./AccountCenter";

import EmailNotification from "./EmailNotification";
import ProfessionalAccount from "./ProfessionalAccount";
import PushNotification from "./PushNotification";
import EditProfile from "./EditProfile";

function SettingsPage() {
  const [selectedPage, setSelectedPage] = useState("account");

  const renderContent = () => {
    switch (selectedPage) {
      case "account":
        return <AccountCenter />;
      case "profile-edit":
        return <EditProfile />;
      case "email":
        return <EmailNotification />;
      case "professional":
        return <ProfessionalAccount />;
      case "push":
        return <PushNotification />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="settings-container">
        <div className="settings-menu">
          <ul>
            <li>
              <button onClick={() => setSelectedPage("account")}>
                Account Center
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedPage("profile-edit")}>
                Edit Profile
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedPage("email")}>
                Email Notification
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedPage("professional")}>
                Professional Account
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedPage("push")}>
                Push Notification
              </button>
            </li>
          </ul>
        </div>
        <div className="settings-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default SettingsPage;
