"use server";

import { prisma } from "@/lib/prisma";

import { type CreateUserSchema, createUserSchema } from "./schema";

export const createUser = async (data: CreateUserSchema) => {
  const validatedData = createUserSchema.parse(data);
  const password = "password";

  const user = await prisma.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      password: password,
      birth_date: validatedData.birthDate,
      document: validatedData.document,
      profession: validatedData.profession,
      phone1: validatedData.phone1,
      phone2: validatedData.phone2,
      whatsapp: validatedData.whatsapp,
      marital_status: validatedData.maritalStatus,
      rg: validatedData.rg,
      ra: validatedData.ra,
      avatar_url: validatedData.avatarUrl,
      role: validatedData.role,
      status: validatedData.status,
    },
  });
  return user;
};
