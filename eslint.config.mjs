/** @type {import('next').NextConfig} */
const nextConfig = {
  // …
  eslint: {
    ignoreDuringBuilds: true, // ⬅︎ главное‑то!
  },
};

module.exports = nextConfig;
