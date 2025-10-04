import React from "react";
import "../../styles/colors.css";

// Import sub-components
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";  // ✅ new import
import ConnectionsList from "./components/ConnectionsList";
const ProfilePage = () => {
  return (
    <>
    {/* Background and height set by App.jsx, but adding margin for clarity */}
    <div className="container-3col" style={{ padding: "1.5rem 0" }}> 
      
      {/* Main Profile Grid: 70% Content | 30% Sidebar */}
      <main style={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: "1.5rem", alignItems: "flex-start" }}>
        
        {/* Column 1 (70%): Profile Info Sections */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ProfileHeader />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
        </section>

        {/* Column 2 (30%): Sidebar (Connections & Ads) */}
        <aside style={{ position: 'sticky', top: '72px', height: 'fit-content' }}>
          <ConnectionsList />
          {/* Add a placeholder card below Connections for visual space */}
          <div className="gc-card" style={{ marginTop: '1rem', padding: '1.5rem', height: 'fit-content' }}>
            Profile Language & Ads
          </div>
        </aside>
      </main>
    </div>
    </>
  );
};

export default ProfilePage;