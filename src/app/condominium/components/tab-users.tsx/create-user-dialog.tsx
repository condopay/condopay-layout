import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const createUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.email("Email inválido"),
  role: z.enum(["admin", "user"]),
  status: z.enum(["active", "inactive"]),
  avatarUrl: z.string().optional(),
  document: z.string().min(1, "CPF obrigatório"),
  rg: z.string().optional(),
  ra: z.string().optional(),
  phone1: z.string().min(1, "Telefone obrigatório"),
  phone2: z.string().optional(),
  whatsapp: z.string().optional(),
  profession: z.string().min(1, "Profissão obrigatória"),
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  maritalStatus: z.string().min(1, "Estado civil obrigatório"),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

export function CreateUserDialog() {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      status: "active",
      avatarUrl: "",
      document: "",
      rg: "",
      ra: "",
      phone1: "",
      phone2: "",
      whatsapp: "",
      profession: "",
      birthDate: "",
      maritalStatus: "",
    },
  });

  const onSubmit = (data: CreateUserFormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Adicionar usuário</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] max-w-3xl flex-col">
        <DialogHeader>
          <DialogTitle>Adicionar usuário</DialogTitle>
          <DialogDescription>
            Adicione um novo usuário ao seu condomínio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {Object.entries(createUserSchema.shape).map(([key]) => {
                if (key !== "id") {
                  return (
                    <FormField
                      key={key}
                      control={form.control}
                      name={key as keyof typeof createUserSchema.shape}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Input placeholder={key} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                }
              })}
            </div>
            <DialogFooter className="border-t pt-4">
              <Button type="submit">Adicionar usuário</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
