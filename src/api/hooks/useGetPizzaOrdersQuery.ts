import { useQuery } from "@tanstack/react-query";

import { Api } from "../api-client";

export function useGetPizzaOrdersQuery(
  settings?: QuerySettings<typeof Api.pizza.getPizzaOrders>
) {
  return useQuery({
    queryKey: ["getPizzaOrders"],
    queryFn: () => Api.pizza.getPizzaOrders({ config: settings?.config }),
    ...settings?.options,
  });
}
