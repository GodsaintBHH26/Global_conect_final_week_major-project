import React from "react";
import { useUser } from "../../../context/UserContext";

const EducationSection = () => {
  const { user } = useUser();

  // fallback data if none in context
  const education = user?.education ?? [
    {
      school: "ABC University",
      degree: "B.Sc. in Computer Science",
      years: "2015 - 2019",
    },
  ];

  return (
    <div className="mt-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--gc-color-heading)" }}
      >
        Education
      </h3>

      <ul className="mt-3 space-y-3">
        {education.map((edu, i) => (
          <li
            key={i}
            className="p-4 rounded"
            style={{
              border: "1px solid var(--gc-color-border)",
              background: "var(--gc-color-white)",
            }}
          >
            <p className="font-medium">{edu.degree}</p>
            <p
              className="text-sm"
              style={{ color: "var(--gc-color-text-muted)" }}
            >
              {edu.school} | {edu.years}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationSection;
