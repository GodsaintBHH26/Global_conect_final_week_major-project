
import React from 'react';
import user1 from '../assets/user.png';
import { X, UserPlus } from 'lucide-react';

const SuggestedConnectionCard = ({ user, connected }) => {
    return (
        <div className="gc-card" style={{ padding: '0', textAlign: 'center', overflow: 'hidden', height: '100%', position: 'relative' , backgroundColor:'#ececec50' }}>
            
           
            <button 
                className="gc-btn-reset" 
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: 'var(--gc-color-text-muted)' }}
                onClick={() => console.log(`Dismissed connection: ${user.name}`)}
            >
                <X size={18} />
            </button>

           
            <div style={{ padding: '1rem' }}>
                <img 
                    src={user1}
                    alt={user.name} 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid white', margin: '0 auto 0.5rem' }}
                />
                
                <h3 className="gc-link-primary" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    {user.name}
                </h3>
                <p style={{ color: 'var(--gc-color-text-muted)', fontSize: '0.8rem', minHeight: '32px' }}>
                    {user.bio}
                </p>
            </div>

            {/* Connect Button */}

            {connected?(<button 
                className="gc-btn-base" 
                style={{ 
                    width: '90%',
                    padding: '0.5rem',
                    border: '1px solid var(--gc-color-primary)',
                    color: 'var(--gc-color-primary)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    borderRadius: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    margin: '0.5rem auto 1rem auto'
                }}
                onClick={() => console.log(`Connecting with: ${user.name}`)}
            >
                View Profile
            </button>):(<button 
                className="gc-btn-base" 
                style={{ 
                    width: '90%',
                    padding: '0.5rem',
                    border: '1px solid var(--gc-color-primary)',
                    color: 'var(--gc-color-primary)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    borderRadius: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    margin: '0.5rem auto 1rem auto'
                }}
                onClick={() => console.log(`Connecting with: ${user.name}`)}
            >
                <UserPlus size={18} />
                Connect
            </button>)}
        </div>
    );
};

export default SuggestedConnectionCard;