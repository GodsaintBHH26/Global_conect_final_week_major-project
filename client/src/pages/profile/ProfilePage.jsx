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
    <div className="bg-[var(--gc-color-background)] min-h-screen font-[var(--gc-font-family-body)]">
      {/* Top Navbar */}
      <header className="bg-[var(--gc-color-primary)] text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">My Profile</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Network
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
        </nav>
      </header>

      {/* Main Profile Section */}
      <main className="px-6 py-6 flex">
        {/* Left: Profile Info */}
        <section className="w-2/3 bg-[var(--gc-color-white)] rounded-lg shadow p-6 space-y-6">
          <ProfileHeader />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection /> {/* ✅ new section */}
        </section>

        {/* Right: Sidebar */}
        <aside className="w-1/3 ml-6">
          <ConnectionsList />
        </aside>
      </main>
    </div>
  );
};

export default ProfilePage;
