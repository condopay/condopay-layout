"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumberFormatValues, PatternFormat } from "react-number-format";
import { toast } from "sonner";

import {
  type UpdateCondominiumSchema,
  updateCondominiumSchema,
} from "@/actions/update-condominium/schema";
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
import { useUpdateCondominium } from "@/hooks/mutations/update-condominium";

import {
  type Address,
  type Condominium,
  CondominiumType,
} from "../../../../../generated/prisma";

interface EditCondominiumDialogProps {
  condominiumData: Condominium & { address: Address };
}
export function EditCondominiumDialog({
  condominiumData,
}: EditCondominiumDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<UpdateCondominiumSchema>({
    resolver: zodResolver(updateCondominiumSchema),
    defaultValues: {
      id: condominiumData.id,
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
        zipCode: condominiumData.address?.zip_code,
        country: condominiumData.address?.country,
      },
    },
  });
  const updateCondominiumMutation = useUpdateCondominium();
  const onSubmit = (values: UpdateCondominiumSchema) => {
    updateCondominiumMutation.mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Informações do condomínio atualizadas com sucesso");
      },
      onError: (error) => {
        toast.error("Erro ao atualizar informações", {
          description:
            error instanceof Error ? error.message : "Erro desconhecido",
        });
      },
    });
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
            <div className="flex-1 gap-4 space-y-4 overflow-y-auto p-2">
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
                          <SelectItem value={CondominiumType.APARTMENT}>
                            Apartamento
                          </SelectItem>
                          <SelectItem value={CondominiumType.HOUSE}>
                            Casa
                          </SelectItem>
                          <SelectItem value={CondominiumType.COMMERCIAL}>
                            Comercial
                          </SelectItem>
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
                  name="address.zipCode"
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
                disabled={
                  form.formState.isSubmitting ||
                  updateCondominiumMutation.isPending
                }
              >
                {updateCondominiumMutation.isPending ? (
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
