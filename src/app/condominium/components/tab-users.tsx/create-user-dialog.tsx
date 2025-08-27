import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumberFormatValues, PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import type { CreateUserSchema } from "@/actions/create-user/schema";
import { createUserSchema } from "@/actions/create-user/schema";

const createUserFormSchema = createUserSchema.omit({ birthDate: true }).extend({
  birthDate: z
    .string()
    .min(1, "Data de nascimento obrigatória")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido (dd/MM/yyyy)"),
});

type CreateUserFormValues = z.infer<typeof createUserFormSchema>;
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/hooks/mutations/create-user";

import {
  MaritalStatus,
  Role,
  Status,
  type User,
} from "../../../../../generated/prisma";

interface CreateUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEdit?: boolean;
  user?: User;
  showTrigger?: boolean;
}

export function CreateUserDialog({
  open,
  setOpen,
  isEdit = false,
  user,
  showTrigger = false,
}: CreateUserDialogProps) {
  const createUserMutation = useCreateUser();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: Role.RESIDENT,
      status: Status.ACTIVE,
      avatarUrl: undefined,
      document: "",
      rg: "",
      ra: "",
      phone1: "",
      phone2: "",
      whatsapp: "",
      profession: "",
      birthDate: "",
      maritalStatus: MaritalStatus.SINGLE,
    },
    values:
      isEdit && user
        ? {
            name: user.name ?? "",
            email: user.email ?? "",
            role: user.role ?? "RESIDENT",
            status: user.status ?? Status.ACTIVE,
            avatarUrl: user.avatar_url ?? undefined,
            document: user.document ?? "",
            rg: user.rg ?? "",
            ra: user.ra ?? "",
            phone1: user.phone1 ?? "",
            phone2: user.phone2 ?? "",
            whatsapp: user.whatsapp ?? "",
            profession: user.profession ?? "",
            birthDate: user.birth_date?.toLocaleDateString("pt-BR") ?? "",
            maritalStatus: user.marital_status ?? MaritalStatus.SINGLE,
          }
        : undefined,
  });

  const onSubmit = (values: CreateUserFormValues) => {
    const [day, month, year] = values.birthDate.split("/");
    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
    );

    const createUserData: CreateUserSchema = {
      ...values,
      birthDate,
    };

    createUserMutation.mutate(createUserData, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Usuário criado com sucesso");
      },
      onError: (error) => {
        toast.error("Erro ao criar usuário", {
          description:
            error instanceof Error ? error.message : "Erro desconhecido",
        });
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">Adicionar usuário</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="flex max-h-[90vh] max-w-3xl flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar usuário" : "Adicionar usuário"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edite as informações do usuário"
              : "Adicione um novo usuário ao seu condomínio."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 gap-4 space-y-4 overflow-y-auto p-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um cargo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="overflow-y-auto">
                          <SelectItem value="ADMIN">Administrador</SelectItem>
                          <SelectItem value="BUILDING_MANAGER">
                            Síndico
                          </SelectItem>
                          <SelectItem value="COUNSELOR">Conselheiro</SelectItem>
                          <SelectItem value="RESIDENT">Residente</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF*</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="###.###.###-##"
                        mask="_"
                        value={field.value}
                        onValueChange={(v: NumberFormatValues) =>
                          field.onChange(v.formattedValue)
                        }
                        customInput={Input}
                        placeholder="000.000.000-00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RG</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RA</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone 1*</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="(##) #####-####"
                        mask="_"
                        value={field.value}
                        onValueChange={(v: NumberFormatValues) =>
                          field.onChange(v.formattedValue)
                        }
                        customInput={Input}
                        placeholder="(00) 00000-0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone 2</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="(##) #####-####"
                        mask="_"
                        value={field.value}
                        onValueChange={(v: NumberFormatValues) =>
                          field.onChange(v.formattedValue)
                        }
                        customInput={Input}
                        placeholder="(00) 00000-0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="(##) #####-####"
                        mask="_"
                        value={field.value}
                        onValueChange={(v: NumberFormatValues) =>
                          field.onChange(v.formattedValue)
                        }
                        customInput={Input}
                        placeholder="(00) 00000-0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profissão*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: Engenheiro"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de nascimento*</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="##/##/####"
                        mask="_"
                        value={field.value}
                        onValueChange={(v: NumberFormatValues) =>
                          field.onChange(v.formattedValue)
                        }
                        customInput={Input}
                        placeholder="00/00/0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado civil*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um estado civil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="overflow-y-auto">
                          <SelectItem value="SINGLE">Solteiro</SelectItem>
                          <SelectItem value="MARRIED">Casado</SelectItem>
                          <SelectItem value="DIVORCED">Divorciado</SelectItem>
                          <SelectItem value="WIDOWED">Viúvo</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="border-t pt-4">
              <Button
                type="submit"
                className="text-sm font-semibold text-zinc-900"
                disabled={
                  form.formState.isSubmitting || createUserMutation.isPending
                }
              >
                {createUserMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isEdit ? (
                  "Editar usuário"
                ) : (
                  "Adicionar usuário"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
