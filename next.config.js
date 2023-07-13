/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/api/:path*',
        destination: 'http://3.1.50.253:14000/api/:path*'
      }
    ]
  },
  reactStrictMode: false
}

module.exports = nextConfig
