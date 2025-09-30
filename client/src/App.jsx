import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import LeftSidebar from './components/LeftSidebar';
import MainFeed from './components/MainFeed';
import RightSidebar from './components/RightSidebar';
import ProfilePage from './pages/profile/ProfilePage'; 

import HomePage from './pages/HomePage'; 
import JobsPage from './pages/JobsPage'; 
import MyNetworkPage from './pages/MyNetworkPage'; 
import MessagingPage from './pages/MessagingPage';
import NotificationsPage from './pages/NotificationsPage'; 

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', paddingTop: '56px', backgroundColor: '#f3f2ef' }}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mynetwork" element={<MyNetworkPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/messaging" element={<MessagingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* 👇 Add Profile page route */}
          <Route
            path="/profile"
            element={
              <main className="container-3col">
                <div className="gc-grid-main">
                  {/* Column 1: Left Sidebar */}
                  <div className="gc-col-left">
                    <div className="gc-sticky-sidebar">
                      <LeftSidebar />
                    </div>
                  </div>

                  {/* Column 2: Main Feed / Profile */}
                  <div className="gc-col-middle">
                    {/* <MainFeed />  // uncomment if you want feed + profile */}
                    <ProfilePage />
                  </div>

                  {/* Column 3: Right Sidebar */}
                  <div className="gc-col-right">
                    <div className="gc-sticky-sidebar">
                      <RightSidebar />
                    </div>
                  </div>
                </div>
              </main>
            }
          />

          <Route
            path="*"
            element={
              <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
                404 | Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
