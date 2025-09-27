
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import HomePage from './pages/HomePage'; 
import JobsPage from './pages/JobsPage'; 
import MyNetworkPage from './pages/MyNetworkPage'; 

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
                
   <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '4rem' }}>404 | Page Not Found</h1>} />
            </Routes>
        </div>
    </BrowserRouter>
  );
};

export default App;