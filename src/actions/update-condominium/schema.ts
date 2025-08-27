import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
  zipCode: z.string().min(1, "CEP obrigatório"),
  country: z.string().min(1, "País obrigatório"),
});

export const updateCondominiumSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Nome obrigatório"),
  cnpj: z
    .string()
    .min(18, "CNPJ obrigatório")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
  phone: z.string().min(15, "Telefone obrigatório"),
  condominiumType: z.string().min(1, "Tipo de condomínio obrigatório"),
  address: addressSchema,
});

export type UpdateCondominiumSchema = z.infer<typeof updateCondominiumSchema>;
