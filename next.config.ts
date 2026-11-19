import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx']
}

export default nextConfig
