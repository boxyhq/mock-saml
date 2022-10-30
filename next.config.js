/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/mock-saml',
  assetPrefix: '/mock-saml',
  reactStrictMode: true,
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
