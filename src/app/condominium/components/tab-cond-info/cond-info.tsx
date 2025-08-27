"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import type { Address, Condominium } from "../../../../../generated/prisma";
import { EditCondominiumDialog } from "./edit-condominium-dialog";

interface CondInfoProps {
  className?: string;
}

export default function CondInfo({ className }: CondInfoProps) {
  const [condominiumData, setCondominiumData] = useState<
    Condominium & { address: Address }
  >({
    id: "",
    cnpj: "28.638.302/0001-09",
    name: "Condomínio Edifício Princesa Isabel",
    phone: "(11) 99999-9999",
    condominium_type: "APARTMENT",
    address: {
      id: "",
      street: "Rua das Flores",
      number: "123",
      neighborhood: "Jardim",
      complement: "Apto 101",
      city: "São Paulo",
      state: "SP",
      zip_code: "1234567890",
      country: "Brasil",
      condominium_id: "123",
    },
  });

  const handleSave = (newData: typeof condominiumData) => {
    setCondominiumData(newData);
  };
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
          condominiumData={condominiumData}
          onSave={handleSave}
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
          <p className="text-sm font-semibold">{condominiumData.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">CNPJ</h1>
          <p className="text-sm font-semibold">{condominiumData.cnpj}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Telefone</h1>
          <p className="text-sm font-semibold">{condominiumData.phone}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Tipo de Condomínio</h1>
          <p className="text-sm font-semibold">
            {condominiumData.condominium_type}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Endereço</h1>
          <p className="text-sm font-semibold">
            {condominiumData.address
              ? `${condominiumData.address.street}, ${condominiumData.address.number}, ${condominiumData.address.neighborhood}, ${condominiumData.address.city}, ${condominiumData.address.state}`
              : "Endereço não informado"}
          </p>
        </div>
      </div>
    </div>
  );
}
