"use client";

import {
  BarChart,
  Brain,
  Building,
  DollarSign,
  FileText,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface SideMenuProps {
  className?: string;
}

const menuItems = [
  { icon: Home, label: "Painel", href: "/painel" },
  { icon: Building, label: "Condomínio", href: "/condominio" },
  { icon: DollarSign, label: "Contas a Pagar", href: "/contas-a-pagar" },
  { icon: DollarSign, label: "Contas a Receber", href: "/contas-a-receber" },
  { icon: BarChart, label: "Consumo", href: "/consumo" },
  { icon: Brain, label: "IA", href: "/ia" },
  { icon: FileText, label: "Relatórios", href: "/relatorios" },
  {
    icon: DollarSign,
    label: "Previsão Orçamentária",
    href: "/previsao-orcamentaria",
  },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
];

export function SideMenu({ className }: SideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side menu */}
      <aside
        className={cn(
          "bg-background fixed top-0 left-0 z-40 h-full w-64 border-r transition-transform duration-300 ease-in-out md:h-auto",
          "md:static md:z-auto md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex justify-center border-b">
            <Image src="/logo.svg" alt="CONDOPAY" width={100} height={100} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className="h-11 w-full justify-start gap-3"
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-muted-foreground text-sm">
              © 2025 CondoPay - Todos os direitos reservados
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
