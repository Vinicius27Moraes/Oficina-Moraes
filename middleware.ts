import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // roda em todas as rotas, exceto assets estáticos, auth e a rota de diagnóstico temporária
  matcher: ["/((?!api/auth|api/debug-auth|_next/static|_next/image|favicon.ico).*)"],
};