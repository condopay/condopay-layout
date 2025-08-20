import type { GetUsersSchema } from "./schema";

export async function getUsers({ buildingId, search }: GetUsersSchema) {
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+55 11 99999-9999",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+55 11 88888-8888",
      role: "resident",
      status: "active",
    },
    {
      id: "3",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+55 11 77777-7777",
      role: "resident",
      status: "inactive",
    },
    {
      id: "4",
      name: "Maria Silva",
      email: "maria.silva@example.com",
      phone: "+55 11 66666-6666",
      role: "resident",
      status: "active",
    },
  ];

  let filteredUsers = users;

  if (search) {
    filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return { users: filteredUsers };
}
