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
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import SetNewPassword from './pages/setNewPassword';
import ForgotSuccessMsg from './pages/ForgotSuccessMsg';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', paddingTop: '40px', backgroundColor: '#f3f2ef' }}>
        <Header />

        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mynetwork" element={<MyNetworkPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/messaging" element={<MessagingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/signup" element={ <Signup/>} />
          <Route path="/login" element={ <Login/>} />
          <Route path="/forgotPassword" element={ <ForgotPassword/>} />
          <Route path="/passwordReset" element={ <PasswordReset/>} />
          <Route path="/setNewPassword" element={ <SetNewPassword/>} />
          <Route path="/forgotSuccessMsg" element={ <ForgotSuccessMsg/>} />

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
