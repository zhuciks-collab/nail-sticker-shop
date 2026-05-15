/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify requires this for Next.js App Router
  output: "standalone",
  images: {
    domains: [
      "picsum.photos",
      "cdn.sanity.io", // Sanity image CDN
    ],
  },
};

export default nextConfig;
