import React, { useState, useEffect } from 'react';
import { Settings, Search, Ellipsis } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


// Dummy Users
const dummyUsers = [
  { _id: 'user1', name: 'Nandinee', status: 'Online', lastMessage: 'Hey there!', lastMessageTime: '1:05 PM' },
  { _id: 'user2', name: 'Arijit', status: 'Online', lastMessage: 'How are you?', lastMessageTime: '12:30 PM' },
  { _id: 'user3', name: 'Akriti', status: 'Offline', lastMessage: 'Talk later', lastMessageTime: 'Yesterday' },
  { _id: 'user4', name: 'Rocky', status: 'Offline', lastMessage: 'Talk later', lastMessageTime: 'Yesterday' },
  { _id: 'user5', name: 'Ashish', status: 'Offline', lastMessage: 'Talk later', lastMessageTime: 'Yesterday' },
  { _id: 'user6', name: 'Prasad', status: 'Offline', lastMessage: 'Talk later', lastMessageTime: 'Yesterday' },
];

const ChatListItem = ({ chat, isActive, onClick }) => (
  <div
    style={{
      padding: '1rem 0.5rem',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      backgroundColor: isActive ? '#f0f4f9' : '#fff',
    }}
    onClick={() => onClick(chat)}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img
          src={`https://placehold.co/40x40/54595F/FFFFFF?text=${chat.name.charAt(0)}`}
          alt={chat.name}
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <div style={{ overflow: 'hidden' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>{chat.name}</h3>
          <p style={{
            fontSize: '0.8rem',
            color: '#777',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {chat.lastMessage}
          </p>
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', color: '#999' }}>{chat.lastMessageTime}</span>
    </div>
  </div>
);



const ChatList = ({ onSelectChat, authUser }) => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleSelectUser = (user) => {
    onSelectChat(user);
    setShowNewChatModal(false);
  };

  return (
    <div className="gc-card" style={{ padding: "1rem" }}>
     <button
        onClick={() => setShowNewChatModal(true)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.5rem",
          backgroundColor: "var(--gc-color-primary)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        + New Chat
      </button>

      {/* Existing chats (dummy) */}
      {dummyUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectChat(user)}
          style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <strong>{user.name}</strong>
          <div style={{ fontSize: "0.8rem", color: "#777" }}>{user.status}</div>
        </div>
      ))}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className='gc-card'
          style={{
            position: "absolute",
            top: "100px",
            left: "195px",
            width: "250px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            zIndex: 100,
          }}
        >
          <h4 style={{ marginTop: 0 }}>Select user to chat</h4>
          {dummyUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSelectUser(user)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {user.name} ({user.status})
            </div>
          ))}

          <button
            onClick={() => setShowNewChatModal(false)}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem",
              width: "100%",
              backgroundColor: "#eee",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatList;