import { type GetBuildingManagerSchema } from "./schema";

export async function getBuildingManager({
  buildingId,
}: GetBuildingManagerSchema) {
  const users = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/condominio.png",
    },
  ];

  return { users };
}
