/** @type {import('next').NextConfig} */
const nextConfig = {
  // 优化包导入
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
