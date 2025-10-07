import React, { useState, useEffect } from "react";
import {
  Image,
  Video,
  Calendar,
  Edit2,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
} from "lucide-react";
import PostModal from "./PostModal";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import user from "../assets/user.png";
import { toast } from "react-toastify";

// Function to handle file upload directly from the main feed buttons
const handleFileUpload = async (files) => {
  if (!files || files.length === 0) return;

  const formData = new FormData();
  formData.append("file", files[0]);

  try {
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok)
      throw new Error("File upload failed on main feed button click.");
    const data = await res.json();
    console.log("Uploaded file info:", data);
    alert(
      `File uploaded successfully! Path: ${data.filePath}. Now, you must integrate this path into a new post creation.`
    );
  } catch (err) {
    console.error(err);
    alert("File upload failed. Check console.");
  }
};

// The simple post starter UI component
const PostCreator = ({ onStartPost }) => (
  <div className="gc-card gc-p-4" style={{ marginBottom: "1rem" }}>
       {" "}
    <div
      className="gc-flex gc-align-center gc-space-x-2"
      style={{ marginBottom: "0.75rem" }}
    >
           {" "}
      <img
        src={user}
        alt="User Avatar"
        style={{ width: "48px", height: "48px", borderRadius: "50%" }}
      />
           {" "}
      <button
        className="gc-btn-base"
        style={{
          flexGrow: 1,
          textAlign: "left",
          color: "var(--gc-color-text-muted)",
          border: "1px solid var(--gc-color-border)",
          borderRadius: "9999px",
          padding: "0.75rem 1rem",
        }}
        onClick={onStartPost}
      >
                Start a post      {" "}
      </button>
         {" "}
    </div>
       {" "}
    <div
      className="gc-flex gc-justify-between"
      style={{ color: "var(--gc-color-text-muted)", fontSize: "0.875rem" }}
    >
          
      {/* Functional Image Upload */}
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      <button
        className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset"
        style={{ borderRadius: "4px" }}
        onClick={() => document.getElementById("imageUpload")?.click()}
      >
        <Image size={20} style={{ color: "rgb(59, 130, 246)" }} />
      </button>
      {/* Functional Video Upload */}
      <input
        type="file"
        id="videoUpload"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      <button
        className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset"
        style={{ borderRadius: "4px" }}
        onClick={() => document.getElementById("videoUpload")?.click()}
      >
        <Video size={20} style={{ color: "rgb(34, 197, 94)" }} />
      </button>
           {" "}
      <button
        className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset"
        style={{ borderRadius: "4px" }}
      >
                <Calendar size={20} style={{ color: "rgb(255, 165, 0)" }} />   
         {" "}
      </button>
           {" "}
      <button
        className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset gc-lg-hidden"
        style={{ borderRadius: "4px" }}
      >
                <Edit2 size={20} style={{ color: "rgb(239, 68, 68)" }} />     {" "}
      </button>
         {" "}
    </div>
     {" "}
  </div>
);

const Post = ({ post }) => {
  const handleLike = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/like`);
      toast('Liked the post')
      console.log("Liked post: ", res);
    } catch (error) {
      toast.error("Can't like the post: Error");
      console.log("Error liking the post", error)
    }
  };
  return (
    <div className="gc-card" style={{ marginBottom: "1rem", padding: 0 }}>
         {" "}
      <div className="gc-flex gc-align-start gc-justify-between gc-p-4">
             {" "}
        <div className="gc-flex gc-align-center gc-space-x-2">
                 {" "}
          <img
            src={post.userId?.profilePic || user}
            alt={post.userId?.name || "User"}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
                 {" "}
          <div>
                     {" "}
            <h3
              style={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--gc-color-heading)",
              }}
            >
              {post.userId?.name || "Unknown User"}
            </h3>
                     {" "}
            <p style={{ fontSize: "1rem", color: "rgb(0,0,0,0.8)" }}>
              {post.content}
            </p>
                     {" "}
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--gc-color-text-muted)",
              }}
            >
              {new Date(post.createdAt).toLocaleString()}
            </p>
                   {" "}
          </div>
               {" "}
        </div>
             {" "}
        <button
          className="gc-btn-base gc-btn-reset"
          style={{ color: "var(--gc-color-text-muted)" }}
        >
          ...
        </button>
           {" "}
      </div>
         {" "}
      {post.image && (
        <img
          src={post.image}
          alt="Post Media"
          style={{ width: "100%", objectFit: "cover" }}
        />
      )}
         {" "}
      <div
        className="gc-flex gc-justify-between gc-align-center"
        style={{
          padding: "0.5rem 1rem",
          borderTop: "1px solid var(--gc-color-border)",
          fontSize: "0.75rem",
          color: "var(--gc-color-text-muted)",
        }}
      >
              <span>{post.likes?.length} Likes</span>     {" "}
        <span>{post.comments?.length} Comments</span>   {" "}
      </div>
         {" "}
      <div
        className="gc-flex gc-justify-between"
        style={{
          borderTop: "1px solid var(--gc-color-border)",
          padding: "0.25rem",
          color: "var(--gc-color-text-muted)",
        }}
      >
             {" "}
        <button
          className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset"
          style={{ borderRadius: "4px" }}
          onClick={handleLike}
        >
          <ThumbsUp size={18} />
          <span style={{ fontSize: "0.875rem" }}>Like</span>
        </button>
             {" "}
        <button
          className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset"
          style={{ borderRadius: "4px" }}
        >
          <MessageSquare size={18} />
          <span style={{ fontSize: "0.875rem" }}>Comment</span>
        </button>
             {" "}
        <button
          className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset gc-lg-hidden"
          style={{ borderRadius: "4px" }}
        >
          <Repeat2 size={18} />
          <span style={{ fontSize: "0.875rem" }}>Repost</span>
        </button>
             {" "}
        <button
          className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset gc-lg-hidden"
          style={{ borderRadius: "4px" }}
        >
          <Send size={18} />
          <span style={{ fontSize: "0.875rem" }}>Send</span>
        </button>
           {" "}
      </div>
       {" "}
    </div>
  );
};

const MainFeed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const auth = useAuth();

  const fetchFeed = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (auth.user) fetchFeed();
  }, [auth.user]);

  const handlePostSuccess = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setIsModalOpen(false); // Close modal on success
  };

  return (
    <div>
            <PostCreator onStartPost={() => setIsModalOpen(true)} />     {" "}
      <div style={{ position: "relative", margin: "0.75rem 0" }}>
                <hr style={{ borderColor: "var(--gc-color-border)" }} />       {" "}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f3f2ef",
            padding: "0 0.5rem",
            fontSize: "0.75rem",
            color: "var(--gc-color-text-muted)",
          }}
        >
                    Sort by: Top        {" "}
        </span>
             {" "}
      </div>
           {" "}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
           {" "}
      {isModalOpen && (
        <PostModal
          onClose={() => setIsModalOpen(false)}
          onPostSuccess={handlePostSuccess}
        />
      )}
         {" "}
    </div>
  );
};

export default MainFeed;
