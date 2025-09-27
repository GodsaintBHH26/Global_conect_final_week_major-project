// client/postcss.config.js
export default {
  plugins: {
    // CRITICAL: Must use the new v4 PostCSS package path
    '@tailwindcss/postcss': {}, 
    'autoprefixer': {},
  },
}