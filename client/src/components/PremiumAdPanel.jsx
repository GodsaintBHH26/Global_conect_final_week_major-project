
import React from 'react';
import { Briefcase, Check, X } from 'lucide-react';

const PremiumAdPanel = () => {
    return (
        <div className="gc-card" style={{ padding: '1rem', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                <X size={18} style={{ color: 'var(--gc-color-text-muted)', cursor: 'pointer' }} />
            </div>

            <img src="https://placehold.co/48x48/8224E3/FFFFFF?text=NN" alt="Profile" style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 0.5rem' }} />
            
            <p style={{ fontSize: '0.9rem', color: 'var(--gc-color-text)', marginBottom: '1rem' }}>
                Nandinee, boost your job search with **Premium**
            </p>

            <button className="gc-link-primary" style={{ border: '1px solid var(--gc-color-primary)', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontWeight: 600 }}>
                Try Premium for t0
            </button>

            <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gc-color-heading)', marginBottom: '0.5rem' }}>
                    Job search smarter with Premium
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--gc-color-text)' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <Check size={16} style={{ color: 'var(--gc-color-success)', marginRight: '0.5rem' }} />
                        Message anyone with InMail
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <Check size={16} style={{ color: 'var(--gc-color-success)', marginRight: '0.5rem' }} />
                        Unlock your profile viewers
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PremiumAdPanel;