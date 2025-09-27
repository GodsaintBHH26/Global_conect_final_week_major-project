// src/pages/MyNetworkPage.jsx

import React from 'react';
import Header from '../components/Header';
import NetworkSidebar from '../components/NetworkSidebar'; // Will create this next
import SuggestedConnectionCard from '../components/SuggestedConnectionCard'; // Will create this next
import PLACEHOLDER_USER_AVATAR_URL from '../assets/user.png' ;
// --- Dummy Data for Suggestions ---
const suggestedUsers = [
    { id: 1, name: "Arjun Sharma", headline: "Full-Stack Developer | Node.js", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 2, name: "Priya Singh", headline: "UI/UX Designer at WebCo", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 3, name: "Rohit Verma", headline: "DevOps Engineer", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 4, name: "Kirti Rao", headline: "React Native Enthusiast", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 5, name: "Suresh Iyer", headline: "Recruiter at TalentHub", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 6, name: "Tanvi Jain", headline: "Product Manager", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 7, name: "Vikas Gupta", headline: "Data Scientist", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
    { id: 8, name: "Anjali Dubey", headline: "MERN Stack Intern", avatar: "PLACEHOLDER_USER_AVATAR_URL" },
];

const MyNetworkPage = () => {
    return (
        <div style={{ minHeight: '100vh', paddingTop: '0', backgroundColor: '#f3f2ef' }}>
            <Header />
            
            <main className="container-3col" style={{ 
                padding: '1.5rem 0',
                display: 'flex', // Use Flexbox for outer structure
                gap: '1.5rem' 
            }}>
                
                {/* Column 1: Network Sidebar (FIXED POSITION) */}
                <div style={{ 
                    position: 'fixed', // <-- CRUCIAL FIX: Lock to viewport
                       width: '240px',    // Explicit width for the fixed sidebar
                    height: 'calc(100vh - 80px)', // Allow content to scroll inside if long
                    overflowY: 'auto', // Allow internal scrolling if content is too long
                    paddingBottom: '1rem',
                    zIndex: 10 // Keep it above main content
                }}>
                    <NetworkSidebar />
                </div>

                {/* Column 2: Suggested Connections Grid (MAIN SCROLLABLE CONTENT) */}
                <div style={{ 
                    // Push this column over by the width of the fixed sidebar plus the gap
                    marginLeft: '255px', // 240px width + 15px gap (approx)
                    flexGrow: 1, // Allow it to take up the rest of the space
                    maxWidth: '852px', // Keep content within reasonable bounds
                }}>
                    <div className="gc-card" style={{ padding: '1.5rem' }}> 
                        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600, color: 'var(--gc-color-heading)' }}>
                            People you may know
                        </h2>
                        
                        {/* Grid for Suggestion Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {suggestedUsers.map(user => (
                                <SuggestedConnectionCard key={user.id} user={user} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyNetworkPage;