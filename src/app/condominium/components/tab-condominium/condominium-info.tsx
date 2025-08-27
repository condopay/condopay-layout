"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCondominiumInfo } from "@/hooks/queries/use-condominium";
import { cn } from "@/lib/utils";

import type { Address, Condominium } from "../../../../../generated/prisma";
import { EditCondominiumDialog } from "./edit-condominium-dialog";

interface CondominiumInfoProps {
  className?: string;
}

export default function CondominiumInfo({ className }: CondominiumInfoProps) {
  const { data: condominiumData, isLoading, error } = useCondominiumInfo();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-zinc-500">Carregando informações...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-red-500">
          Erro ao carregar informações: {error.message}
        </div>
      </div>
    );
  }
  if (!condominiumData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-zinc-500">
          Nenhum condomínio encontrado
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-xl",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-end p-4">
        <EditCondominiumDialog
          condominiumData={
            condominiumData as Condominium & { address: Address }
          }
        />
      </div>
      <div className="flex items-center justify-around gap-2 p-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/condominium-1.png" alt="Logo do Condomínio" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <h1 className="text-sm text-zinc-500">Foto do Condomínio</h1>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-20 w-20">
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <h1 className="text-sm text-zinc-500">Logo do Condomínio</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Nome</h1>
          <p className="text-sm font-semibold">{condominiumData?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">CNPJ</h1>
          <p className="text-sm font-semibold">{condominiumData?.cnpj}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Telefone</h1>
          <p className="text-sm font-semibold">{condominiumData?.phone}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Tipo de Condomínio</h1>
          <p className="text-sm font-semibold">
            {condominiumData?.condominium_type}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Endereço</h1>
          <p className="text-sm font-semibold">
            {condominiumData?.address
              ? `${condominiumData?.address.street}, ${condominiumData?.address.number}, ${condominiumData?.address.neighborhood}, ${condominiumData?.address.city}, ${condominiumData?.address.state}`
              : "Endereço não informado"}
          </p>
        </div>
      </div>
    </div>
  );
}
