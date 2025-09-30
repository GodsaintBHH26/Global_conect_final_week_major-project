import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const EducationSection = () => {
  const { user, setUser } = useUser();
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ school: "", degree: "", years: "" });

  const resetForm = () => setFormData({ school: "", degree: "", years: "" });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(user.education[index]);
  };

  const handleAdd = () => {
    setEditIndex(user.education.length); // new index
    resetForm();
  };

  const handleDelete = (index) => {
    const updatedEducation = [...user.education];
    updatedEducation.splice(index, 1);
    setUser({ ...user, education: updatedEducation });
  };

  const handleSave = () => {
    let updatedEducation = [...user.education];
    if (editIndex < user.education.length) {
      // update existing
      updatedEducation[editIndex] = formData;
    } else {
      // add new
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
      className="mt-6 p-4 rounded-lg bg-[var(--gc-color-white)]"
      style={{ border: "1px solid var(--gc-color-border)" }}
    >
      <h3 className="text-lg font-semibold text-[var(--gc-color-heading)] mb-3">
        Education
      </h3>

      {user.education.map((edu, index) => (
        <div
          key={index}
          className="mb-4 p-3 rounded border"
          style={{ borderColor: "var(--gc-color-border)" }}
        >
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="Degree"
                className="w-full p-2 mb-2 rounded border"
              />
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                placeholder="School"
                className="w-full p-2 mb-2 rounded border"
              />
              <input
                type="text"
                value={formData.years}
                onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                placeholder="Years (e.g., 2015 - 2019)"
                className="w-full p-2 mb-2 rounded border"
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
              <p className="font-medium text-[var(--gc-color-heading)]">{edu.degree}</p>
              <p className="text-sm text-[var(--gc-color-text-muted)]">
                {edu.school} | {edu.years}
              </p>
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

      {/* Add new education button */}
      {editIndex === null && (
        <button
          onClick={handleAdd}
          className="mt-2 px-4 py-2 text-sm rounded"
          style={{
            backgroundColor: "var(--gc-color-primary)",
            color: "var(--gc-color-white)",
          }}
        >
          + Add Education
        </button>
      )}
    </div>
  );
};

export default EducationSection;
