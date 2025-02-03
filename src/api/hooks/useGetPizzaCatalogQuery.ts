import { useQuery } from "@tanstack/react-query";

import { Api } from "../api-client";

export const useGetPizzaCatalogQuery = (
  settings?: QuerySettings<typeof Api.pizza.getPizzasCatalog>
) => {
  return useQuery({
    queryKey: ["getPizzaCatalog"],
    queryFn: () => Api.pizza.getPizzasCatalog({ config: settings?.config }),
    refetchInterval: 10 * 1000,
    gcTime: 0,
    staleTime: 0,
    ...settings?.options,
  });
};
