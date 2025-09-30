
import React, { useState } from 'react'; 
import { Settings, Search, Ellipsis } from 'lucide-react';

// --- Dummy Chats ---
const initialChats = [
    { id: 1, user: "Project Lead", status: 'Online', lastMessage: "Let's review the API docs tomorrow.", date: "7:06 AM", category: 'focused' },
    { id: 2, user: "Developer", status: 'Offline', lastMessage: "Okay, thanks", date: "Sep 12", category: 'focused' },
    { id: 3, user: "UI/UX Designer", status: 'Online', lastMessage: "The new mockups are ready.", date: "Sep 10", category: 'unread' },
    { id: 4, user: "Recruiter Bob", status: 'Offline', lastMessage: "Still looking for a MERN role?", date: "Sep 6", category: 'focused' },
   
    { id: 5, user: "Tanvi Jain", status: 'Online', lastMessage: "Product roadmap update.", date: "Sep 3", category: 'unread' },
    { id: 6, user: "Vikas Gupta", status: 'Offline', lastMessage: "Data science internship opening.", date: "Jun 29", category: 'archived' },
    { id: 7, user: "Company HR", status: 'Online', lastMessage: "Follow up on your application.", date: "Jun 28", category: 'focused' },
    { id: 8, user: "DevOps Team", status: 'Offline', lastMessage: "Deployment script finalized.", date: "Jun 27", category: 'focused' },
     { id: 9, user: "Tanvi Jain", status: 'Online', lastMessage: "Product roadmap update.", date: "Sep 3", category: 'unread' },
    { id: 10, user: "Vikas Gupta", status: 'Offline', lastMessage: "Data science internship opening.", date: "Jun 29", category: 'archived' }
];

const categories = ['Focused', 'Unread', 'Archived'];

const ChatListItem = ({ chat, isActive, onClick }) => ( 
    <div 
        style={{ 
            padding: '1rem 0.5rem', 
            borderBottom: '1px solid var(--gc-color-border)',
            cursor: 'pointer',
            backgroundColor: isActive ? '#f0f4f9' : 'var(--gc-color-white)',
            transition: 'background-color 150ms'
        }}
        onClick={() => onClick(chat)} 
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img 
                src={`https://placehold.co/40x40/54595F/FFFFFF?text=${chat.user.charAt(0)}`} 
                alt={chat.user} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '0.75rem' }}
            />
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gc-color-heading)' }}>
                    {chat.user}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gc-color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {chat.lastMessage}
                </p>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)', textAlign: 'right' }}>
                {chat.date}
            </span>
        </div>
    </div>
);


const ChatList = ({ onSelectChat }) => {
    const [activeCategory, setActiveCategory] = useState('Focused');
    const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
    
    const filteredChats = initialChats.filter(chat => chat.category === activeCategory.toLowerCase());

    const handleChatClick = (chat) => {
        setActiveChatId(chat.id);
        onSelectChat(chat); 
    useState(() => {
        onSelectChat(initialChats[0]);
    }, []);
    }
    return (
        <div className="gc-card" style={{ height: '100%', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--gc-color-border)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gc-color-heading)' }}>Messaging</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Ellipsis size={20} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
                    <Settings size={20} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
                </div>
            </div>
            
            {/* Search Input */}
            <div style={{ padding: '0.75rem 1rem', position: 'relative', borderBottom: '1px solid var(--gc-color-border)' }}>
                <input 
                    type="text" 
                    placeholder="Search messages"
                    style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.5rem', borderRadius: '4px', border: '1px solid var(--gc-color-border)', backgroundColor: '#f3f6f8' }}
                />
                <Search size={16} style={{ position: 'absolute', left: '1.5rem', top: '1rem', color: 'var(--gc-color-text-muted)' }} />
            </div>

            {/* Categories (Focused, Unread, Archived) */}
            <div style={{ display: 'flex', padding: '0.5rem 1rem', borderBottom: '1px solid var(--gc-color-border)' }}>
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        style={{ 
                            padding: '0.5rem 1rem', 
                            fontSize: '0.9rem', 
                            fontWeight: 600,
                            color: activeCategory === category ? 'var(--gc-color-heading)' : 'var(--gc-color-text-muted)',
                            borderBottom: activeCategory === category ? '2px solid var(--gc-color-heading)' : '2px solid transparent',
                            backgroundColor: 'transparent',
                            border: 'none',
                            transition: 'color 150ms, border-color 150ms'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredChats.map(chat => (
                <ChatListItem 
                    key={chat.id} 
                    chat={chat} 
                    isActive={chat.id === activeChatId} 
                    onClick={handleChatClick} 
                /> 
            ))}
        </div>
    );
};

export default ChatList;