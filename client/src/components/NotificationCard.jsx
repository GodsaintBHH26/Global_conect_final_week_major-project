
import React from 'react';
import { Briefcase, MessageSquare, ThumbsUp, Users, Ellipsis, User } from 'lucide-react';

const getIcon = (type) => {
    switch (type) {
        case 'hiring': 
        case 'job_alert': 
        case 'hiring_connection': 
            return { Icon: Briefcase, color: '#0073B1' }; 
        case 'post_activity': 
            return { Icon: ThumbsUp, color: '#0073B1' }; 
        case 'new_opportunity': 
            return { Icon: MessageSquare, color: '#E06B20' }; 
        case 'company_update': 
            return { Icon: Users, color: '#525252' }; 
        default:
            return { Icon: User, color: '#525252' };
    }
};

const NotificationCard = ({ notification }) => {
    const { Icon, color } = getIcon(notification.type);
    
    const isNew = notification.time.includes('m') || notification.time.includes('h'); 

    return (
        <div 
            style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                padding: '0.75rem 1rem', 
                borderBottom: '1px solid var(--gc-color-border)', 
                cursor: 'pointer',
                backgroundColor: isNew ? '#f0f4f9' : 'var(--gc-color-white)', 
                transition: 'background-color 150ms',
                position: 'relative', 
            }}
        >
            {isNew && (
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--gc-color-primary)',
                    position: 'absolute',
                    left: '0.25rem',
                    top: '0.25rem',
                }} />
            )}

            <div style={{ marginRight: '0.75rem', flexShrink: 0 }}>
                <img 
                    src={`https://placehold.co/40x40/${(Math.random()*0xFFFFFF<<0).toString(16)}/FFFFFF?text=${notification.user.charAt(0)}`}
                    alt={notification.user}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
            </div>

            {/* Content Column */}
            <div style={{ flexGrow: 1, marginRight: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--gc-color-heading)', lineHeight: 1.4 }}>
                    <strong className="gc-link-primary" style={{ fontWeight: 600 }}>{notification.user}</strong> {notification.action}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)', marginTop: '0.25rem', display: 'block' }}>
                    {notification.time}
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)', marginBottom: '0.25rem' }}>
                    {notification.time}
                </span>
                <button className="gc-btn-reset" style={{ color: 'var(--gc-color-text-muted)' }}>
                    <Ellipsis size={18} />
                </button>
            </div>
        </div>
    );
};

export default NotificationCard;