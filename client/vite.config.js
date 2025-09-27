// client/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 🛑 REMOVE: import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  plugins: [
    react({
      // Ensure this matches your setup
      jsxRuntime: 'classic' 
    }), 
    // 🛑 REMOVE: tailwindcss(), 
  ],
  // ... rest of your config ...
});