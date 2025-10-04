import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const AboutSection = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [about, setAbout] = useState(user?.about ?? "");

  const handleSave = () => {
    setUser({ ...user, about: about.trim() || user.about });
    // [PLACEHOLDER: Add API Call Here]
    setEditMode(false);
  };

  const handleCancel = () => {
    setAbout(user?.about ?? "");
    setEditMode(false);
  };

  return (
    <div 
        className="gc-card"
        style={{ border: "1px solid var(--gc-color-border)", padding: "1.5rem", marginTop: "1.5rem" }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--gc-color-heading)]">
          About
        </h3>
        
        {/* Edit Button */}
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="gc-btn-reset"
            style={{ border: '1px solid var(--gc-color-primary)',color: "var(--gc-color-primary)", fontWeight: 600, fontSize: '0.9rem' }}
          >
            Edit
          </button>
        )}
      </div>
        
      {!editMode ? (
  <div>
    {/* Display Content */}
    <p
      className="mt-3 p-3 rounded"
      style={{ color: "var(--gc-color-text)", fontSize: '0.9rem' }}
    >
      {user?.about || "write bio here."}
    </p>
  </div>
) : (
  <div>
    {/* Edit Mode Textarea */}
    <textarea
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      rows="4"
      className="w-full mt-3 p-3 rounded border text-sm"
      style={{ borderColor: "var(--gc-color-border)", outlineColor: "var(--gc-color-primary)" }}
    />
  </div>
)}


      {editMode && (
          <div className="flex gap-2 mt-3 justify-end">
            <button
              onClick={handleSave}
              className="gc-btn-primary px-3 py-1 text-sm rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="gc-btn-reset px-3 py-1 text-sm rounded"
              style={{
                color: "var(--gc-color-anchor)",
                border: "1px solid var(--gc-color-border)",
              }}
            >
              Cancel
            </button>
          </div>
      )}
    </div>
  );
};

export default AboutSection;