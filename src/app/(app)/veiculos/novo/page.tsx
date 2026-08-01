import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { VeiculoForm } from "../VeiculoForm";
import { criarVeiculo } from "@/lib/actions/veiculos";

export default async function NovoVeiculoPage() {
  const clientes = await prisma.cliente.findMany({ orderBy: { nome: "asc" } });
  return (
    <div>
      <PageHeader eyebrow="Cadastro" title="Novo veículo" />
      <VeiculoForm action={criarVeiculo} clientes={clientes} />
    </div>
  );
}
