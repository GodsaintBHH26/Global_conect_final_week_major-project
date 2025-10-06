import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, MapPin, User, Clock, Settings, FileText, ArrowRight, Search, X } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_JOBS = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechNova Solutions', location: 'San Francisco, CA (Remote)', applicants: 154, posted: '1 day ago', type: 'Full-time', experience: 'Mid-Senior Level' },
    { id: 2, title: 'Data Scientist', company: 'Global Analytics Inc.', location: 'New York, NY', applicants: 89, posted: '3 days ago', type: 'Contract', experience: 'Associate' },
    { id: 3, title: 'UX Designer', company: 'CreativeFlow Agency', location: 'Remote', applicants: 320, posted: '1 week ago', type: 'Full-time', experience: 'Entry Level' },
    { id: 4, title: 'Product Manager', company: 'InnovateCorp', location: 'Austin, TX', applicants: 50, posted: '1 month ago', type: 'Full-time', experience: 'Director' },
    { id: 5, title: 'Backend Engineer (Node.js)', company: 'TechNova Solutions', location: 'San Francisco, CA', applicants: 10, posted: '24 hours ago', type: 'Full-time', experience: 'Mid-Senior Level' },
    { id: 6, title: 'Marketing Intern', company: 'Startup Launchpad', location: 'Remote', applicants: 500, posted: '3 days ago', type: 'Internship', experience: 'Internship' },
];

const EXPERIENCE_OPTIONS = ["Internship", "Entry Level", "Associate", "Mid-Senior Level", "Director", "Executive"];
const JOB_TYPE_OPTIONS = ["Full-time", "Part-time", "Contract", "Temporary", "Volunteer"];
const DATE_OPTIONS = ["Past 24 hours", "Past Week", "Past Month", "Any Time"];

// --- 1. Notification Toast Component ---
const NotificationToast = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? '#22c55e' : '#ef4444';
    
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: bgColor,
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}
        >
            <span>{message}</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={18} />
            </button>
        </div>
    );
};

// --- 2. Filter Section Component ---
const FilterSection = ({ title, options, selectedFilters, onFilterChange, type }) => {
    const initialVisibleCount = 3;
    const [isExpanded, setIsExpanded] = useState(false);
    
    const visibleOptions = isExpanded ? options : options.slice(0, initialVisibleCount);
    const hasMoreOptions = options.length > initialVisibleCount;
    
    // Convert 'Past 24 hours' to a slug like 'past_24_hours' for state keys
    const getFilterKey = (option) => option.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

    return (
        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--gc-color-border)', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gc-color-heading)', marginBottom: '0.75rem' }}>
                {title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                {visibleOptions.map((option) => {
                    const key = getFilterKey(option);
                    return (
                        <label key={key} style={{ display: 'flex', alignItems: 'center', color: 'var(--gc-color-text)', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                style={{ marginRight: '0.5rem', cursor: 'pointer' }} 
                                checked={selectedFilters[type]?.includes(option) || false}
                                onChange={() => onFilterChange(type, option)}
                            />
                            {option}
                        </label>
                    );
                })}
            </div>
            
            {hasMoreOptions && (
                <button 
                    className="gc-link-primary" 
                    style={{ marginTop: '0.5rem', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => setIsExpanded(!isExpanded)} 
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

// --- 3. Job Card Component ---
const JobCard = ({ job, onApply }) => {
    return (
        <div 
            className="gc-card" 
            style={{ 
                marginBottom: '1rem', 
                padding: '1rem', 
                cursor: 'pointer',
                transition: 'box-shadow 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
            
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

            {/* Details */}
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
                onClick={() => onApply(job)}
                style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1.5rem', 
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--gc-color-primary)',
                    color: 'white',
                    borderRadius: '20px',
                    border: '1px solid var(--gc-color-primary)',
                    cursor: 'pointer'
                }}
            >
                Apply Now
            </button>
        </div>
    );
};

// --- 4. Main Job Page Component ---
const JobsPage = () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);

    const [filters, setFilters] = useState({
        experience: [],
        type: [],
        date: [],
    });
    
    // Simulate API call to fetch initial job data
    useEffect(() => {
        const fetchJobs = () => {
            setTimeout(() => {
                setJobs(MOCK_JOBS);
                setFilteredJobs(MOCK_JOBS);
                setLoading(false);
            }, 1000); 
        };
        fetchJobs();
    }, []);

    // Function to handle filter checkbox change
    const handleFilterChange = (filterType, option) => {
        setFilters(prev => {
            const current = prev[filterType];
            const isSelected = current.includes(option);
            
            let newFilters;
            if (filterType === 'date') {
                 // For Date, allow only one selection, or clear if the same one is clicked
                 newFilters = isSelected ? [] : [option];
            } else {
                 newFilters = isSelected 
                    ? current.filter(item => item !== option)
                    : [...current, option];
            }
            
            return {
                ...prev,
                [filterType]: newFilters,
            };
        });
    };
    
    // Function to apply filtering logic based on selected filters
    const applyFilters = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            let result = jobs.filter(job => {
                
                // 1. Experience Filter
                const expMatch = filters.experience.length === 0 || filters.experience.includes(job.experience);

                // 2. Job Type Filter
                const typeMatch = filters.type.length === 0 || filters.type.includes(job.type);

                // 3. Search Term Filter (Title or Company)
                const searchLower = searchTerm.toLowerCase();
                const searchMatch = !searchLower || job.title.toLowerCase().includes(searchLower) || job.company.toLowerCase().includes(searchLower);

                // NOTE: Date Posted filtering is skipped for simplicity but would involve date math here.

                return expMatch && typeMatch && searchMatch;
            });
            
            setFilteredJobs(result);
            setLoading(false);
        }, 300); // Small delay to show loading state
    }, [jobs, filters, searchTerm]);
    
    // Show Notification (Toast)
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    const handleJobApply = (job) => {
        // Simulate an API call for application submission
        showNotification(`Successfully applied for ${job.title} at ${job.company}!`, 'success');
    };

    const jobCount = filteredJobs.length;

    // --- UI Structure ---
   // --- UI Structure ---
    return (
        <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f4f2ee', minHeight: '100vh' }}>
            
            {/* Top Search Bar (LinkedIn Job Search Look) */}
            <div style={{ 
                backgroundColor: 'white', 
                borderBottom: '1px solid #ddd', 
                padding: '10px 0',
                marginBottom: '10px',
                marginTop: '15px',
            }}>
                {/* FIX 1: Remove maxWidth here to allow full width stretch */}
                <div style={{ 
                    maxWidth: '1200px', // REMOVED
                    margin: '0 auto', 
                    padding: '0 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <Briefcase size={28} style={{ color: 'var(--gc-color-primary)' }} />
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                        {/* FIX 2: Added a slight padding to the overall search input container to prevent crowding */}
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gc-color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search job titles, companies, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 40px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button 
                        className="gc-btn-primary" 
                        onClick={applyFilters}
                        style={{ zIndex: 10, padding: '8px 20px', backgroundColor: 'var(--gc-color-primary)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Main Content Area (Filters + Job List) */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '0 20px',
                display: 'grid',
                gap: '20px',
                // Enforce two-column structure (250px | auto)
                gridTemplateColumns: '250px 1fr', 
            }}>
                
                {/* 1. Filter Sidebar */}
                <div style={{ paddingRight: '10px' }}>
                    <div className="gc-card" style={{ padding: '1rem' }}>
                        
                        {/* Job Preferences (Links) */}
                        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--gc-color-border)', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--gc-color-heading)' }}>Job Tools</h2>
                            <a href="#preferences" className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                <Settings size={18} /> Preferences
                            </a>
                            <a href="#myjobs" className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                <Briefcase size={18} /> My jobs
                            </a>
                            <a href="#interviewprep" className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                                <FileText size={18} /> Interview prep
                            </a>
                        </div>

                        {/* Job Filters Section */}
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--gc-color-heading)' }}>Filter by</h2>

                        <FilterSection 
                            title="Date Posted"
                            options={DATE_OPTIONS}
                            selectedFilters={filters}
                            onFilterChange={handleFilterChange}
                            type="date"
                        />
                        <FilterSection 
                            title="Experience Level"
                            options={EXPERIENCE_OPTIONS} 
                            selectedFilters={filters}
                            onFilterChange={handleFilterChange}
                            type="experience"
                        />
                        <FilterSection 
                            title="Job Type"
                            options={JOB_TYPE_OPTIONS} 
                            selectedFilters={filters}
                            onFilterChange={handleFilterChange}
                            type="type"
                        />
                        
                        <button 
                            className="gc-btn-primary" 
                            onClick={applyFilters}
                            style={{ 
                                width: '100%', 
                                padding: '0.6rem', 
                                fontSize: '0.9rem', 
                                marginBottom: '0.5rem',
                                backgroundColor: 'var(--gc-color-primary)',
                                color: 'white',
                                borderRadius: '20px',
                                border: 'none',
                                fontWeight: '600'
                            }}
                        >
                            Apply Filters ({jobCount})
                        </button>
                        
                        <button 
                            className="gc-link-primary"
                            style={{ 
                                width: '100%', 
                                padding: '0.6rem 0', 
                                fontSize: '0.9rem', 
                                marginBottom: '1rem', 
                                border: '1px solid var(--gc-color-border)', 
                                backgroundColor: '#fff', 
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Post a free job
                        </button>
                        
                        <p style={{fontSize: '0.85rem', color: 'var(--gc-color-text-muted)', textAlign: 'center' }}>
                            **{MOCK_JOBS.length}** total jobs available.
                        </p>
                    </div>
                </div>

                {/* 2. Job List */}
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gc-color-heading)', marginBottom: '1rem' }}>
                        {jobCount} Jobs Matching Your Search
                    </h1>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>Loading job listings...</div>
                    ) : jobCount === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--gc-color-text-muted)' }}>
                            No jobs match your current filters. Try adjusting your criteria.
                        </div>
                    ) : (
                        filteredJobs.map(job => (
                            <JobCard key={job.id} job={job} onApply={handleJobApply} />
                        ))
                    )}
                </div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <NotificationToast 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={() => setNotification(null)} 
                />
            )}
        </div>
    );
};

export default JobsPage;