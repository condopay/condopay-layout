import { type GetCounselorsSchema } from "./schema";

export async function getCounselors({ buildingId }: GetCounselorsSchema) {
  const users = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/user.png",
    },
    {
      id: "2",
      name: "Jane Doe",
      avatar: "/user.png",
    },
    {
      id: "3",
      name: "John Smith",
      avatar: "/user.png",
    },
  ];

  return { users };
}
