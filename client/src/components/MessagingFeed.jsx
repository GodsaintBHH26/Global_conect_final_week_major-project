
import React from 'react';import { MoreVertical, Paperclip, Send, User, Ellipsis } from 'lucide-react'; // <-- ADD Ellipsis HERE

// --- Dummy 
const promoAd = {
    title: "Join Us for Snowflake BUILD: The AI and Apps Conference",
    content: "I'm thrilled to invite you to Snowflake BUILD, the largest AI and data apps virtual conference on developers, on Nov. 5–7.",
    buttonLabel: "Register Now"
};


const PromoCard = ({ promo }) => (
    <div className="gc-card" style={{ padding: '1rem 1.5rem', borderLeft: '3px solid var(--gc-color-primary)', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gc-color-heading)' }}>
                {promo.title}
            </h4>
            <Ellipsis size={20} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
        </div>
        
        {/* Ad Sender Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <img src="https://placehold.co/40x40/54595F/FFFFFF?text=DS" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div>
                <p style={{ fontWeight: 600, color: 'var(--gc-color-text)' }}>Dash Desai</p>
                <p style={{ color: 'var(--gc-color-text-muted)' }}>Principal Developer Advocate | Keynote Demos | Global Speaker...</p>
            </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--gc-color-text)', marginBottom: '1rem' }}>
            {promo.content}
        </p>

        <button className="gc-btn-primary" style={{ padding: '0.6rem 1.5rem', backgroundColor: '#007bff' /* Custom blue button */ }}>
            {promo.buttonLabel}
        </button>
    </div>
);

const MessageBubble = ({ message }) => {
    const isSelf = message.sender === 'self';
    const bubbleStyle = {
        padding: '0.75rem 1rem',
        borderRadius: '1rem',
        maxWidth: '70%',
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
        lineHeight: 1.4
    };

    return (
        <div style={{ display: 'flex', justifyContent: isSelf ? 'flex-end' : 'flex-start' }}>
            <div style={{
                ...bubbleStyle,
                backgroundColor: isSelf ? 'var(--gc-color-primary)' : '#eef3f8',
                color: isSelf ? 'var(--gc-color-white)' : 'var(--gc-color-text)',
                borderRadius: isSelf ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0'
            }}>
                {message.text}
                <div style={{ fontSize: '0.65rem', color: isSelf ? 'rgba(255, 255, 255, 0.7)' : 'var(--gc-color-text-muted)', textAlign: 'right', marginTop: '0.5rem' }}>1:05 PM</div>
            </div>
        </div>
    );
};
const dummyMessages = [
    { id: 1, sender: 'other', text: 'Hi! Can you quickly review the Mongoose models we discussed?' },
    { id: 2, sender: 'self', text: 'Sure thing, I just pushed the final Post and User schemas.' },
];
const MessagingFeed = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
            <PromoCard promo={promoAd} />

            {/* 2. Main Chat Window */}
            <div className="gc-card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Header: Active Chat User */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--gc-color-border)' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gc-color-heading)' }}>Project Lead</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--gc-color-success)' }}>Online</p>
                    </div>
                    <MoreVertical size={20} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
                </div>

                {/* Chat Messages Area */}
                <div style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {dummyMessages.map(msg => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                </div>

                {/* Input Footer */}
                <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--gc-color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                        type="text"
                        placeholder="Write a message..."
                        style={{ flexGrow: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gc-color-border)', outline: 'none' }}
                    />
                    <Paperclip size={20} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
                    <button className="gc-btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Send <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagingFeed;