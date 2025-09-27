import React from 'react';
import { Info, ChevronDown, Rss } from 'lucide-react';

// --- Dummy Data ---
const newsItems = [
  { title: "IT giants lag in exports race", reads: "8h ago • 789 readers" },
  { title: "Corporate travel soars... again", reads: "4h ago • 541 readers" },
  { title: "NBFCs go big on small loans", reads: "1d ago • 233 readers" },
  { title: "Commercial disputes pile up", reads: "4h ago • 118 readers" },
];

const RightSidebar = () => {
  return (
    <div className="gc-flex-col" style={{ gap: '1rem' }}>
      
      {/* 1. News Widget */}
      <div className="gc-card gc-p-4">
        
        {/* Header */}
        <div className="gc-flex gc-justify-between gc-align-center" style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--gc-color-heading)' }}>Global_Connect News</h3>
          <Info size={18} style={{ color: 'var(--gc-color-text-muted)', cursor: 'help' }} />
        </div>
        
        {/* News List */}
        <ul style={{ listStyleType: 'disc', marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          {newsItems.map((item, index) => (
            <li key={index} style={{ color: 'var(--gc-color-heading)', cursor: 'pointer' }}>
              <a href="#" style={{ fontWeight: 600, color: 'var(--gc-color-heading)' }} className="gc-link-primary">
                {item.title}
              </a>
              <p style={{ color: 'var(--gc-color-text-muted)', fontSize: '0.75rem' }}>{item.reads}</p>
            </li>
          ))}
        </ul>
        
        <button className="gc-btn-base gc-flex gc-align-center" style={{ marginTop: '0.75rem', color: 'var(--gc-color-text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>
          Show more <ChevronDown size={16} style={{ marginLeft: '0.25rem' }} />
        </button>
      </div>

      {/* 2. Follow/Ad Widget */}
      <div className="gc-card gc-p-4">
        <div className="gc-flex gc-justify-between gc-align-center" style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--gc-color-heading)' }}>Add to your feed</h3>
          <Info size={18} style={{ color: 'var(--gc-color-text-muted)', cursor: 'help' }} />
        </div>
        
        <div className="gc-flex-col" style={{ gap: '0.75rem' }}>
            <div className="gc-flex gc-align-center gc-space-x-2">
                <Rss size={48} style={{ color: 'rgb(255, 165, 0)', backgroundColor: 'var(--gc-color-white)', padding: '0.5rem', borderRadius: '50%', border: '1px solid var(--gc-color-border)' }} strokeWidth={1}/>
                <div>
                    <h4 style={{ fontWeight: 600, fontSize: '0.875rem' }}>Design Central</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--gc-color-text-muted)' }}>Company • Industry</p>
                </div>
                <button className="gc-btn-primary" style={{ marginLeft: 'auto', fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>
                    + Follow
                </button>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default RightSidebar;