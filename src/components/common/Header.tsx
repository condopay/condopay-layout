import { Bell, LogOut, Search } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="CONDOPAY" width={100} height={100} />
        </div>
      </div>
      {/* Search Bar */}
      <div className="mx-8 max-w-md flex-1 rounded-md bg-white">
        <div className="relative">
          <Input
            type="text"
            placeholder="Acesso rápido"
            className="w-full rounded-md bg-white py-2 pr-4 pl-10 text-gray-900"
          />
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>
      {/* User Area */}
      <div className="flex items-center gap-4">
        {/* Administradora Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/administradora.png" alt="Administradora Alfa" />
            <AvatarFallback className="text-sm text-white">AA</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">
              Administradora Alfa
            </p>
          </div>
        </div>
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user.png" alt="Rafael eCondos" />
            <AvatarFallback className="text-sm text-white">AA</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">Rafael eCondos</p>
          </div>
        </div>
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-4 w-4 text-white" />
        </Button>

        {/* Exit Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-white hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
