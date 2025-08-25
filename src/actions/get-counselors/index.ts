import { prisma } from "../../lib/prisma";

export async function getCounselors() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "counselor",
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
    console.error("Error fetching counselors:", error);
    throw new Error("Failed to fetch counselors");
  }
}
