import React from "react";
import { useUser } from "../../../context/UserContext";

const ConnectionsList = () => {
  const { user } = useUser();
  const connections = user?.connections ?? [];

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
