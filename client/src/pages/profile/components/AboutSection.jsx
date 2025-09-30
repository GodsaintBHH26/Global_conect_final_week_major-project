import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const AboutSection = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [about, setAbout] = useState(user?.about ?? "");

  const handleSave = () => {
    setUser({ ...user, about: about.trim() || user.about });
    setEditMode(false);
  };

  const handleCancel = () => {
    setAbout(user?.about ?? "");
    setEditMode(false);
  };

  return (
    <div className="mt-6 p-4 rounded-lg bg-[var(--gc-color-white)]"
      style={{ border: "1px solid var(--gc-color-border)" }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--gc-color-heading)]">
          About
        </h3>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-3 py-1 text-sm rounded"
            style={{
              backgroundColor: "var(--gc-color-white)",
              color: "var(--gc-color-primary)",
              border: "1px solid var(--gc-color-border)",
            }}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm rounded"
              style={{
                backgroundColor: "var(--gc-color-primary)",
                color: "var(--gc-color-white)",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm rounded"
              style={{
                backgroundColor: "transparent",
                color: "var(--gc-color-anchor)",
                border: "1px solid var(--gc-color-border)",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {!editMode ? (
        <p className="mt-2 text-[var(--gc-color-text-muted)]">
          {user?.about}
        </p>
      ) : (
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows="4"
          className="w-full mt-2 p-2 rounded border text-sm"
          style={{ borderColor: "var(--gc-color-border)" }}
        />
      )}
    </div>
  );
};

export default AboutSection;
