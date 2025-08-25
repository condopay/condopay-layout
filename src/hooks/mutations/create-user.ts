import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "@/actions/create-user";
import { getUsersQueryKey } from "@/hooks/queries/use-users";

export const getCreateUserMutationKey = () => ["create-user"] as const;

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getCreateUserMutationKey(),
    mutationFn: createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() }),
  });
};
