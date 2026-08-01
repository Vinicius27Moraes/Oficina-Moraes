import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // roda em todas as rotas, exceto assets estáticos e a própria rota de auth
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
