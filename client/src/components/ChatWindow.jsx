import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Paperclip, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { socket } from "../utils/socket.js";

// --- Dummy Messages ---
const initialMessages = [
  {
    id: 1,
    sender: "other",
    text: "Hi! Can you quickly review the Mongoose models we discussed?",
    time: "1:05 PM",
  },
  {
    id: 2,
    sender: "self",
    text: "Sure thing, I just pushed the final Post and User schemas.",
    time: "1:07 PM",
  },
  {
    id: 3,
    sender: "other",
    text: "Perfect. Let me know when you start the authentication routes.",
    time: "1:10 PM",
  },
  {
    id: 4,
    sender: "self",
    text: "Will do! Planning to start tomorrow morning. Check the repo then.",
    time: "1:12 PM",
  },
];

const MessageBubble = ({ message }) => {
  const isSelf = message.sender === "self";
  const bubbleStyle = {
    padding: "0.75rem 1rem",
    borderRadius: "1rem",
    maxWidth: "70%",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    lineHeight: 1.4,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isSelf ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...bubbleStyle,
          backgroundColor: isSelf ? "var(--gc-color-primary)" : "#eef3f8",
          color: isSelf ? "var(--gc-color-white)" : "var(--gc-color-text)",
          borderRadius: isSelf ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
        }}
      >
        {message.text}
        <div
          style={{
            fontSize: "0.65rem",
            color: isSelf
              ? "rgba(255, 255, 255, 0.7)"
              : "var(--gc-color-text-muted)",
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

const ChatWindow = ({ activeChatUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const auth = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!activeChatUser) return;

    const combined = [activeChatUser.id, auth.user?.uid].sort();
    const chatId = require("crypto")
      .createHash("md5")
      .update(combined)
      .digest("hex");

    socket.emit("joinRoom", chatId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("messageRead", ({ chatId, userId }) => {
      console.log("Messages marked as read", chatId, userId);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageRead");
    };
  }, [ auth.user, activeChatUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Functionality for sending a message
  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      senderId: auth.user?.uid,
      receiverId: activeChatUser.id,
      content: input.trim(),
      time: new Date(newMessage.createdAt || Date.now()).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
        }
      ),
    };

    socket.emit("sendMessage", newMessage);

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "self",
        text: input.trim(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");

    // 2. Placeholder for real-time (Socket.io) or API call
    console.log("SENDING MESSAGE:", newMessage);
  };

  const handleAttach = () => {
    alert(
      "File attachment functionality ready! (MERN backend required to handle upload)"
    );
  };

  const user = activeChatUser || { user: "Project Lead", status: "Online" };

  return (
    <div
      className="gc-card"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Header: Active Chat User */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--gc-color-border)",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--gc-color-heading)",
            }}
          >
            {user.user}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--gc-color-success)" }}>
            {user.status || "Active Now"}
          </p>
        </div>
        <MoreVertical
          size={20}
          style={{ color: "var(--gc-color-text-muted)", cursor: "pointer" }}
        />
      </div>

      {/* Chat Messages Area */}
      <div
        style={{
          flexGrow: 1,
          padding: "1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid var(--gc-color-border)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <input
          type="text"
          placeholder="Write a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{
            flexGrow: 1,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid var(--gc-color-border)",
            outline: "none",
          }}
        />
        <button onClick={handleAttach} className="gc-btn-reset">
          <Paperclip
            size={20}
            style={{ color: "var(--gc-color-text-muted)", cursor: "pointer" }}
          />
        </button>
        <button
          onClick={handleSend}
          className="gc-btn-primary"
          disabled={!input.trim()} // Disable if input is empty
          style={{
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          Send <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
