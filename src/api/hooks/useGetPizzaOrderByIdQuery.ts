import { useQuery } from "@tanstack/react-query";

import { Api } from "../api-client";

type GetPizzaOrderByIdParams = CancelPizzaOrderDto;

export const useGetPizzaOrderByIdQuery = (
  params: GetPizzaOrderByIdParams,
  settings?: QuerySettings<typeof Api.pizza.getPizzaOrderById>
) => {
  return useQuery({
    queryKey: ["getPizzaOrderById", params],
    queryFn: () =>
      Api.pizza.getPizzaOrderById({ params, config: settings?.config }),
    ...settings?.options,
  });
};
