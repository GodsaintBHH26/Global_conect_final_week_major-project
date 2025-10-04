import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const EducationSection = () => {
  const { user, setUser } = useUser();
  const [editIndex, setEditIndex] = useState(null); // null = not editing
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    years: "",
  });

  const resetForm = () => setFormData({ school: "", degree: "", years: "" });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(user.education[index]);
  };

  const handleAdd = () => {
    setEditIndex(user.education.length); // new item index
    resetForm();
  };

  const handleDelete = (index) => {
    const updatedEducation = [...user.education];
    updatedEducation.splice(index, 1);
    setUser({ ...user, education: updatedEducation });
    // Reset editIndex if deleting currently edited item
    if (editIndex === index) {
      setEditIndex(null);
      resetForm();
    }
  };

  const handleSave = () => {
    const updatedEducation = [...user.education];
    if (editIndex < user.education.length) {
      updatedEducation[editIndex] = formData;
    } else {
      updatedEducation.push(formData);
    }
    setUser({ ...user, education: updatedEducation });
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
        Education
      </h3>

      {/* Existing education entries */}
      {user.education.map((edu, index) => (
        <div
          key={index}
          style={{
            paddingBottom: "1rem",
            marginBottom: "1rem",
            borderBottom:
              index < user.education.length - 1 && editIndex === null
                ? "1px solid var(--gc-color-border)"
                : "none",
          }}
        >
          {editIndex === index ? (
            // Edit mode
            <div>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                placeholder="Degree"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid var(--gc-color-border)",
                  outlineColor: "var(--gc-color-primary)",
                }}
              />
              <input
                type="text"
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
                }
                placeholder="School"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid var(--gc-color-border)",
                  outlineColor: "var(--gc-color-primary)",
                }}
              />
              <input
                type="text"
                value={formData.years}
                onChange={(e) =>
                  setFormData({ ...formData, years: e.target.value })
                }
                placeholder="Years (e.g., 2019 - 2023)"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid var(--gc-color-border)",
                  outlineColor: "var(--gc-color-primary)",
                }}
              />
              <div className="flex gap-2 mt-2 justify-end">
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
          ) : (
            // Display mode
            <div>
              <p
                className="font-semibold text-[var(--gc-color-heading)]"
                style={{ fontSize: "1.1rem" }}
              >
                {edu.degree}
              </p>
              <p className="text-sm text-[var(--gc-color-text)]">
                {edu.school} | {edu.years}
              </p>
              <div className="flex gap-2 mt-3">
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
            </div>
          )}
        </div>
      ))}

      {/* Add new education */}
      {editIndex === user.education.length && (
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
            placeholder="Degree"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              border: "1px solid var(--gc-color-border)",
              outlineColor: "var(--gc-color-primary)",
            }}
          />
          <input
            type="text"
            value={formData.school}
            onChange={(e) =>
              setFormData({ ...formData, school: e.target.value })
            }
            placeholder="School"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              border: "1px solid var(--gc-color-border)",
              outlineColor: "var(--gc-color-primary)",
            }}
          />
          <input
            type="text"
            value={formData.years}
            onChange={(e) =>
              setFormData({ ...formData, years: e.target.value })
            }
            placeholder="Years (e.g., 2019 - 2023)"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              border: "1px solid var(--gc-color-border)",
              outlineColor: "var(--gc-color-primary)",
            }}
          />
          <div className="flex gap-2 mt-2 justify-end">
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

      {/* Add Education button */}
      {editIndex === null && (
        <button
          onClick={handleAdd}
          className="gc-btn-primary mt-2 px-4 py-2 text-sm rounded"
        >
          + Add Education
        </button>
      )}
    </div>
  );
};

export default EducationSection;
