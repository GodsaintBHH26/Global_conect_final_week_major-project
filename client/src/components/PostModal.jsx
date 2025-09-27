import React, { useState } from 'react';
import { X, Globe, User, Image, Video, Calendar, Clock, Smile, Plus, Wand2 } from 'lucide-react';
import user from '../assets/user.png'; 
//dummydata
const currentUser = {
    name: "User",
    avatar: user,
};

const PostModal = ({ onClose }) => {
    const [postContent, setPostContent] = useState('');
    
    const isPostButtonEnabled = postContent.trim().length > 0;

    const handleSubmit = () => {
        if (!isPostButtonEnabled) return;
        
        console.log("Post data captured:", {
            user: currentUser.name,
            content: postContent,
        });

        alert("Post data captured successfully! Ready for backend submission.");

        setPostContent('');
        onClose();
    };
    return (
        <div className="gc-modal-backdrop" onClick={onClose}>
            <div 
                className="gc-modal-container" 
                onClick={(e) => e.stopPropagation()}>
                
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
                            {/* Visibility Selector Button */}
                            <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', border: '1px solid var(--gc-color-border)', borderRadius: '4px', marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--gc-color-text)' }}>
                                <Globe size={14} />
                                Post to Anyone
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose} 
                        className='gc-btn-reset' 
                        style={{ color: 'var(--gc-color-text-muted)', fontWeight:'900' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '0 1.5rem' }}>
                    <textarea
                        className="gc-modal-textarea"
                        placeholder="What do you want to talk about?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                </div>
                
                <div style={{ padding: '0 0 0.5rem 1.5rem' }}>
                    <button className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                        <Wand2 size={16} />
                        Rewrite with AI
                    </button>
                </div>


                <div className="gc-modal-footer">
                    
                    {/* Left Side Icons */}
                    <div className="gc-modal-actions">
                        <Image size={20} style={{ color: 'rgb(59, 130, 246)', cursor: 'pointer' }} />
                        <Video size={20} style={{ color: 'rgb(34, 197, 94)', cursor: 'pointer' }} />
                        <Calendar size={20} style={{ color: 'rgb(255, 165, 0)', cursor: 'pointer' }} />
                        
                        <button className='gc-btn-reset' style={{ color: 'var(--gc-color-text-muted)' }}>
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
                            onClick={handleSubmit} 
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