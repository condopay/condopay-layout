"use client";

import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import Sidebar from "./sidebar";
import TopNav from "./top-nav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme : "dark";

  return (
    <div className={`flex h-screen ${currentTheme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <header className="h-16 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto border-2 bg-white p-2 md:p-6 lg:rounded-tl-2xl dark:bg-[#0F0F12]">
          {children}
        </main>
      </div>
    </div>
  );
}
