// client/tailwind.config.js (MUST be present)

/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: This tells the v4 plugin where to find your classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  // Plugins property is usually not needed or is simplified in v4
}