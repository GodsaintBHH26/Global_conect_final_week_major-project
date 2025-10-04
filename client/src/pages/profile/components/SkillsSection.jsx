import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const SkillsSection = () => {
  const { user, setUser } = useUser();
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setUser({
        ...user,
        skills: [...(user.skills || []), newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = user.skills.filter((_, i) => i !== index);
    setUser({ ...user, skills: updatedSkills });
  };

  
  return (
    <div 
        className="gc-card"
        style={{ border: "1px solid var(--gc-color-border)", padding: "1.5rem", marginTop: "1rem" }}
    >
      <h3 className="text-lg font-semibold text-[var(--gc-color-heading)] mb-3">
        Skills
      </h3>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          // Plain CSS conversion for input styling and branded focus ring
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid', borderColor: "var(--gc-color-border)", outlineColor: "var(--gc-color-primary)" }}
        />
        <button
          onClick={handleAddSkill}
          // Standardized primary button class
          className="gc-btn-reset px-3 py-1 text-sm rounded" 
              style={{ cursor: 'pointer', color: 'var(--gc-color-primary)', border: '1px solid var(--gc-color-primary)', fontWeight: 600 }}
            >
          Add
        </button>
      </div>

      {/* Skill Chips Container */}
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
        {(user.skills || []).map((skill, index) => (
          <li
            key={index}
            // Standardized chip styling
            style={{
                padding: '0.25rem 0.75rem', 
                borderRadius: '4px',
                backgroundColor: "#eef3f8", // Consistent light gray background
                border: "1px solid var(--gc-color-border)",
                color: "var(--gc-color-heading)", 
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
            }}
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(index)}
              className="gc-btn-reset"
              style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: "var(--gc-color-anchor)" }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsSection;

