/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      }
    ],
  },
};

export default nextConfig;
