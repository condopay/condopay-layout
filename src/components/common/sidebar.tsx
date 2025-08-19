"use client";

import { Building2, Home, type LucideIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "../ui/button";

const menuItems = [
  {
    label: "Painel Gerencial",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Condomínio",
    icon: Building2,
    href: "/condominium",
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: LucideIcon;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#1F1F23] dark:hover:text-white"
      >
        <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-[70] rounded-lg bg-white p-2 shadow-md lg:hidden dark:bg-[#0F0F12]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`fixed inset-y-0 left-0 z-[70] w-64 transform bg-white transition-transform duration-200 ease-in-out lg:static lg:w-64 lg:translate-x-0 dark:border-[#1F1F23] dark:bg-[#0F0F12] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 items-center justify-center px-6 dark:border-[#1F1F23]"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto object-contain"
            />
          </Link>
          {/* Menu */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-6">
              <div>
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <NavItem key={item.label} href={item.href} icon={item.icon}>
                      {item.label}
                    </NavItem>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="px-4 py-4 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <Button variant="outline" className="w-full">
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-[65] bg-black lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
