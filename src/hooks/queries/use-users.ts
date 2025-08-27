import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/actions/get-users";

export const getUsersQueryKey = () => ["users"] as const;

export const useUsers = () => {
  return useQuery({
    queryKey: getUsersQueryKey(),
    queryFn: getUsers,
  });
};
