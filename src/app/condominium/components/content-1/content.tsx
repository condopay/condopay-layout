import { getAdmins } from "@/actions/get-admins";
import { getBuildingManager } from "@/actions/get-building-manager";
import { getCounselors } from "@/actions/get-counselors";

import CondominiumInfo from "./condominium-info";
import UserList from "./user-list";

export async function Content() {
  const { users: buildingManagers } = await getBuildingManager({
    buildingId: "1",
  });
  const { users: admins } = await getAdmins({ buildingId: "1" });
  const { users: counselors } = await getCounselors({ buildingId: "1" });
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
