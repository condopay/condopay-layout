import { z } from "zod";

export const getUsersSchema = z.object({
  buildingId: z.string(),
  search: z.string().optional(),
});

export type GetUsersSchema = z.infer<typeof getUsersSchema>;

export const usersSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome obrigatório"),
  email: z.email("Email inválido"),
  role: z.enum(["admin", "user"]).default("user"),
  status: z.enum(["active", "inactive"]).default("active"),
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
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  maritalStatus: z.string().min(1, "Estado civil obrigatório"),
});

export type UsersSchema = z.infer<typeof usersSchema>;
