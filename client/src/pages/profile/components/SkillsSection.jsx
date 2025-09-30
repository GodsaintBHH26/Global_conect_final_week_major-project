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
    <div className="mt-6 p-4 rounded-lg bg-[var(--gc-color-white)]"
      style={{ border: "1px solid var(--gc-color-border)" }}
    >
      <h3 className="text-lg font-semibold text-[var(--gc-color-heading)] mb-3">
        Skills
      </h3>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          className="flex-1 p-2 rounded border"
          style={{ borderColor: "var(--gc-color-border)" }}
        />
        <button
          onClick={handleAddSkill}
          className="px-3 py-1 rounded text-sm"
          style={{
            backgroundColor: "var(--gc-color-primary)",
            color: "var(--gc-color-white)",
          }}
        >
          Add
        </button>
      </div>

      <ul className="flex flex-wrap gap-2">
        {(user.skills || []).map((skill, index) => (
          <li
            key={index}
            className="px-3 py-1 rounded text-sm flex items-center"
            style={{
              backgroundColor: "var(--gc-color-background)",
              border: "1px solid var(--gc-color-border)",
            }}
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 text-xs"
              style={{ color: "var(--gc-color-anchor)" }}
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
