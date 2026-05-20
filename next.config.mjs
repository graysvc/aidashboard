/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the realtor landing as the main public homepage. The file
      // lives at /public/landing-realtors/index.html. Keeping it as a
      // static file means JS/CSS execute normally (no React conversion).
      { source: "/", destination: "/landing-realtors/index.html" },
    ];
  },
  async redirects() {
    return [
      // The realtor variant is now the homepage. Permanently redirect
      // the old /realtor path so anyone who has the link still lands.
      { source: "/realtor", destination: "/", permanent: true },
      { source: "/realtor/", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
