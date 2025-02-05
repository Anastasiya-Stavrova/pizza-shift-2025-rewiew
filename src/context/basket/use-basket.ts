import React from "react";

import { BasketContext } from "./basket-context";

export const useBasket = () => {
  const basketContext = React.useContext(BasketContext);

  if (!basketContext) {
    throw new Error("Подключите BasketContextProvider!");
  }

  return basketContext;
};
