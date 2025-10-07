
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateArticle = ({ onClose, onCreate }) => {
  const [article, setArticle] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!article.title || !article.content) {
      toast.warn("Please fill all fields!");
      return;
    }

    // Pass data to parent component
    if (onCreate) {onCreate(article);}

    console.log("Article Created:", article);
    toast.info(`Article Published: ${article.title}`);

    // Reset form
    setArticle({ title: "", content: "" });

    // Close modal
    onClose();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 999,
        position: "fixed",
        inset: 0,
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#fff",
          padding: "24px",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "green",
          }}
        >
          Write New Article
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="Article Title"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
              }}
              required
            />
            <textarea
              placeholder="Write your article content..."
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              rows="6"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
              }}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: "green",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginRight: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#006400")}
                onMouseOut={(e) => (e.currentTarget.style.background = "green")}
              >
                Publish Article
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  background: "#ccc",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
                onClick={onClose}
                onMouseOver={(e) => (e.currentTarget.style.background = "#999")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#ccc")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
