
import React, { useState } from "react";

const EventModal = ({ onClose, onCreate }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!eventData.title || !eventData.date) {
      alert("Please fill all required fields!");
      return;
    }

    // Call onCreate to pass data to parent component
    onCreate(eventData);

    // Reset form and close modal
    setEventData({ title: "", date: "", description: "" });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        className="gc-card gc-p-4"
        style={{
          width: "400px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Create Event 📅</h2>

        <div className="gc-flex-col gc-space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Event Title *"
            value={eventData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />

          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />

          <textarea
            name="description"
            placeholder="Event Description..."
            value={eventData.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <div
            className="gc-flex gc-justify-between"
            style={{ marginTop: "1rem" }}
          >
            <button
              onClick={handleSubmit}
              style={{
                background: "rgb(59,130,246)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create
            </button>
            <button
              onClick={onClose}
              style={{
                background: "#ccc",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
