import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer} from "react-toastify";

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
import SetNewPassword from './pages/SetNewPassword';
import ForgotSuccessMsg from './pages/ForgotSuccessMsg';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', paddingTop: '40px', backgroundColor: '#f3f2ef' }}>
        <ToastContainer position="top-right" autoClose={2000}/>
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
              <ProfilePage />
            }
          />
          {/* 👆 End Profile page route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
