/** @type {import('next').NextConfig} */
const nextConfig = {
//   reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inspection.carpoolkr.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'media.carpoolkr.com',
        pathname: "/assets/**",
      },
      {
        protocol: 'http',
        hostname: 'ci.encar.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'ci.encar.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'carpoolkr.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'img.carpoolkr.com',
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/encar/:path*',
        destination: '/api/encar/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://partners.carpoolkr.com/api/:path*',
      },
      {
        source: '/sanctum/:path*',
        destination: 'https://partners.carpoolkr.com/sanctum/:path*',
      },
    ];
  },
};

export default nextConfig;
