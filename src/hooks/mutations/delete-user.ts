import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "@/actions/delete-user";
import { getUsersQueryKey } from "@/hooks/queries/use-users";

export const getDeleteUserMutationKey = () => ["delete-user"] as const;

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDeleteUserMutationKey(),
    mutationFn: deleteUser,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
      }
    },
  });
};
