
import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import MainFeed from '../components/MainFeed';
import RightSidebar from '../components/RightSidebar';

const HomePage = () => {
    return (
        <main className="container-3col" style={{ padding: '1.5rem 0' }}>
           
            <div className="gc-grid-main">
                
                {/* Left Sidebar (Profile) */}
                <div className="gc-col-left">
                    <div className="gc-sticky-sidebar">
                        <LeftSidebar />
                    </div>
                </div>

                {/* Main Feed (Posts) */}
                <div className="gc-col-middle"> 
                    <MainFeed />
                </div>
                
                {/*  Right Sidebar (News) */}
                <div className="gc-col-right">
                    <div className="gc-sticky-sidebar">
                        <RightSidebar />
                    </div>
                </div>
                
            </div>
        </main>
    );
};

export default HomePage;