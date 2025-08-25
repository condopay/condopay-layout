import { z } from "zod";

export const getUsersSchema = z.object({
  buildingId: z.string(),
  search: z.string().optional(),
});

export type GetUsersSchema = z.infer<typeof getUsersSchema>;

export const usersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  status: z.string(),
  avatarUrl: z.string(),
  document: z.string(),
  rg: z.string(),
  ra: z.string(),
  phone1: z.string(),
  phone2: z.string(),
  whatsapp: z.string(),
  profession: z.string(),
  birthDate: z.string(),
  maritalStatus: z.string(),
});

export type UsersSchema = z.infer<typeof usersSchema>;
