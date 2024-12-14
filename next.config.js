/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Weitere Next.js Konfigurationen können hier hinzugefügt werden
};

module.exports = nextConfig;