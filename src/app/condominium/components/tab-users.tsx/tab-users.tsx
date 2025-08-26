"use client";

import { AlertCircle, Key, Pencil, Plus, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ConfirmAction } from "@/components/common/confirm-action";
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
import { useDeleteUser } from "@/hooks/mutations/delete-user";
import { useUsers } from "@/hooks/queries/use-users";

import { User } from "../../../../../generated/prisma";
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
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const getUsersQuery = useUsers({
    initialData: [],
  });
  const deleteUserMutation = useDeleteUser();

  const handleCreateUser = () => {
    setUserToEdit(null);
    setDialogMode("create");
    setOpenUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setDialogMode("edit");
    setOpenUserDialog(true);
  };

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id, {
      onSuccess: (data) => {
        if (data.success) {
          getUsersQuery.refetch();
          setSelectedUser(null);
          toast.success("Usuário removido com sucesso");
        } else {
          toast.error(data.error || "Erro ao remover usuário");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao remover usuário");
      },
    });
  };

  const filteredUsers = useMemo(
    () =>
      getUsersQuery.data?.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()),
      ),
    [getUsersQuery.data, search],
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
        <Button variant="outline" onClick={handleCreateUser}>
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Adicionar usuário</span>
        </Button>
        <CreateUserDialog
          open={openUserDialog}
          setOpen={setOpenUserDialog}
          user={dialogMode === "edit" ? (userToEdit ?? undefined) : undefined}
          isEdit={dialogMode === "edit"}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-3">
        <div className="col-span-1 rounded-xl p-4 dark:bg-zinc-900">
          {getUsersQuery.isPending ? (
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
          ) : getUsersQuery.isError ? (
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
                  <Button
                    variant="outline"
                    onClick={() => handleEditUser(selectedUser)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden lg:block">Editar</span>
                  </Button>
                  <Button variant="outline">
                    <Key className="h-4 w-4" />
                    <span className="hidden lg:block">Resetar senha</span>
                  </Button>
                  <ConfirmAction
                    title="Remover usuário"
                    description={`Tem certeza que deseja remover o usuário ${selectedUser.name}?`}
                    confirmText="Remover"
                    cancelText="Cancelar"
                    variant="destructive"
                    onConfirm={() => handleDeleteUser(selectedUser.id ?? "")}
                  >
                    <Button variant="outline" className="text-red-500">
                      <Trash className="h-4 w-4" />
                      <span className="hidden lg:block">Remover usuário</span>
                    </Button>
                  </ConfirmAction>
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
