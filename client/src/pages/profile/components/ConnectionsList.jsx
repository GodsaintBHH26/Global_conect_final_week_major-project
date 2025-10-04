import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import API from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { Search } from 'lucide-react';
const ConnectionsList = () => {
  const auth = useAuth()
  const [connections, setConnections] = useState([])
  const [user, setUser] = useState();

  const fetchUser = async()=>{
    const userData = await API.get(`/user/${auth.user.uid}`)
    setUser(userData.data);
    console.log(userData.data.connections)
  }

  const fetchConn = async ()=>{
    if(!user?.connections) return
    try {
      const connData = await Promise.all(
        user.connections.map(async (id)=>{
          const res = await API.get(`/user/${id}`);
          return res.data.name;
        })
      )
      setConnections(connData);
    } catch (error) {
      console.error("Failed to fetch connections:", err);
    }
  }

  useEffect(()=>{
    if(auth.user) fetchUser();
  }, [auth.user])
  useEffect(()=>{
    if(user) fetchConn();
  }, [user]);
  const AnalyticsCard = ({ user }) => (
    <div className="gc-card" style={{ padding: "1.5rem", marginBottom: "1rem", border: "1px solid var(--gc-color-border)", textAlign: 'center' }}>
        <h3 style={{ color: "var(--gc-color-text)", fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
            Analytics
            <span style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)', display: 'block' }}>Private to you</span>
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.8rem' }}>
            <div style={{ padding: '0.5rem' }}>
                <p style={{ color: "var(--gc-color-primary)", fontWeight: 700, fontSize: '1.25rem' }}>{user?.profileViews}</p>
                <p style={{ color: "var(--gc-color-text-muted)" }}>profile views</p>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <p style={{ color: "var(--gc-color-primary)", fontWeight: 700, fontSize: '1.25rem' }}>{user?.postImpressions}</p>
                <p style={{ color: "var(--gc-color-text-muted)" }}>post impressions</p>
            </div>
        </div>
        
        <button className="gc-link-primary" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>Show all analytics →</button>
    </div>
);



  return (
    <>
        {/* 🛑 NEW: Analytics Card */}
        <AnalyticsCard user={user} /> 

      <aside
        className="gc-card"
        style={{ padding: "1.5rem", border: "1px solid var(--gc-color-border)", marginTop: '1rem' }}
      >
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--gc-color-heading)" }}
        >
          Connections
        </h3>
        
        {/* Connection Search Input */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input 
                type="text" 
                placeholder="Search Connections"
                style={{ width: 'fit-content', padding: '0.5rem 0.5rem 0.5rem 2rem', borderRadius: '4px', border: '1px solid var(--gc-color-border)', backgroundColor: '#f3f6f8', outlineColor: 'var(--gc-color-primary)' , }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.5rem', top: '0.65rem', color: 'var(--gc-color-text-muted)' }} />
        </div>

        <ul className="space-y-2">
          {connections.length > 0 ? (
            connections.map((c, idx) => (
              <li
                key={idx}
                className="p-3 rounded"
                style={{
                  background: "#eef3f8", // Light gray background
                  color: "var(--gc-color-heading)", 
                  fontWeight: 500,
                  marginBottom: '8px'
                }}
              >
                {c}
              </li>
            ))
          ) : (
            <li
              className="text-sm"
              style={{ color: "var(--gc-color-text-muted)" }}
            >
              No connections yet
            </li>
          )}
        </ul>
      </aside>
    </>
  );
};
export default ConnectionsList;