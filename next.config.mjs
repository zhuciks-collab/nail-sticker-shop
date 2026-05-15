/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify requires this for Next.js App Router
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
