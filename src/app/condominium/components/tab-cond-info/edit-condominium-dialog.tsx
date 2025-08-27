"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumberFormatValues, PatternFormat } from "react-number-format";
import { toast } from "sonner";
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

import type { Address, Condominium } from "../../../../../generated/prisma";

const addressSchema = z.object({
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
  zip_code: z.string().min(1, "CEP obrigatório"),
  country: z.string().min(1, "País obrigatório"),
});

const editCondominiumFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  cnpj: z
    .string()
    .min(18, "CNPJ obrigatório")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
  phone: z.string().min(15, "Telefone obrigatório"),
  condominiumType: z.string().min(1, "Tipo de condomínio obrigatório"),
  address: addressSchema,
});

type EditCondominiumFormValues = z.infer<typeof editCondominiumFormSchema>;

interface EditCondominiumDialogProps {
  condominiumData: Condominium & { address: Address };
  onSave?: (data: Condominium & { address: Address }) => void;
}

export function EditCondominiumDialog({
  condominiumData,
  onSave,
}: EditCondominiumDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditCondominiumFormValues>({
    resolver: zodResolver(editCondominiumFormSchema),
    defaultValues: {
      name: condominiumData.name,
      cnpj: condominiumData.cnpj,
      phone: condominiumData.phone,
      condominiumType: condominiumData.condominium_type,
      address: {
        street: condominiumData.address?.street,
        number: condominiumData.address?.number,
        neighborhood: condominiumData.address?.neighborhood,
        complement: condominiumData.address?.complement ?? undefined,
        city: condominiumData.address?.city,
        state: condominiumData.address?.state,
        zip_code: condominiumData.address?.zip_code,
        country: condominiumData.address?.country,
      },
    },
  });

  const onSubmit = async (values: EditCondominiumFormValues) => {
    setIsLoading(true);
    try {
      onSave?.({
        ...condominiumData,
        ...values,
        address: {
          ...condominiumData.address,
          ...values.address,
        },
      });
      setOpen(false);
      toast.success("Informações do condomínio atualizadas com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar informações", {
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col">
        <DialogHeader>
          <DialogTitle>Editar informações do condomínio</DialogTitle>
          <DialogDescription>
            Edite as informações básicas do seu condomínio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 gap-4 space-y-4 overflow-y-auto pr-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Condomínio*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: Condomínio Edifício Princesa Isabel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ*</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="##.###.###/####-##"
                        mask="_"
                        value={field.value}
                        onValueChange={(v: NumberFormatValues) =>
                          field.onChange(v.formattedValue)
                        }
                        customInput={Input}
                        placeholder="00.000.000/0000-00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone*</FormLabel>
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
                name="condominiumType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Condomínio*</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o tipo de condomínio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="overflow-y-auto">
                          <SelectItem value="Apartamento">
                            Apartamento
                          </SelectItem>
                          <SelectItem value="Casa">Casa</SelectItem>
                          <SelectItem value="Comercial">Comercial</SelectItem>
                          <SelectItem value="Misto">Misto</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ex: Rua das Flores"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número*</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ex: Jardim"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade*</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado*</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="SP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP*</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          mask="_"
                          value={field.value}
                          onValueChange={(v: NumberFormatValues) =>
                            field.onChange(v.formattedValue)
                          }
                          customInput={Input}
                          placeholder="00000-000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="border-t pt-4">
              <Button
                type="submit"
                className="text-sm font-semibold text-zinc-900"
                disabled={form.formState.isSubmitting || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
