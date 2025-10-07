import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import React from "react";
import user1 from "../assets/user.png";
import { X, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";

const SuggestedConnectionCard = ({
  user,
  initiallyConnected,
  requests = false,
}) => {
  const auth = useAuth();
  const [connected, setConnected] = useState(initiallyConnected);
  const [dismissed, setDismissed] = useState(false);
  const [requested, setRequested] = useState(requests);

  const handleConnect = async () => {
    try {
      const res = await API.post(`/user/${user._id}/connect`);
      console.log("request send to ", res);
      toast.success(`Connection sent to ${user.name}`);
    } catch (error) {
      console.error("Error sending connection");
      toast.error("Can't send connection request");
    }
    // TODO: Add API call to connect with user
  };

  const handleViewProfile = () => {
    toast(`Viewing ${user.name}'s profile`);
    // TODO: Navigate to user's profile page
  };

  const handleAccept = async () => {
    try {
      const res = await API.post(`/user/${user._id}/accept`);
      console.log("Request Accepted", res);
      setConnected(true);
      toast.success("Request accepted");
    } catch (error) {
      toast.error("Can't connect ❌");
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    toast("Connection suggestion dismissed");
    // TODO: Optional API call to save dismissed suggestions
  };

  if (dismissed) return null; // hide card if dismissed

  return (
    <>
      <Toaster position="top-right" style={{ backgroundColor: "#ececec50" }} />
      <div
        className="gc-card"
        style={{
          padding: "0",
          textAlign: "center",
          overflow: "hidden",
          height: "100%",
          position: "relative",
          backgroundColor: "#ececec50",
        }}
      >
        {/* Dismiss button */}
        <button
          className="gc-btn-reset"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            color: "var(--gc-color-text-muted)",
          }}
          onClick={handleDismiss}
        >
          <X size={18} />
        </button>

        {/* Avatar & info */}
        <div style={{ padding: "1rem" }}>
          <img
            src={user.image || user1}
            alt={user.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid white",
              margin: "0 auto 0.5rem",
            }}
          />

          <h3
            className="gc-link-primary"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            {user.name}
          </h3>
          <p
            style={{
              color: "var(--gc-color-text-muted)",
              fontSize: "0.8rem",
              minHeight: "32px",
            }}
          >
            {user.bio}
          </p>
        </div>

        {/* Connect / View Profile Button */}
        {connected ? (
          <button
            className="gc-btn-base"
            style={{
              width: "90%",
              padding: "0.5rem",
              border: "1px solid var(--gc-color-primary)",
              color: "var(--gc-color-primary)",
              fontWeight: 600,
              marginBottom: "1rem",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              margin: "0.5rem auto 1rem auto",
            }}
            onClick={handleViewProfile}
          >
            View Profile
          </button>
        ) : requested ? (
          <button
            className="gc-btn-base"
            style={{
              width: "90%",
              padding: "0.5rem",
              border: "1px solid var(--gc-color-primary)",
              color: "var(--gc-color-primary)",
              fontWeight: 600,
              marginBottom: "1rem",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              margin: "0.5rem auto 1rem auto",
            }}
            onClick={handleAccept}
          >
            Accept
          </button>
        ) : (
          <button
            className="gc-btn-base"
            style={{
              width: "90%",
              padding: "0.5rem",
              border: "1px solid var(--gc-color-primary)",
              color: "var(--gc-color-primary)",
              fontWeight: 600,
              marginBottom: "1rem",
              borderRadius: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              margin: "0.5rem auto 1rem auto",
            }}
            onClick={handleConnect}
          >
            <UserPlus size={18} />
            Connect
          </button>
        )}
      </div>
    </>
  );
};

export default SuggestedConnectionCard;
