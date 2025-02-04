import { useQuery } from "@tanstack/react-query";

import { getPizzaOrderById } from "../requests/pizza";

type GetPizzaOrderByIdParams = CancelPizzaOrderDto;

export const useGetPizzaOrderByIdQuery = (
  params: GetPizzaOrderByIdParams,
  settings?: QuerySettings<typeof getPizzaOrderById>
) => {
  return useQuery({
    queryKey: ["getPizzaOrderById", params],
    queryFn: () => getPizzaOrderById({ params, config: settings?.config }),
    ...settings?.options,
  });
};
