import { prisma } from "@/lib/prisma";

import { Role, Status } from "../../../../../generated/prisma";
import CondominiumInfo from "./condominium-info";
import UserList from "./user-list";

export async function TabCondominiumInfo() {
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [Role.ADMIN, Role.BUILDING_MANAGER, Role.COUNSELOR],
      },
      status: Status.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      avatar_url: true,
      role: true,
    },
  });
  const buildingManagers = users.filter(
    (user) => user.role === Role.BUILDING_MANAGER,
  );
  const admins = users.filter((user) => user.role === Role.ADMIN);
  const counselors = users.filter((user) => user.role === Role.COUNSELOR);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-xl bg-white p-4 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <div className="flex items-center justify-center">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-500 dark:text-white">
              Informações do Condomínio
            </h2>
          </div>
          <div className="flex-1">
            <CondominiumInfo className="h-full" />
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-white p-4 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <div className="flex items-center justify-center">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-500 dark:text-white">
              Usuários do Condomínio
            </h2>
          </div>
          <div className="flex-1 space-y-4">
            <UserList title="Sindicos" users={buildingManagers} />
            <UserList title="Administradores" users={admins} />
            <UserList title="Conselheiros" users={counselors} />
          </div>
        </div>
      </div>
    </div>
  );
}
