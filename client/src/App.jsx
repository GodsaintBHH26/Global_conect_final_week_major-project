import React from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainFeed from './components/MainFeed';
import RightSidebar from './components/RightSidebar';


const App = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: '#f3f2ef' }}> 
      <Header />
      
      <main className="container-3col">
        <div className="gc-grid-main">
          
          {/* Column 1: Left Sidebar*/}
          <div className="gc-col-left">
             <div className="gc-sticky-sidebar"> 
                <LeftSidebar />
             </div>
          </div>

          {/* Column 2: Main Feed */}
          <div className="gc-col-middle"> 
            <MainFeed />
          </div>
          
          {/* Column 3: Right Sidebar  */}
          <div className="gc-col-right">
             <div className="gc-sticky-sidebar"> 
                <RightSidebar />
             </div>
          </div>
          
        </div>
      </main>
      
      <footer></footer>
    </div>
  );
};

export default App;