 
 import React, { useState } from 'react';
import { Image, Video, Calendar, Edit2, ThumbsUp, MessageSquare, Repeat2, Send } from 'lucide-react';
import user from '../assets/user.png'
import db from '../assets/mongo.png';
import globalc from '../assets/globalconn.jpg';
import PostModal from './PostModal';
// --- Dummy Data ---
const dummyPosts = [
  {
    id: 1,
    user: { name: "Anurima Dutta", headline: "CEO/Founder at Global Connect", avatar: user },
    timestamp: "3h ago",
    content: "Thrilled to announce that Global_Connect has successfully secured Series A funding! This growth is all thanks to our amazing community. Let's keep building connections and careers!",
    image: globalc,
    likes: 125,
    comments: 42,
  },
  {
    id: 2,
    user: { name: "Harish Neelam", headline: "2nd Year SEO @Tech Solutions", avatar: user },
    timestamp: "5d ago",
    content: "Just finished a fantastic course on advanced MongoDB indexing. If you're working with MERN stack, optimizing those queries is a game-changer. Anyone else diving deep into database performance this week?",
    image: db,
    likes: 58,
    comments: 11,
  },
];


const PostCreator = ({ onStartPost }) => (
  <div className="gc-card gc-p-4" style={{ marginBottom: '1rem' }}>
    <div className="gc-flex gc-align-center gc-space-x-2" style={{ marginBottom: '0.75rem' }}>
      <img 
        src={user} 
        alt="User Avatar" 
        style={{ width: '48px', height: '48px', borderRadius: '50%' }}
      />
       <button 
        className="gc-btn-base" 
        style={{ flexGrow: 1, textAlign: 'left', color: 'var(--gc-color-text-muted)', border: '1px solid var(--gc-color-border)', borderRadius: '9999px', padding: '0.75rem 1rem' }}
        onClick={onStartPost}
       


      >
        Start a post
      </button>
    </div>



    {/* Action buttons (Photo, Video, etc.) */}

    <div className="gc-flex gc-justify-between" style={{ color: 'var(--gc-color-text-muted)', fontSize: '0.875rem' }}>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset" style={{ borderRadius: '4px' }}>
        <Image size={20} style={{ color: 'rgb(59, 130, 246)' }} />
        <span style={{ display: 'none' }}>Photo</span>
      </button>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset" style={{ borderRadius: '4px' }}>
        <Video size={20} style={{ color: 'rgb(34, 197, 94)' }} />
        <span style={{ display: 'none' }}>Video</span>
      </button>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset" style={{ borderRadius: '4px' }}>
        <Calendar size={20} style={{ color: 'rgb(255, 165, 0)' }} />
        <span style={{ display: 'none' }}>Event</span>
      </button>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset gc-lg-hidden" style={{ borderRadius: '4px' }}>
        <Edit2 size={20} style={{ color: 'rgb(239, 68, 68)' }} />
        <span style={{ display: 'none' }}>Write article</span>
      </button>
    </div>
  </div>
);

const Post = ({ post }) => (
  <div className="gc-card" style={{ marginBottom: '1rem', padding: 0 }}>
    {/* Header */}
    <div className="gc-flex gc-align-start gc-justify-between gc-p-4">
      <div className="gc-flex gc-align-center gc-space-x-2">
        <img src={post.user.avatar} alt={post.user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <div>
          <h3 style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--gc-color-heading)' }}>{post.user.name}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)' }}>{post.user.headline}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)' }}>{post.timestamp}</p>
        </div>
      </div>
      <button className="gc-btn-base gc-btn-reset" style={{ color: 'var(--gc-color-text-muted)' }}>...</button>
    </div>
    
    {/* Content */}
    <div style={{ padding: '0 1rem 0.75rem 1rem' }}>
      <p style={{ color: 'var(--gc-color-text)', fontSize: '0.875rem' }}>{post.content}</p>
    </div>

    {/* Image/Media */}
    {post.image && (
      <img src={post.image} alt="Post Media" style={{ width: '100%', objectFit: 'cover' }} />
    )}

    {/* Footer Metrics */}
    <div className="gc-flex gc-justify-between gc-align-center" style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--gc-color-border)', fontSize: '0.75rem', color: 'var(--gc-color-text-muted)' }}>
      <span>{post.likes} Likes</span>
      <span>{post.comments} Comments</span>
    </div>

    {/* Action Buttons */}
    <div className="gc-flex gc-justify-between" style={{ borderTop: '1px solid var(--gc-color-border)', padding: '0.25rem', color: 'var(--gc-color-text-muted)' }}>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset" style={{ borderRadius: '4px' }}>
        <ThumbsUp size={18} />
        <span style={{ fontSize: '0.875rem' }}>Like</span>
      </button>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset" style={{ borderRadius: '4px' }}>
        <MessageSquare size={18} />
        <span style={{ fontSize: '0.875rem' }}>Comment</span>
      </button>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset gc-lg-hidden" style={{ borderRadius: '4px' }}>
        <Repeat2 size={18} />
        <span style={{ fontSize: '0.875rem' }}>Repost</span>
      </button>
      <button className="gc-flex gc-align-center gc-space-x-2 gc-p-2 gc-btn-base gc-btn-reset gc-lg-hidden" style={{ borderRadius: '4px' }}>
        <Send size={18} />
        <span style={{ fontSize: '0.875rem' }}>Send</span>
      </button>
    </div>
  </div>
);
const MainFeed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <div>
      <PostCreator onStartPost={() => setIsModalOpen(true)} />
      
      {/* Divider */}
      <div style={{ position: 'relative', margin: '0.75rem 0' }}>
        <hr style={{ borderColor: 'var(--gc-color-border)' }} />
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#f3f2ef', padding: '0 0.5rem', fontSize: '0.75rem', color: 'var(--gc-color-text-muted)' }}>
          Sort by: Top
        </span>
      </div>

      {dummyPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      
      {isModalOpen && <PostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
export default MainFeed;