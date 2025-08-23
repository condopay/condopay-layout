"use client";

import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { getUsers } from "@/actions/get-users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateUserDialog } from "./create-user-dialog";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

export function TabUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const buildingId = "1"; // TODO: Obter do contexto ou props

  useEffect(() => {
    const fetchUsers = async () => {
      const { users } = await getUsers({ buildingId, search });
      setUsers(users);
    };
    fetchUsers();
  }, [search]);

  return (
    <>
      <div className="flex items-center justify-between rounded-xl bg-white p-4 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
        <Input
          className="flex w-fit md:w-md"
          placeholder="Pesquisar usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CreateUserDialog />
      </div>
      <div className="flex flex-col rounded-xl bg-white p-4 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
        {users.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    <div className="text-muted-foreground text-sm">
                      {search
                        ? "Nenhum usuário encontrado"
                        : "Nenhum usuário cadastrado"}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
