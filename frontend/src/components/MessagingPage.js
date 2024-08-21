import React, { useEffect, useState } from "react";
import "./MessagingPage.css";
import { SERVER } from "./constants/server";
function Message() {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages from the server
    fetch(`${SERVER}/messages`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  const handleSendMessage = (id) => {
    if (newMessage.trim() !== "") {
      // Send a new message to the server
      fetch(`${SERVER}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"), // Replace with your actual access token
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
    }
  };

  return (
    <div className="message-box">
      <div className="message-header">
        <span>Chat with Someone</span>
      </div>
      <div className="message-content">
        {messages.map((message, index) => (
          <div key={index} className={message.sentByUser ? "user" : "other"}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Message;
