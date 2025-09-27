import React, { useState } from 'react';
import { X, Globe, User, Image, Video, Calendar, Clock, Smile, Plus, Wand2 } from 'lucide-react';

// --- Placeholder Data ---
const currentUser = {
    name: "ProNet User",
    avatar: "https://placehold.co/40x40/54595F/FFFFFF?text=CU",
};

const PostModal = ({ onClose }) => {
    // State to track if the textarea has content (to enable the Post button)
    const [postContent, setPostContent] = useState('');
    
    // Determines if the Post button is enabled
    const isPostButtonEnabled = postContent.trim().length > 0;

    return (
        <div className="gc-modal-backdrop" onClick={onClose}>
            <div 
                className="gc-modal-container" 
                onClick={(e) => e.stopPropagation()} // Prevents clicking the modal from closing the backdrop
            >
                
                {/* Modal Header */}
                <div className="gc-modal-header">
                    <div className="gc-modal-user">
                        <img 
                            src={currentUser.avatar} 
                            alt={currentUser.name} 
                            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                        />
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gc-color-heading)' }}>
                                {currentUser.name}
                            </h3>
                            {/* Visibility Selector */}
                            <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', border: '1px solid var(--gc-color-border)', borderRadius: '4px', marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--gc-color-text)' }}>
                                <Globe size={14} />
                                Post to Anyone
                            </button>
                        </div>
                    </div>
                    
                    {/* Close Button */}
                    <button onClick={onClose} style={{ color: 'var(--gc-color-text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body - Text Area */}
                <div style={{ padding: '0 1.5rem' }}>
                    <textarea
                        className="gc-modal-textarea"
                        placeholder="What do you want to talk about?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                </div>
                
                {/* AI Rewrite Link */}
                <div style={{ padding: '0 0 0.5rem 1.5rem' }}>
                    <button className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                        <Wand2 size={16} />
                        Rewrite with AI
                    </button>
                </div>


                {/* Modal Footer */}
                <div className="gc-modal-footer">
                    
                    {/* Left Side Icons */}
                    <div className="gc-modal-actions">
                        {/* Image, Video, Event icons (Styled for clickability) */}
                        <Image size={20} style={{ color: 'rgb(59, 130, 246)', cursor: 'pointer' }} />
                        <Video size={20} style={{ color: 'rgb(34, 197, 94)', cursor: 'pointer' }} />
                        <Calendar size={20} style={{ color: 'rgb(255, 165, 0)', cursor: 'pointer' }} />
                        
                        {/* More icons/actions */}
                        <button style={{ color: 'var(--gc-color-text-muted)' }}>
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* Right Side Actions */}
                    <div className="gc-modal-actions">
                        <Smile size={20} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
                        <Clock size={20} style={{ color: 'var(--gc-color-text-muted)', borderRight: '1px solid var(--gc-color-border)', paddingRight: '0.5rem', cursor: 'pointer' }} />
                        
                        <button 
                            className="gc-btn-post" 
                            disabled={!isPostButtonEnabled}
                            onClick={() => {
                                alert(`Posting: "${postContent}"`);
                                onClose();
                            }}
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