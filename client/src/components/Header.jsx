import React from 'react';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, User, LayoutGrid } from 'lucide-react';

const Header = () => {
  
  const navItems = [
    { Icon: Home, label: 'Home', isActive: true },
    { Icon: Users, label: 'My Network', isActive: false },
    { Icon: Briefcase, label: 'Jobs', isActive: false },
    { Icon: MessageSquare, label: 'Messaging', isActive: false },
    { Icon: Bell, label: 'Notifications', isActive: false },
  ];

  const NavItem = ({ Icon, label, isActive = false }) => (
    <a
      href={`#${label.toLowerCase().replace(' ', '-')}`}
      className={`gc-nav-item ${isActive ? 'gc-nav-item-active' : ''}`}
      title={label}
    >
      <Icon size={24} strokeWidth={1.5} />
      <span className="gc-nav-item-label">{label}</span>
    </a>
  );

  return (
    <header className="gc-header">
      
      <div className="container-3col gc-header-content">

        {/* 1. Left Section: Logo and Search  */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {/*  Logo */}
          <a href="/" style={{textDecoration:'none' , marginRight: '1rem', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--gc-font-family-heading)', color: 'var(--gc-color-primary)' }} title="Global_Connect Home">
            G<span style={{ color: 'var(--gc-color-heading)' }}>C</span>
          </a>
          
          {/* Search Bar */}
          <div className="gc-search-container">
            <div className="gc-search-input-wrapper">
              <input
                type="text"
                placeholder="Search"
                className="gc-search-input"
              />
              <Search
                size={18}
                className="gc-search-icon"
              />
            </div>
          </div>
        </div>

        {/* 2. Right Section: Navigation Links */}
        <nav style={{textDecoration:'none' ,  display: 'flex', alignItems: 'stretch', height: '100%' }}>
          
          {/* Main Nav Items */}
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
          
          {/* Profile link */}
          <div className="gc-nav-item" style={{textDecoration:'none'  }}>
        
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <User size={16} style={{ color: '#ffffff' }} strokeWidth={2.5}/>
            </div>
            <span className="gc-nav-item-label">Me ▼</span>
          </div>
          
          
        </nav>
        
      </div>
    </header>
  );
};

export default Header;