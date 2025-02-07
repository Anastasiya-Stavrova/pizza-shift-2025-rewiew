import React from "react";
import { useShallow } from "zustand/react/shallow";

import { useBasketStore } from "@/store";

export const useBasket = () => {
  const basketState = useBasketStore(useShallow(state => state));

  React.useEffect(() => {
    basketState.getBasketItems();
  }, []);

  return basketState;
};
