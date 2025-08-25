import { z } from "zod";

import { MaritalStatus, Role, Status } from "../../../generated/prisma";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.email("Email inválido"),
  role: z.enum(Role),
  status: z.enum(Status),
  avatarUrl: z.string().optional(),
  document: z
    .string()
    .min(14, "CPF obrigatório")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  rg: z.string().optional(),
  ra: z.string().optional(),
  phone1: z.string().min(15, "Telefone obrigatório"),
  phone2: z.string().optional(),
  whatsapp: z.string().optional(),
  profession: z.string().min(1, "Profissão obrigatória"),
  birthDate: z
    .string()
    .min(1, "Data de nascimento obrigatória")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido (dd/MM/yyyy)"),
  maritalStatus: z.enum(MaritalStatus),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
