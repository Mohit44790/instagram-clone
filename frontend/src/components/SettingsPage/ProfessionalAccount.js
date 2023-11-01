// ProfessionalAccount.js
import React from "react";
import "./SettingsPage.css";

const ProfessionalAccount = () => {
  return (
    <div className="settings-content">
      <h2>Professional Account</h2>
      <div className="setting-item">
        <h3>Switch to Professional Account</h3>
        <p>Switch your account to a professional account.</p>
        <button>Switch</button>
      </div>
      <div className="setting-item">
        <h3>Contact Information</h3>
        <p>Add contact information to your profile.</p>
        <button>Edit Contact Info</button>
      </div>
      {/* Add more settings items as needed */}
    </div>
  );
};

export default ProfessionalAccount;
