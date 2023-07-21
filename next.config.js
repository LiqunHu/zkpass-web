/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/api/:path*',
        destination: 'http://127.0.0.1:9090/api/:path*'
      }
    ]
  },
  reactStrictMode: false
}

module.exports = nextConfig
