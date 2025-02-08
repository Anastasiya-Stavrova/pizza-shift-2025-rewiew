import { useBasketStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

export const useBasket = () => {
  const {
    totalAmount,
    basketItems,
    addBasketItem,
    updateItemQuantity,
    updateSelectedItem,
    removeBasketItem,
    clearBasket,
  } = useBasketStore(
    useShallow(state => ({
      totalAmount: state.totalAmount,
      basketItems: state.basketItems,
      addBasketItem: state.addBasketItem,
      updateItemQuantity: state.updateItemQuantity,
      updateSelectedItem: state.updateSelectedItem,
      removeBasketItem: state.removeBasketItem,
      clearBasket: state.clearBasket,
    }))
  );

  return {
    totalAmount,
    basketItems,
    addBasketItem,
    updateItemQuantity,
    updateSelectedItem,
    removeBasketItem,
    clearBasket,
  };
};
