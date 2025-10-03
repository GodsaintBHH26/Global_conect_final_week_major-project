import React, { useState } from "react";
import Header from "../components/Header";
import NetworkSidebar from "../components/NetworkSidebar";
import SuggestedConnectionCard from "../components/SuggestedConnectionCard";
import PLACEHOLDER_USER_AVATAR_URL from "../assets/user.png";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { useEffect } from "react";
// --- Dummy
const suggestedUsers = [
  {
    id: 1,
    name: "Arjun Sharma",
    headline: "Full-Stack Developer | Node.js",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 2,
    name: "Priya Singh",
    headline: "UI/UX Designer at WebCo",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 3,
    name: "Rohit Verma",
    headline: "DevOps Engineer",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 4,
    name: "Kirti Rao",
    headline: "React Native Enthusiast",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 5,
    name: "Suresh Iyer",
    headline: "Recruiter at TalentHub",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 6,
    name: "Tanvi Jain",
    headline: "Product Manager",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 7,
    name: "Vikas Gupta",
    headline: "Data Scientist",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
  {
    id: 8,
    name: "Anjali Dubey",
    headline: "MERN Stack Intern",
    avatar: "PLACEHOLDER_USER_AVATAR_URL",
  },
];

const MyNetworkPage = () => {
  const auth = useAuth();
  const [connections, setConnections] = useState([]);
  const [random, setRandom] = useState([]);

  const fetchConn = async () => {
    const conData = await API.get(`/user/${auth.user?.uid}`);
    const allConData = await Promise.all(
      conData.data.connections.map(async (id) => {
        const res = await API.get(`/user/${id}`);
        return res.data;
      })
    );
    setConnections(allConData);
  };
  const fetchRandom = async () => {
    const availableUsers = await API.get("/user/all");
    const currentUserId = auth.user?.uid;

    // grab only the IDs of connected users
    const connectedIds = connections.map((c) => c._id);

    // filter out self + connections
    const filtered = availableUsers.data.allUsers.filter(
      (u) => u._id !== currentUserId && !connectedIds.includes(u._id)
    );
    setRandom(filtered.slice(0, 6));
  };

  useEffect(() => {
    if (auth.user) {
      fetchConn();
    }
  }, [auth.user]);
  useEffect(() => {
    if (auth.user) {
      fetchRandom();
    }
  }, [auth.user, connections]);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "0",
        backgroundColor: "#f3f2ef",
      }}
    >
      <Header />

      <main
        className="container-3col"
        style={{
          padding: "1.5rem 0",
          display: "flex",
          gap: "1.5rem",
        }}
      >
        {/* = Network Sidebar] */}
        <div
          style={{
            position: "fixed",
            width: "240px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
            paddingBottom: "1rem",
            zIndex: 10,
          }}
        >
          <NetworkSidebar />
        </div>

        {/* Suggested Connections Grid */}
        <div
          style={{
            marginLeft: "255px",
            flexGrow: 1,
            maxWidth: "852px",
          }}
        >
          <div className="gc-card" style={{ padding: "1.5rem" }}>
            <h2
              style={{
                marginBottom: "1rem",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--gc-color-heading)",
              }}
            >
              Your Connections
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {connections.map((user) => (
                <SuggestedConnectionCard
                  key={user._id}
                  user={user}
                  connected={true}
                />
              ))}
            </div>
          </div>

          <div className="gc-card" style={{ padding: "1.5rem" }}>
            <h2
              style={{
                marginBottom: "1rem",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--gc-color-heading)",
              }}
            >
              People you may know
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {random.map((user) => (
                <SuggestedConnectionCard
                  key={user._id}
                  user={user}
                  connected={false}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyNetworkPage;
