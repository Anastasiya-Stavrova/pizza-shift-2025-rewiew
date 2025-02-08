import { useQuery } from "@tanstack/react-query";

import { getPizzasCatalog } from "../requests/pizza";

export const useGetPizzaCatalogQuery = (
  settings?: QuerySettings<typeof getPizzasCatalog>
) => {
  return useQuery({
    queryKey: ["getPizzaCatalog"],
    queryFn: () => getPizzasCatalog({ config: settings?.config }),
    refetchInterval: 10 * 1000,
    gcTime: 0,
    staleTime: 0,
    ...settings?.options,
  });
};
