/** @type {import('next').NextConfig} */
module.exports = {
  experimental: { esmExternals: false, webpackBuildWorker: true },
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        zlib: false,
      };
    }

    return config;
  },
};
