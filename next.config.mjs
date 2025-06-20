import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  productionBrowserSourceMaps: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    if (prod) config.devtool = 'hidden-source-map';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
    };
  },
  images: {
    domains: ['localhost', 'www.barfdogserver.com', 'dev.barfdogserver.com', "renewal-dev.barfdogserver.com", "dev-barfdog.s3.ap-northeast-2.amazonaws.com" ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.barfdogserver.com',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ]
      }
    ]
  },
  async rewrites() {
    console.log('Default API URL (DEV): ', process.env.NEXT_PUBLIC_API_URL_DEV);
    console.log('Default API URL (PROD): ', process.env.NEXT_PUBLIC_API_URL_PRODUCT);
    return [
      {
        source: process.env.SOURCE_PATH,
        destination: dev ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL_PRODUCT,
      },
      {
        source: "/oauth2.0/:path*",
        destination: "https://nid.naver.com/oauth2.0/:path*",
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/kr/(.*)',
        destination: '/',
        permanent: true,
      }
    ]
  },
  experimental: {
    middlewarePrefetch: 'flexible',
  },
};

export default withVanillaExtract(nextConfig);
