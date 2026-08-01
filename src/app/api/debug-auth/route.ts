import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// ⚠️ ROTA TEMPORÁRIA DE DIAGNÓSTICO — REMOVER ESTE ARQUIVO (e a pasta
// debug-auth) assim que o problema de login for resolvido.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase();
  const senha = req.nextUrl.searchParams.get("senha");

  if (!email || !senha) {
    return NextResponse.json({ erro: "Use ?email=...&senha=... na URL" }, { status: 400 });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return NextResponse.json({ passo: "busca_usuario", encontrado: false, mensagem: "Nenhum usuário com esse e-mail no banco que essa função está acessando." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

    return NextResponse.json({
      passo: "comparacao_senha",
      encontrado: true,
      ativo: usuario.ativo,
      role: usuario.role,
      senhaCorreta,
      hashComeca: usuario.senhaHash.slice(0, 10),
    });
  } catch (e) {
    return NextResponse.json({ erro: "excecao", detalhe: String(e) }, { status: 500 });
  }
}