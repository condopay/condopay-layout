import { prisma } from "../../lib/prisma";
import { GetUsersSchema } from "./schema";

export async function getUsers(params?: GetUsersSchema) {
  try {
    const where = {
      ...(params?.buildingId && { buildingId: params.buildingId }),
      ...(params?.search && {
        OR: [
          { name: { contains: params.search, mode: "insensitive" as const } },
          { email: { contains: params.search, mode: "insensitive" as const } },
          {
            document: { contains: params.search, mode: "insensitive" as const },
          },
        ],
      }),
    };

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        avatarUrl: true,
        document: true,
        rg: true,
        ra: true,
        phone1: true,
        phone2: true,
        whatsapp: true,
        profession: true,
        birthDate: true,
        maritalStatus: true,
        buildingId: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { users };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
