
import React from 'react';
import Header from '../components/Header';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';

// --- Dummy Job Data for UI ---
const dummyJobs = [
    { id: 1, title: "MERN Stack Developer", company: "Global Solutions Inc.", location: "Remote (India)", posted: "2 hours ago", applicants: 58 },
    { id: 2, title: "Node.js Backend Engineer", company: "Tech Innovators", location: "Pune, MH", posted: "1 day ago", applicants: 120 },
    { id: 3, title: "React Frontend Specialist", company: "Web Dynamics", location: "Bangalore, KA", posted: "3 days ago", applicants: 45 },
];


const JobsPage = () => {
    return (
        <div style={{ minHeight: '100vh', paddingTop: '0', backgroundColor: '#f3f2ef' }}>
            <Header />
            
             <main className="container-3col" style={{ padding: '1.5rem 0' }}> 
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem' }}>
                    
                    {/*  Filters (Left Sidebar) */}
                    <div style={{ position: 'sticky', top: '72px', height: 'fit-content' }}>
                        <JobFilters jobCount={dummyJobs.length} /> 
                    </div>

                    {/*  Job Listings (Main Feed) */}
                    <div>
                      {dummyJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default JobsPage;