
import React from 'react';
import { Briefcase, MapPin, User, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
    return (
        <div className="gc-card" style={{ marginBottom: '1rem', padding: '1rem',  paddingRight:'1.5rem', paddingLeft:'1.7rem'  }}>
            
            {/* Header: Title and Company */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 className="gc-link-primary" style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {job.title}
                    </h3>
                    <p style={{ color: 'var(--gc-color-text)', fontSize: '0.9rem' }}>{job.company}</p>
                </div>
             
                <button className="gc-btn-reset" style={{ color: 'var(--gc-color-text-muted)', padding: '0.25rem' }}>
                    <Briefcase size={20} />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gc-color-text-muted)' }}>
                    <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                    <span>{job.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gc-color-text-muted)' }}>
                    <User size={16} style={{ marginRight: '0.5rem' }} />
                    <span>{job.applicants} applicants</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gc-color-text-muted)' }}>
                    <Clock size={16} style={{ marginRight: '0.5rem' }} />
                    <span>Posted {job.posted}</span>
                </div>
            </div>

            {/* Action Button */}
            <button 
                className="gc-btn-primary" 
                style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
            >
                Apply Now
            </button>
        </div>
    );
};

export default JobCard;