"use client";

import { Bell, LogOut } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "../ui/input";
import Profile01 from "./profile-01";

export default function TopNav() {
  return (
    <nav className="flex h-full items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
      <div className="hidden max-w-[300px] items-center space-x-1 truncate rounded-md border border-gray-200 bg-white text-sm font-medium sm:flex">
        <Input type="text" placeholder="Acesso Rápido" className="w-2xl" />
      </div>
      <div className="ml-auto flex items-center gap-4 sm:ml-0">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Image
                src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                alt="User avatar"
                width={28}
                height={28}
                className="cursor-pointer rounded-full ring-2 ring-gray-200 sm:h-8 sm:w-8 dark:ring-[#2B2B30]"
              />
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="bg-background border-border w-[280px] rounded-lg shadow-lg sm:w-80"
            >
              <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
            </DropdownMenuContent> */}
          </DropdownMenu>
          <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">
            Administradora
          </span>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Image
                src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                alt="User avatar"
                width={28}
                height={28}
                className="cursor-pointer rounded-full ring-2 ring-gray-200 sm:h-8 sm:w-8 dark:ring-[#2B2B30]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="bg-background border-border w-[280px] rounded-lg shadow-lg sm:w-80"
            >
              <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">
            Rafael
          </span>
        </div>
        <button
          type="button"
          className="rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:p-2 dark:hover:bg-[#1F1F23]"
        >
          <Bell className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5 dark:text-gray-300" />
        </button>
        <button
          type="button"
          className="rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:p-2 dark:hover:bg-[#1F1F23]"
        >
          <LogOut className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5 dark:text-gray-300" />
        </button>
      </div>
    </nav>
  );
}
