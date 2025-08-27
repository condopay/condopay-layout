import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCondominium } from "@/actions/update-condominium";

import { getCondominiumInfoQueryKey } from "../queries/use-condominium";

export const getUpdateCondominiumMutationKey = () =>
  ["update-condominium"] as const;

export const useUpdateCondominium = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateCondominiumMutationKey(),
    mutationFn: updateCondominium,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getCondominiumInfoQueryKey() }),
  });
};
