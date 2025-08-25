import { prisma } from "../../lib/prisma";

export async function getBuildingManager() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "building_manager",
        status: "active",
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatarUrl || "/user.png",
    }));

    return { users: formattedUsers };
  } catch (error) {
    console.error("Error fetching building manager:", error);
    throw new Error("Failed to fetch building manager");
  }
}
