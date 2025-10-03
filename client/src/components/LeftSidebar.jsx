import React, { useEffect, useState } from "react";
import { Bookmark, Users, Grid } from "lucide-react";
import background from "../assets/bg.jpg";
import userP from "../assets/user.png";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

// --- Dummy Data ---
const dummyUser = {
  name: "ProNet User",
  headline: "Student | Full-Stack Developer | React & Node",
  location: "India",
  profileViews: 156,
  postImpressions: 489,
  bannerUrl: background,
  avatarUrl: userP,
};

const LeftSidebar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const getUserDetails = async () => {
    try {
      const userData = await API.get(`/user/${auth.user?.uid}`);
      setUserDetails(userData.data);
      console.log(userData.data);
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    if (!auth.loading) {
      if (!auth.user) {
        navigate("/login");
      } else{
        getUserDetails();
      }
    }
  }, [auth.loading, auth.user]);

  return (
    <div className="gc-flex-col" style={{ gap: "8px" }}>
      {/* 1. Profile Card */}
      <div
        className="gc-card"
        style={{ textAlign: "center", overflow: "hidden" }}
      >
        {/* Banner and Avatar */}
        <div style={{ position: "relative" }}>
          <img
            src={dummyUser.bannerUrl}
            alt="User Banner"
            style={{ width: "100%", height: "4rem", objectFit: "cover" }}
          />
          <img
            src={dummyUser.avatarUrl}
            alt={dummyUser.name}
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
              border: "2px solid white",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
              bottom: "-2rem",
              zIndex: 10,
            }}
          />
        </div>
        {/* Name and Details */}
        <div
          className="gc-pt-10 gc-pb-3 gc-p-3"
          style={{ borderBottom: "1px solid var(--gc-color-border)" }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--gc-color-heading)",
              cursor: "pointer",
            }}
          >
            {auth.user?.name}
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--gc-color-text-muted)",
              marginTop: "0.25rem",
            }}
          >
            {userDetails?.bio}
          </p>
        </div>

        {/* Profile Metrics */}
        <div
          style={{
            padding: "0.5rem 0.75rem",
            borderBottom: "1px solid var(--gc-color-border)",
            fontSize: "0.875rem",
          }}
        >
          <div
            className="gc-flex gc-justify-between gc-align-center"
            style={{ padding: "0.25rem 0", cursor: "pointer" }}
          >
            <span style={{ color: "var(--gc-color-text-muted)" }}>
              Profile viewers
            </span>
            <span className="gc-link-primary" style={{ fontWeight: 700 }}>
              {dummyUser.profileViews}
            </span>
          </div>
          <div
            className="gc-flex gc-justify-between gc-align-center"
            style={{ padding: "0.25rem 0", cursor: "pointer" }}
          >
            <span style={{ color: "var(--gc-color-text-muted)" }}>
              Post impressions
            </span>
            <span className="gc-link-primary" style={{ fontWeight: 700 }}>
              {dummyUser.postImpressions}
            </span>
          </div>
        </div>

        {/* Premium Link */}
        <div
          style={{
            padding: "0.5rem 0.75rem",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "0.875rem",
          }}
        >
          <p style={{ color: "var(--gc-color-text-muted)" }}>
            Get hired faster with exclusive tools & features
          </p>
          <p
            className="gc-link-primary"
            style={{ fontWeight: 700, marginTop: "0.25rem" }}
          >
            Try Premium for 10
          </p>
        </div>
      </div>

      {/* 2. Quick Links Card */}
      <div
        className="gc-card gc-p-3"
        style={{
          textAlign: "left",
          fontSize: "0.875rem",
          color: "var(--gc-color-text-muted)",
        }}
      >
        <a
          href="#saved"
          className="gc-flex gc-align-center gc-space-x-2"
          style={{ padding: "0.375rem 0" }}
        >
          <Bookmark size={18} strokeWidth={1.5} />
          <span style={{ fontWeight: 600 }}>Saved Items</span>
        </a>
        <a
          href="#groups"
          className="gc-flex gc-align-center gc-space-x-2"
          style={{ padding: "0.375rem 0" }}
        >
          <Users size={18} strokeWidth={1.5} />
          <span style={{ fontWeight: 600 }}>Groups</span>
        </a>
        <a
          href="#events"
          className="gc-flex gc-align-center gc-space-x-2"
          style={{ padding: "0.375rem 0" }}
        >
          <Grid size={18} strokeWidth={1.5} />
          <span style={{ fontWeight: 600 }}>Events</span>
        </a>
      </div>
    </div>
  );
};

export default LeftSidebar;
