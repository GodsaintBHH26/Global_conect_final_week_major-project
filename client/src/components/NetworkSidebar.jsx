// src/components/NetworkSidebar.jsx

import React from 'react';
import { Users, Briefcase, FileText, ChevronRight } from 'lucide-react';

// --- Dummy Counts ---
const dummyCounts = {
    invitations: 5,
    contacts: 152,
    following: 34,
};

const SidebarLink = ({ Icon, label, count }) => (
    <a href={`#${label.toLowerCase().replace(' ', '-')}`} 
       style={{ 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'space-between', 
           padding: '0.5rem 0',
           fontSize: '1rem', 
           fontWeight: 600,
           color: 'var(--gc-color-text)',
           cursor: 'pointer',
           transition: 'color 150ms'
       }}
       className="gc-link-primary"
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Icon size={20} style={{ color: 'var(--gc-color-primary)' }} />
            <span>{label}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {count !== undefined && <span style={{ color: 'var(--gc-color-primary)' }}>{count}</span>}
            <ChevronRight size={16} style={{ color: 'var(--gc-color-text-muted)' }} />
        </div>
    </a>
);


const NetworkSidebar = () => {
    return (
        <div className="gc-card" style={{ padding: '1rem', height: 'fit-content'  }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--gc-color-heading)' }}>
                Manage my network
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                
                <SidebarLink Icon={Users} label="Connections" count={dummyCounts.contacts} />
                <SidebarLink Icon={Briefcase} label="Following" count={dummyCounts.following} />
                <SidebarLink Icon={FileText} label="Invitations" count={dummyCounts.invitations} />
                <SidebarLink Icon={FileText} label="Teammates" />
                <SidebarLink Icon={FileText} label="Groups" />
                <SidebarLink Icon={FileText} label="Events" />
                
            </div>
        </div>
    );
};

export default NetworkSidebar;