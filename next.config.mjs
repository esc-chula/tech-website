/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cms.intania.org',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
}

export default config
