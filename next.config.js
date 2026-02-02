/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint during production builds to avoid blocking the build
    // when migrating between Next.js versions or when rules are stricter.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
