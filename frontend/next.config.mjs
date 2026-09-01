/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shadcnblocks.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thiings.co',
      },
      {
        protocol: 'https',
        hostname: 'lftz25oez4aqbxpq.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
};

export default nextConfig;
