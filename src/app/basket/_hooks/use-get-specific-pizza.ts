import React from "react";

import { useGetPizzaCatalogQuery } from "@/api";

export const useGetSpecificPizza = (pizzaId: string) => {
  const { isLoading: loading, data, error } = useGetPizzaCatalogQuery();

  if (error) {
    console.log(error);
  }

  const specificPizza = React.useMemo(() => {
    return data?.data.catalog.find(pizza => pizza.id === pizzaId)!;
  }, [data?.data.catalog]);

  return {
    loading,
    specificPizza,
  };
};
