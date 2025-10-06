import React, { useState } from "react";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import PremiumAdPanel from "../components/PremiumAdPanel";
import { useAuth } from "../context/AuthContext";

const MessagingPage = () => {
  const [activeChatUser, setActiveChatUser] = useState(null);
  const auth = useAuth();

  return (
    <div style={{ minHeight: "100vh", paddingTop: 0, backgroundColor: "#f3f2ef" }}>
      <Header />
      <main className="container-3col" style={{ padding: "1.5rem 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 3fr 1fr",
            gap: "1.5rem",
            height: "calc(100vh - 8rem)",
          }}
        >
          <div style={{ height: "100%" }}>
            {/* ChatList with dummy users */}
            <ChatList onSelectChat={setActiveChatUser} authUser={auth.user} />
          </div>

          <div style={{ height: "100%" }}>
            {/* Only show ChatWindow if a chat is selected */}
            {activeChatUser ? (
              <ChatWindow activeChatUser={activeChatUser} authUser={auth.user} />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#777",
                  fontSize: "1rem",
                  fontStyle: "italic",
                }}
              >
                Select a chat to start messaging
              </div>
            )}
          </div>

          <div
            style={{
              position: "sticky",
              top: "72px",
              height: "fit-content",
              width: "270px",
            }}
          >
            <PremiumAdPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagingPage;
