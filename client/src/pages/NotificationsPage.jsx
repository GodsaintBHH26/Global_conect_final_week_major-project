
import Header from '../components/Header';
import NotificationCard from '../components/NotificationCard'; 
import ManageNotificationsCard from '../components/ManageNotificationsCard'; 

// --- Dummy Data ---
const dummyNotifications = [
    { id: 1, type: 'hiring', user: 'CareerXperts Consulting', action: 'posted. We\'re hiring. Know anyone who might be interested?', time: '11m' },
    { id: 2, type: 'job_alert', user: 'React Developer Intern at WEBBOOST SOLUTION IT SERVICES', action: 'and 9 other recommendations for you.', time: '7h' },
    { id: 3, type: 'new_opportunity', user: 'student', action: 'new opportunities in Mumbai.', time: '2h' },
    { id: 4, type: 'company_update', user: 'Firstsource Representative', action: 'We\'re hiring Customer Service Representatives. Join Firstsource and share experiences that truly make a difference. Be the voice our customers trust.', time: '18h' },
    { id: 5, type: 'post_activity', user: 'Vamsi Rudraraju', action: 'is popular with your network: Open Internship Offer! Finish the Assignment mentioned in the comments and get a chance to be part of Swipe Role. Full Stack...', time: '13h' },
    { id: 6, type: 'hiring_connection', user: 'Harshvardhan Sikarwar', action: 'is hiring for a 3D Graphics Software Engineer at RemoteStar. Explore jobs in your network.', time: '13h' },
];

const notificationCategories = ['All', 'Jobs', 'My posts', 'Mentions'];


const NotificationsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredNotifications = dummyNotifications.filter(notification => {
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Jobs') {
            return notification.type === 'job_alert' || notification.type === 'hiring' || notification.type === 'hiring_connection';
        }
        return true; 
    });


    return (
        <div style={{ minHeight: '100vh', paddingTop: '0', backgroundColor: '#f3f2ef' }}>
            <Header />
            
            <main className="container-3col" style={{ padding: '1.5rem 0' }}>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 3fr', // Left sidebar (1fr) | Main content (3fr)
                    gap: '1.5rem',
                    alignItems: 'flex-start'
                }}>
                    
                    {/*  Left Sidebar - Manage Notifications Card*/}
                    <div style={{ position: 'sticky', top: '72px', height: 'fit-content' }}>
                        <ManageNotificationsCard />
                    </div>

                    {/*  Main Notifications Feed */}
                    <div>
                        <div className="gc-card" style={{ padding: '0.5rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                            {notificationCategories.map(category => (
                                <button 
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    style={{ 
                                        padding: '0.5rem 1rem', 
                                        fontSize: '0.9rem', 
                                        fontWeight: 600,
                                        color: activeCategory === category ? 'var(--gc-color-heading)' : 'var(--gc-color-text-muted)',
                                        borderBottom: activeCategory === category ? '2px solid var(--gc-color-heading)' : '2px solid transparent',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        transition: 'color 150ms, border-color 150ms'
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* List of Notification Cards */}
                        <div className="gc-card" style={{ padding: '0' }}>
                            {filteredNotifications.map(notification => (
                                <NotificationCard key={notification.id} notification={notification} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage;