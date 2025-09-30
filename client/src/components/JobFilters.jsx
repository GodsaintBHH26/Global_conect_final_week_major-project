
import React, { useState } from 'react'; 
import { Briefcase, FileText, Settings, ArrowRight } from 'lucide-react'; 

const FilterSection = ({ title, options }) => {
    const initialVisibleCount = 3;
    const [isExpanded, setIsExpanded] = useState(false);
    
    const visibleOptions = isExpanded ? options : options.slice(0, initialVisibleCount);
    const hasMoreOptions = options.length > initialVisibleCount;

    return (
        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--gc-color-border)', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gc-color-heading)', marginBottom: '0.75rem' }}>
                {title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                {visibleOptions.map((option, index) => (
                    <label key={index} style={{ display: 'flex', alignItems: 'center', color: 'var(--gc-color-text)' }}>
                        <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                        {option}
                    </label>
                ))}
            </div>
            
            {hasMoreOptions && (
                <button 
                    className="gc-link-primary" 
                    style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}
                    onClick={() => setIsExpanded(!isExpanded)} 
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};


const JobFilters = ({ jobCount }) => {
    
    const experienceOptions = ["Internship", "Entry Level", "Associate", "Mid-Senior Level", "Director", "Executive"];
    const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Temporary", "Volunteer"];

    return (
        <div className="gc-card" style={{ padding: '1rem', marginTop: 0 }}> 
            
            {/* 1. Job Preferences */}
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--gc-color-border)', marginBottom: '1rem' }}>
                <a href="#preferences" className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                    <Settings size={18} />
                    Preferences
                </a>
                <a href="#myjobs" className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                    <Briefcase size={18} />
                    My jobs
                </a>
                <a href="#interviewprep" className="gc-link-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <FileText size={18} />
                    Interview prep
                </a>
            </div>

            {/* 2. Job Filters Section */}
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--gc-color-heading)' }}>Job Filters</h2>

            <FilterSection 
                title="Date Posted"
                options={["Past 24 hours", "Past Week", "Past Month", "Any Time"]}
            />

            <FilterSection 
                title="Experience Level"
                options={experienceOptions} 
            />
            
            <FilterSection 
                title="Job Type"
                options={jobTypeOptions} 
            />
            
            <button className="gc-btn-primary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Apply Filters
            </button>

            <button 
                className="gc-link-primary"
                style={{ width: '100%', padding: '0.6rem 0', fontSize: '0.9rem', marginBottom: '1rem', border: '1px solid var(--gc-color-border)', backgroundColor: '#f3f6f8', borderRadius: '4px' }}
            >
                Post a free job
            </button>
            
            <p style={{fontSize: '0.85rem', color: 'var(--gc-color-text-muted)', textAlign: 'center' }}>
                **{jobCount}** active jobs posted.
            </p>
            <a href="#all-posted-jobs" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gc-color-primary)', marginTop: '0.5rem' }}>
                View all posted jobs <ArrowRight size={16} style={{marginLeft: '0.5rem'}} />
            </a>
            
        </div>
    );
};

export default JobFilters;