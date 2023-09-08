/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/:path*`,
      },
      {
        source: "/cloudinary/:path*",
        destination: `${process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
