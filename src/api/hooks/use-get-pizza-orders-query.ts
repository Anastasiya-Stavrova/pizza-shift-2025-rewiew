import { useQuery } from "@tanstack/react-query";

import { getPizzaOrders } from "../requests/pizza";

export function useGetPizzaOrdersQuery(
  settings?: QuerySettings<typeof getPizzaOrders>
) {
  return useQuery({
    queryKey: ["getPizzaOrders"],
    queryFn: () => getPizzaOrders({ config: settings?.config }),
    ...settings?.options,
  });
}
