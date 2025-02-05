import React from "react";

import { BasketContextActions } from "./basket-context";

export const useBasketActions = () => {
  const basketContextActions = React.useContext(BasketContextActions);

  if (!BasketContextActions) {
    throw new Error("Подключите BasketContextActionsProvider!");
  }

  return basketContextActions;
};
