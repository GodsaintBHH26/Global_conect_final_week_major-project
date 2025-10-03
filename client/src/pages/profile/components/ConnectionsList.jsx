import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import API from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

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
  
  return (
    <aside
      className="bg-[var(--gc-color-white)] rounded-lg shadow p-6"
      style={{ border: "1px solid var(--gc-color-border)" }}
    >
      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--gc-color-heading)" }}
      >
        Connections
      </h3>

      <ul className="space-y-2">
        {connections.length > 0 ? (
          connections.map((c, idx) => (
            <li
              key={idx}
              className="p-2 rounded"
              style={{
                background: "var(--gc-color-background)",
                color: "var(--gc-color-text)",
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
  );
};

export default ConnectionsList;
