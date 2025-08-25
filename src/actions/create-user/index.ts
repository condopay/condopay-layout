"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type { MaritalStatus, Role, Status } from "../../../generated/prisma";
import { type CreateUserSchema } from "./schema";

export const createUser = async (data: CreateUserSchema) => {
  const password = "password";

  const [day, month, year] = data.birthDate.split("/");
  const birthDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
  );

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: password,
      birth_date: birthDate,
      document: data.document,
      profession: data.profession,
      phone1: data.phone1,
      phone2: data.phone2,
      whatsapp: data.whatsapp,
      marital_status: data.maritalStatus as MaritalStatus,
      rg: data.rg,
      ra: data.ra,
      avatar_url: data.avatarUrl,
      role: data.role as Role,
      status: data.status as Status,
    },
  });
  revalidatePath("/condominium/users");
  return user;
};
