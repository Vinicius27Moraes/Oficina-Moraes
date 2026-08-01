/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Mantém o Prisma Client fora do bundle de Server Actions,
    // essencial para funcionar corretamente nas Netlify Functions.
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

module.exports = nextConfig;
