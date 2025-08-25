import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/actions/get-users";

import { User } from "../../../generated/prisma";

export const getUsersQueryKey = () =>
  ["users"] as const;

export const useUsers = ({ initialData }: { initialData: User[] }) => {
  setTimeout(() => {
    console.log("useUsers");
  }, 1000);
  return useQuery({
    queryKey: getUsersQueryKey(),
    queryFn: getUsers,
    initialData,
  });
};
