import React, { useState, useEffect } from "react";

const MessagingPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages from the server using the native fetch method
    fetch("http://localhost:5000/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Fetch error: ${response.status} - ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSendMessage = () => {
    // Send a new message to the server using the native fetch method
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ text: newMessage, sender: "User" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <span className="message-sender">{message.sender}:</span>{" "}
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagingPage;
