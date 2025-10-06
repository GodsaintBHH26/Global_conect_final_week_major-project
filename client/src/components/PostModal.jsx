import React, { useState } from "react";
import { Image, Video, Calendar, Edit2, Smile, X } from "lucide-react";
import EmojiPicker from 'emoji-picker-react'; 
import user from "../assets/user.png";

// NOTE: Ensure 'emoji-picker-react' is installed

const PostModal = ({ onPostSuccess, onClose }) => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); 

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };
  
  const handleUploadAndPost = async () => {
    if (!content.trim() && !file) {
        alert("Please enter content or select a file to post.");
        return;
    }
    
    let uploadedFilePath = null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadRes = await fetch("http://localhost:3000/upload", { 
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
            const errorText = await uploadRes.text();
            console.error("File upload failed response:", errorText);
            alert(`File upload failed. Server response: ${uploadRes.status}`);
            return;
        }
        const uploadData = await uploadRes.json();
        uploadedFilePath = uploadData.filePath; 
      } catch (err) {
        console.error("Error during file upload:", err);
        alert("File upload error. Check console.");
        return;
      }
    }

    // Now create the post
    try {
      const postBody = { content };
      if (uploadedFilePath) {
          postBody.file = uploadedFilePath;
      }
      
      const postRes = await fetch("http://localhost:3000/api/posts", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify(postBody),
      });

      if (!postRes.ok) {
        const errorText = await postRes.text();
        console.error("Post creation failed response:", errorText);
        alert(`Post creation failed. Server response: ${postRes.status}`);
        return;
      }
      const newPost = await postRes.json();

      onPostSuccess(newPost); // Success: Updates the main feed
      onClose(); // Close the modal
      
      // Reset state for next post
      setFile(null);
      setContent("");
      setIsEmojiPickerOpen(false);
    } catch (err) {
      console.error("Error during post creation:", err);
      alert("Post creation error. Check console.");
    }
  };


  return (
    // 1. FULL SCREEN BACKDROP (Overlaying the whole page)
    <div 
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
            zIndex: 1000, // Ensure it's on top of everything
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start', // Align to top, similar to LinkedIn's style
            paddingTop: '60px', // Space from the top
        }}
        // Optional: Close modal if user clicks on the backdrop
        onClick={onClose}
    >
        {/* 2. THE MODAL CONTENT CONTAINER */}
        <div 
            className="gc-card" 
            style={{ 
                width: '500px', // Fixed width for the card
                maxWidth: '90%', 
                minHeight: '250px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                padding: '0', // Removing default padding from gc-card to control internal layout
            }}
            // Prevent clicks inside the card from closing the modal
            onClick={(e) => e.stopPropagation()} 
        >
            {/* Modal Header/User Info (Matches LinkedIn Style) */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--gc-color-border)' }}>
                <div className="gc-flex gc-align-center gc-space-x-2">
                    <img src={user} alt="User Avatar" style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
                    <div>
                        <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "var(--gc-color-heading)" }}>Nandinee Nargesh</h3>
                        <p style={{ fontSize: "0.875rem", color: "var(--gc-color-text-muted)" }}>Post to Anyone</p>
                    </div>
                </div>
                {/* Close button (Positioned relative to the whole modal) */}
                <button
                    onClick={onClose} 
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        border: "none",
                        background: "transparent",
                        fontSize: "1.25rem",
                        cursor: "pointer",
                        color: "var(--gc-color-text-muted)",
                        padding: '0',
                        lineHeight: '1',
                    }}
                >
                    <X size={24} />
                </button>
            </div>


            {/* Modal Body (Textarea and Inputs) */}
            <div style={{ padding: '16px 16px 0 16px' }}>
                <textarea
                    placeholder="What do you want to talk about?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ 
                        width: "100%", 
                        minHeight: "150px", 
                        border: 'none', 
                        padding: '0',
                        resize: 'none', // Disable textarea resizing
                        outline: 'none', // Remove focus outline
                        fontSize: '1rem'
                    }}
                />
            </div>

            {/* File Preview */}
            {file && (
                <div style={{ padding: '0 16px 8px 16px', fontSize: "0.8rem", color: "var(--gc-color-text-muted)" }}>
                    File selected: **{file.name}** <button onClick={() => setFile(null)} style={{ marginLeft: "10px", color: "red", border: "none", background: "transparent", cursor: "pointer" }}>
                        (Remove)
                    </button>
                </div>
            )}
            
            {/* Input/Icon Row (Bottom of the Modal Body) */}
            <div style={{ 
                padding: '8px 16px',
                borderTop: '1px solid var(--gc-color-border)', // Separator line for the icon row
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div className="gc-flex gc-align-center gc-space-x-2" style={{ position: 'relative' }}>
                    {/* Placeholder for Rewrite with AI (Matching LinkedIn Style) */}
                    <button style={{ 
                        border: '1px solid var(--gc-color-primary)', 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        color: 'var(--gc-color-primary)',
                        backgroundColor: 'transparent',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                    }}>
                        + Rewrite with AI
                    </button>

                    {/* Image Upload */}
                    <input type="file" id="modalImageUpload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                    <button className="gc-btn-base gc-btn-reset" onClick={() => { document.getElementById("modalImageUpload").click(); setFile(null); }}>
                        <Image size={20} style={{ color: "rgb(59, 130, 246)" }} />
                    </button>

                    {/* Video Upload */}
                    <input type="file" id="modalVideoUpload" accept="video/*" style={{ display: "none" }} onChange={handleFileChange} />
                    <button className="gc-btn-base gc-btn-reset" onClick={() => { document.getElementById("modalVideoUpload").click(); setFile(null); }}>
                        <Video size={20} style={{ color: "rgb(34, 197, 94)" }} />
                    </button>

                    {/* Other Icons */}
                    <button className="gc-btn-base gc-btn-reset">
                        <Calendar size={20} style={{ color: "rgb(255, 165, 0)" }} />
                    </button>
                    <button className="gc-btn-base gc-btn-reset" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
                        <Smile size={20} style={{ color: "rgb(255, 193, 7)" }} />
                    </button>
                    <button className="gc-btn-base gc-btn-reset">
                        <Edit2 size={20} style={{ color: "rgb(239, 68, 68)" }} />
                    </button>
                    {/* Plus Icon to match LinkedIn style */}
                    <button className="gc-btn-base gc-btn-reset">
                         <span style={{ fontSize: '1.5rem', lineHeight: '1', color: 'var(--gc-color-text-muted)' }}>+</span>
                    </button>


                    {/* FULL EMOJI PICKER WITH CLOSE BUTTON (Positioning adjusted for new layout) */}
                    {isEmojiPickerOpen && (
                        <div 
                            style={{ 
                                position: "absolute", 
                                zIndex: 15, 
                                top: "40px", 
                                left: "20px", // Adjusted position
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <button
                                onClick={() => setIsEmojiPickerOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    zIndex: 20, 
                                    background: "white",
                                    border: "1px solid #ccc",
                                    borderRadius: "50%",
                                    padding: "2px",
                                    cursor: "pointer",
                                    lineHeight: "1",
                                    width: "24px",
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <X size={16} />
                            </button>
                            <EmojiPicker 
                                onEmojiClick={onEmojiClick}
                                autoFocusSearch={false}
                                height={350}
                                width={300}
                            />
                        </div>
                    )}
                </div>

                {/* Footer and Post Button */}
                <div className="gc-flex gc-align-center gc-space-x-2">
                    <span style={{ color: 'var(--gc-color-text-muted)', fontSize: '0.875rem' }}>⏰</span>
                    <button
                        onClick={handleUploadAndPost}
                        className="gc-btn-base"
                        style={{ 
                            padding: '8px 20px',
                            backgroundColor: 'var(--gc-color-primary)', // Use a primary color for the button
                            color: 'white',
                            borderRadius: '20px',
                            fontWeight: '600'
                        }}
                        disabled={!content.trim() && !file}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PostModal;