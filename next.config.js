/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://dealingwithai.onrender.com/:path*',
      },
    ]
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}