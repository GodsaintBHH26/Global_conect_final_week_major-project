import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Paperclip, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { socket } from "../utils/socket.js";

// Single message bubble
const MessageBubble = ({ message }) => {
  const isSelf = message.sender === "self";
  return (
    <div style={{ display: "flex", justifyContent: isSelf ? "flex-end" : "flex-start" }}>
      <div
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "1rem",
          maxWidth: "70%",
          marginBottom: "0.5rem",
          fontSize: "0.9rem",
          lineHeight: 1.4,
          backgroundColor: isSelf ? "var(--gc-color-primary)" : "#eef3f8",
          color: isSelf ? "#fff" : "#000",
          borderRadius: isSelf ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
        }}
      >
        {message.text}
        <div
          style={{
            fontSize: "0.65rem",
            color: isSelf ? "rgba(255,255,255,0.7)" : "#777",
            textAlign: "right",
            marginTop: "0.5rem",
          }}
        >
          {message.time}
        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({ activeChatUser, authUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Dummy chat history per user
  useEffect(() => {
    if (!activeChatUser) return;

    const dummyHistory = [
      { id: 1, sender: "self", text: `Hi ${activeChatUser.name}!`, time: "12:00 PM" },
      { id: 2, sender: "other", text: `Hello ${authUser.name}, how are you?`, time: "12:01 PM" },
      { id: 3, sender: "self", text: "I am good, thanks!", time: "12:02 PM" },
      { id: 4, sender: "other", text: "Great to hear!", time: "12:03 PM" },
    ];

    setMessages(dummyHistory);
  }, [activeChatUser]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
  if (!input.trim()) return;

  const newMsg = {
    id: messages.length + 1,
    sender: "self",
    text: input,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  // Add self message
  setMessages((prev) => [...prev, newMsg]);
  setInput("");

  // Emit via socket
  socket.emit("sendMessage", {
    senderId: authUser.uid,
    receiverId: activeChatUser._id,
    content: newMsg.text,
    timestamp: new Date(),
  });

  // Simulate dummy reply after 1.5 seconds
  setTimeout(() => {
    const replyMsg = {
      id: messages.length + 2, // ensure unique id
      sender: "other",
      text: `Reply from ${activeChatUser.name} to "${input}"`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, replyMsg]);
  }, 1500);
};

  return (
    <div className="gc-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #eee",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{activeChatUser?.name}</h3>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#777" }}>{activeChatUser?.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flexGrow: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid #eee",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Write a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          style={{ flexGrow: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
