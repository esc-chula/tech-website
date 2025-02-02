/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  images: {
    domains: ['avatars.githubusercontent.com', 'cms.intania.org'],
  },
};

export default config;
