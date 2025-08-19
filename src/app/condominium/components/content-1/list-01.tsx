import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface List01Props {
  className?: string;
}

export default function List01({ className }: List01Props) {
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
          <p className="text-sm font-semibold">
            Condomínio Edifício Princesa Isabel
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">CNPJ</h1>
          <p className="text-sm font-semibold">28.638.302/0001-09</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Telefone</h1>
          <p className="text-sm font-semibold">(11) 99999-9999</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Tipo de Condomínio</h1>
          <p className="text-sm font-semibold">Apartamento</p>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-sm text-zinc-500">Endereço</h1>
          <p className="text-sm font-semibold">
            Rua das Flores, 123, São Paulo, SP
          </p>
        </div>
      </div>
    </div>
  );
}
