import { instance } from "@/api/instance";

type GetPizzasCatalogRequestConfig = RequestConfig;

export const getPizzasCatalog = async (
  params?: GetPizzasCatalogRequestConfig
) => {
  return instance.get<PizzasResponse>("pizza/catalog", params?.config);
};
