"use client";

import { AlertCircle, Key, Pencil, Trash } from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/queries/use-users";

import type { User } from "../../../../../generated/prisma";
import { CreateUserDialog } from "./create-user-dialog";

function UserSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-10 w-10 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
    </TableRow>
  );
}

export function TabUsers() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);

  const {
    data: users,
    isError,
    isPending,
  } = useUsers({
    initialData: [],
  });

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  );

  return (
    <>
      <div className="flex items-center justify-between rounded-xl px-2 py-4">
        <Input
          className="flex w-fit md:w-md"
          placeholder="Pesquisar usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CreateUserDialog />
      </div>
      <div className="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-3">
        <div className="col-span-1 rounded-xl p-4 dark:bg-zinc-900">
          {isPending ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Nome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <UserSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-8">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <span className="text-muted-foreground text-sm">
                Erro ao carregar usuários
              </span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-8">
              <span className="text-muted-foreground text-sm">
                Nenhum usuário encontrado
              </span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Nome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.avatar_url ?? ""} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.name ?? ""}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="col-span-2 rounded-xl p-4 dark:bg-zinc-900">
          {selectedUser && (
            <>
              <div></div>
              <div className="flex justify-between gap-4 rounded-xl">
                <div className="flex gap-4">
                  <Avatar className="hidden lg:block">
                    <AvatarImage src={selectedUser.avatar_url ?? ""} />
                    <AvatarFallback>
                      {selectedUser.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-lg font-medium">{selectedUser.name}</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Pencil className="h-4 w-4" />
                    <span className="hidden lg:block">Editar</span>
                  </Button>
                  <Button variant="outline">
                    <Key className="h-4 w-4" />
                    <span className="hidden lg:block">Resetar senha</span>
                  </Button>
                  <Button variant="outline" className="text-red-500">
                    <Trash className="h-4 w-4" />
                    <span className="hidden lg:block">Remover usuário</span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">CPF/CNPJ</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.document}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">Email</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.email ?? ""}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">RG</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.rg ?? ""}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">RA</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.ra ?? ""}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">1º Telefone</h1>
                  <p className="text-sm font-semibold">{selectedUser.phone1}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">2º Telefone</h1>
                  <p className="text-sm font-semibold">{selectedUser.phone2}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">Perfil</h1>
                  <p className="text-sm font-semibold">{selectedUser.role}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">WhatsApp</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.whatsapp}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">Profissão</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.profession}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">Data de Nascimento</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.birth_date?.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm text-zinc-500">Estado Civil</h1>
                  <p className="text-sm font-semibold">
                    {selectedUser.marital_status}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
