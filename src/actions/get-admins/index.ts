import { type GetAdminsSchema } from "./schema";

export async function getAdmins({ buildingId }: GetAdminsSchema) {
  const users = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/condominio.png",
    },
    {
      id: "2",
      name: "Jane Doe",
      avatar: "/condominio.png",
    },
    {
      id: "3",
      name: "John Smith",
      avatar: "/condominio.png",
    },
  ];

  return { users };
}
