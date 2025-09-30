import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const ExperienceSection = () => {
  const { user, setUser } = useUser();
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ role: "", company: "", from: "", to: "", description: "" });

  const resetForm = () => setFormData({ role: "", company: "", from: "", to: "", description: "" });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(user.experience[index]);
  };

  const handleAdd = () => {
    setEditIndex(user.experience.length); // new index
    resetForm();
  };

  const handleDelete = (index) => {
    const updatedExperience = [...user.experience];
    updatedExperience.splice(index, 1);
    setUser({ ...user, experience: updatedExperience });
  };

  const handleSave = () => {
    let updatedExperience = [...user.experience];
    if (editIndex < user.experience.length) {
      // update existing
      updatedExperience[editIndex] = formData;
    } else {
      // add new
      updatedExperience.push(formData);
    }
    setUser({ ...user, experience: updatedExperience });
    setEditIndex(null);
    resetForm();
  };

  const handleCancel = () => {
    setEditIndex(null);
    resetForm();
  };

  return (
    <div
      className="mt-6 p-4 rounded-lg bg-[var(--gc-color-white)]"
      style={{ border: "1px solid var(--gc-color-border)" }}
    >
      <h3 className="text-lg font-semibold text-[var(--gc-color-heading)] mb-3">
        Experience
      </h3>

      {user.experience.map((exp, index) => (
        <div
          key={index}
          className="mb-4 p-3 rounded border"
          style={{ borderColor: "var(--gc-color-border)" }}
        >
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Role"
                className="w-full p-2 mb-2 rounded border"
              />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company"
                className="w-full p-2 mb-2 rounded border"
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  placeholder="From"
                  className="w-1/2 p-2 rounded border"
                />
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  placeholder="To"
                  className="w-1/2 p-2 rounded border"
                />
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                rows="3"
                className="w-full p-2 rounded border mb-2"
              />
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
            </>
          ) : (
            <>
              <h4 className="font-semibold text-[var(--gc-color-heading)]">{exp.role}</h4>
              <p className="text-[var(--gc-color-anchor)]">{exp.company}</p>
              <p className="text-xs text-[var(--gc-color-text-muted)]">
                {exp.from} - {exp.to}
              </p>
              <p className="mt-1 text-sm text-[var(--gc-color-text-muted)]">{exp.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-3 py-1 text-sm rounded"
                  style={{
                    backgroundColor: "var(--gc-color-white)",
                    color: "var(--gc-color-primary)",
                    border: "1px solid var(--gc-color-border)",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 text-sm rounded"
                  style={{
                    backgroundColor: "transparent",
                    color: "red",
                    border: "1px solid var(--gc-color-border)",
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Add new experience button */}
      {editIndex === null && (
        <button
          onClick={handleAdd}
          className="mt-2 px-4 py-2 text-sm rounded"
          style={{
            backgroundColor: "var(--gc-color-primary)",
            color: "var(--gc-color-white)",
          }}
        >
          + Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceSection;
