import { useQuery } from "@tanstack/react-query";

import { getCondominiumInfo } from "@/actions/get_condominium";

export const getCondominiumInfoQueryKey = () => ["condominium"] as const;

export const useCondominiumInfo = () => {
  return useQuery({
    queryKey: getCondominiumInfoQueryKey(),
    queryFn: getCondominiumInfo,
  });
};
