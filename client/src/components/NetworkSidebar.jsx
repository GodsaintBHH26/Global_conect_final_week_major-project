import React, { useEffect, useState } from "react";
import { Users, Briefcase, FileText, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import API from "../utils/api";

const SidebarLink = ({ Icon, label, count }) => (
  <a
    href={`#${label.toLowerCase().replace(" ", "-")}`}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem 0",
      fontSize: "1rem",
      fontWeight: 600,
      color: "var(--gc-color-text)",
      cursor: "pointer",
      transition: "color 150ms",
    }}
    className="gc-link-primary"
  >
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Icon size={20} style={{ color: "var(--gc-color-primary)" }} />
      <span>{label}</span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      {count !== undefined && (
        <span style={{ color: "var(--gc-color-primary)" }}>{count}</span>
      )}
      <ChevronRight size={16} style={{ color: "var(--gc-color-text-muted)" }} />
    </div>
  </a>
);

const NetworkSidebar = () => {
  const auth = useAuth();
  let [counts, setCounts] = useState({
    invitations: 0,
    contacts: 0,
  });
  const fetchCounts = async () => {
    try {
      const res = await API.get(`/user/${auth.user?.uid}`);
      setCounts((prev) => ({
        ...prev,
        invitations: res.data.connectionRequests.length,
        contacts: res.data.connections.length,
      }));
      console.log(counts);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (auth.user) {
      fetchCounts();
    }
  }, [auth.user]);

  return (
    <div className="gc-card" style={{ padding: "1rem", height: "fit-content" }}>
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "var(--gc-color-heading)",
        }}
      >
        Manage my network
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <SidebarLink Icon={Users} label="Connections" count={counts.contacts} />
        <SidebarLink
          Icon={FileText}
          label="Invitations"
          count={counts.invitations}
        />
        <SidebarLink Icon={Briefcase} label="Following" />
        <SidebarLink Icon={FileText} label="Teammates" />
        <SidebarLink Icon={FileText} label="Groups" />
        <SidebarLink Icon={FileText} label="Events" />
      </div>
    </div>
  );
};

export default NetworkSidebar;
