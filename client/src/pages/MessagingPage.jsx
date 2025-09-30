
import React, { useState } from 'react'; 
import Header from '../components/Header';
import ChatList from '../components/ChatList'; 
import MessagingFeed from '../components/MessagingFeed'; 
import PremiumAdPanel from '../components/PremiumAdPanel'; 
import ChatWindow from '../components/ChatWindow';

const MessagingPage = () => {
    const [activeChat, setActiveChat] = useState(null); 

    return (
        <div style={{ minHeight: '100vh', paddingTop: '0', backgroundColor: '#f3f2ef' }}>
            <Header />
            
            <main className="container-3col" style={{ padding: '1.5rem 0' }}>
                
                {/* Messaging Layout: */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 3fr 1fr', 
                    gap: '1.5rem',
                    height: 'calc(100vh - 8rem)' 
                }}>
                    
                    {/* Chat List */}
                    <div style={{ height: '100%' }}>
                        <ChatList onSelectChat={setActiveChat} /> 
                    </div>

                    {/* Messaging Feed  */}
                    <div style={{ height: '100%' }}>
                        <ChatWindow activeChatUser={activeChat} /> 
                    </div>

                
                    
            <div style={{
                position: 'sticky',
                top: '72px', 
                height:'fit-content',
                width: '270px', 
                
               
               
            }}>
                <PremiumAdPanel />
            </div>
                </div>
            </main>  </div>
    );
};

export default MessagingPage;