/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mantém o Prisma Client fora do bundle das Server Actions.
  serverExternalPackages: ["@prisma/client"],
};

module.exports = nextConfig;
