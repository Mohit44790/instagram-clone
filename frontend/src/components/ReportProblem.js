import React, { useState } from "react";
import "./ReportProblem.css";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
function ReportProblem() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const notifyB = (msg) => toast.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/report-problem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ subject, description, email }),
      });

      if (response.ok) {
        setSuccessMessage("Report submitted successfully");
        notifyB("Report Submit In Successfully");
        navigate("/");
      } else {
        const data = await response.json();
        setErrorMessage("Error submitting the report: " + data.error);
      }
    } catch (error) {
      setErrorMessage("Error submitting the report: " + error.message);
    }
  };

  return (
    // Inside your "ReportProblem" component
    <div className="report-form">
      <h2>Report a Problem</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default ReportProblem;
