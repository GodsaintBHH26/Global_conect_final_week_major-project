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
    // [PLACEHOLDER: Add API Call to Save]
  };

  const handleSave = () => { // 🛑 FIX: Removed 'async' and simplified logic
    let updatedExperience = [...user.experience];
    if (editIndex < user.experience.length) {
      updatedExperience[editIndex] = formData;
    } else {
      updatedExperience.push(formData);
    }
    
    setUser({ ...user, experience: updatedExperience }); // Fallback to local state update

    setEditIndex(null);
    resetForm();
  };

  const handleCancel = () => {
    setEditIndex(null);
    resetForm();
  };

 return (
  <div
    className="gc-card"
    style={{
      border: "1px solid var(--gc-color-border)",
      padding: "1.5rem",
      marginTop: "1rem",
    }}
  >
    <h3 className="text-lg font-semibold text-[var(--gc-color-heading)] mb-3">
      Experience
    </h3>

    {/* Existing experiences */}
    {user.experience.map((exp, index) => (
      <div
        key={index}
        style={{
          paddingBottom: "1rem",
          marginBottom: "1rem",
          borderBottom:
            index < user.experience.length - 1 && editIndex === null
              ? "1px solid var(--gc-color-border)"
              : "none",
        }}
      >
        {editIndex === index ? (
          <>
            {/* --- EDIT FORM --- */}
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="Role"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: "var(--gc-color-border)",
                outlineColor: "var(--gc-color-primary)",
              }}
            />
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Company"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: "var(--gc-color-border)",
                outlineColor: "var(--gc-color-primary)",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="text"
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
                placeholder="From"
                style={{
                  width: "50%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor: "var(--gc-color-border)",
                  outlineColor: "var(--gc-color-primary)",
                }}
              />
              <input
                type="text"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                placeholder="To"
                style={{
                  width: "50%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor: "var(--gc-color-border)",
                  outlineColor: "var(--gc-color-primary)",
                }}
              />
            </div>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              rows="3"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid",
                marginBottom: "0.5rem",
                borderColor: "var(--gc-color-border)",
                outlineColor: "var(--gc-color-primary)",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
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
          </>
        ) : (
          <>
            {/* --- DISPLAY VIEW --- */}
            <h4
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "var(--gc-color-heading)",
              }}
            >
              {exp.role}
            </h4>
            <p
              style={{
                color: "var(--gc-color-anchor)",
                fontWeight: 500,
              }}
            >
              {exp.company}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--gc-color-text-muted)",
              }}
            >
              {exp.from} - {exp.to}
            </p>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--gc-color-text)",
              }}
            >
              {exp.description}
            </p>

            {/* --- EDIT/DELETE BUTTONS --- */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "0.75rem",
              }}
            >
              <button
                onClick={() => handleEdit(index)}
                className="gc-btn-reset px-3 py-1 text-sm rounded"
                style={{
                  color: "var(--gc-color-primary)",
                  border: "1px solid var(--gc-color-border)",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="gc-btn-reset px-3 py-1 text-sm rounded"
                style={{
                  color: "var(--gc-color-error)",
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

    {/* --- ADD NEW EXPERIENCE FORM (when adding) --- */}
    {editIndex === user.experience.length && (
      <div
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid var(--gc-color-border)",
        }}
      >
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="Role"
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            border: "1px solid",
            borderColor: "var(--gc-color-border)",
            outlineColor: "var(--gc-color-primary)",
          }}
        />
        <input
          type="text"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          placeholder="Company"
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            border: "1px solid",
            borderColor: "var(--gc-color-border)",
            outlineColor: "var(--gc-color-primary)",
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <input
            type="text"
            value={formData.from}
            onChange={(e) =>
              setFormData({ ...formData, from: e.target.value })
            }
            placeholder="From"
            style={{
              width: "50%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: "var(--gc-color-border)",
              outlineColor: "var(--gc-color-primary)",
            }}
          />
          <input
            type="text"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            placeholder="To"
            style={{
              width: "50%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: "var(--gc-color-border)",
              outlineColor: "var(--gc-color-primary)",
            }}
          />
        </div>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
          rows="3"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid",
            marginBottom: "0.5rem",
            borderColor: "var(--gc-color-border)",
            outlineColor: "var(--gc-color-primary)",
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
      </div>
    )}

    {/* --- ADD BUTTON (only when not editing) --- */}
    {editIndex === null && (
      <button
        onClick={handleAdd}
        className="gc-btn-primary mt-2 px-4 py-2 text-sm rounded"
      >
        + Add Experience
      </button>
    )}
  </div>
);
};
export default ExperienceSection;