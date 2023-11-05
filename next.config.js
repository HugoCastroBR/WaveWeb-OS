/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { nextRuntime }) { 
    // as of Next.js latest versions, the nextRuntime is preferred over `isServer`, because of edge-runtime

    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      }
    ]
  },
  env:{
    SPOTIFY_CLIENT_ID: '9b59fca947644c3c97c19f3ab0d075d1',
    SPOTIFY_CLIENT_SECRET: '24f34a7a30d6448bae3d94351daedeaf',
  }
}

module.exports = nextConfig
