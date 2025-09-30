import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const UserContext = createContext();

// 2️⃣ Hook to access context easily
export const useUser = () => useContext(UserContext);

// 3️⃣ Provider to wrap around your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    headline: "Software Engineer | Web Developer",
    about:
      "Passionate developer with 5+ years of experience building modern web applications using React, Node.js, and cloud technologies.",
    connections: ["Jane Smith", "Michael Lee", "Sophia Patel"],
    profileViews: 156,
    postImpressions: 489,

    // ✅ New: Experience array
    experience: [
      {
        role: "Frontend Developer",
        company: "TechCorp",
        from: "2020",
        to: "Present",
        description: "Building responsive React apps with modern UX.",
      },
      {
        role: "Intern - Web Developer",
        company: "Startup Inc",
        from: "2019",
        to: "2020",
        description: "Assisted in building dashboards and UI features.",
      },
    ],

    // ✅ New: Education array
    education: [
      {
        school: "ABC University",
        degree: "B.Sc. in Computer Science",
        years: "2015 - 2019",
      },
      {
        school: "XYZ Institute",
        degree: "High School Diploma",
        years: "2013 - 2015",
      },
    ],

    // ✅ New: Skills array
    skills: ["JavaScript", "React", "Node.js"],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
