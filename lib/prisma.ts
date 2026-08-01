import { PrismaClient } from "@prisma/client";

// ---------------------------------------------------------------------------
// Padrão Singleton do Prisma Client.
//
// Em ambientes serverless (Netlify Functions), cada invocação pode reutilizar
// o mesmo container/processo por um tempo. Sem esse padrão, o Next.js recria
// o PrismaClient a cada hot-reload (dev) ou a cada nova invocação (prod),
// abrindo uma conexão nova toda vez e esgotando o limite de conexões do
// Postgres rapidamente. Guardamos a instância em `globalThis` para reutilizar
// a mesma conexão sempre que possível.
// ---------------------------------------------------------------------------

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
