import { useState } from "react";
import { useSet } from "react-use";

import { BasketItem } from "@/store";
import { calcTotalPizzaPrice } from "@/helpers";
import { mapPizzaNumberToSize } from "@/constants";

interface UsePizzaOptionsParams {
  states: {
    size: PizzaSizeName;
    selectedToppings: Set<PizzaIngredientName>;
    totalPrice: number;
  };
  functions: {
    setSize: (size: PizzaSizeName) => void;
    addToppings: (name: PizzaIngredientName) => void;
    resetSelectedOptions: () => void;
  };
}

export const usePizzaOptions = (
  pizza: Pizza,
  item?: BasketItem
): UsePizzaOptionsParams => {
  const [size, setSize] = useState<PizzaSizeName>(
    mapPizzaNumberToSize[
      item?.pizzaSize as keyof typeof mapPizzaNumberToSize
    ] || "SMALL"
  );

  const [selectedToppings, { toggle: addToppings }] = useSet(
    new Set(item?.toppings) || new Set<PizzaIngredientName>()
  );

  const totalPrice = calcTotalPizzaPrice(
    pizza.sizes.find(pizzaSize => pizzaSize.name === size)!,
    pizza.toppings,
    selectedToppings
  );

  const resetSelectedOptions = () => {
    selectedToppings.forEach(topping => addToppings(topping));
    setSize("SMALL");
  };

  return {
    states: {
      size,
      selectedToppings,
      totalPrice,
    },
    functions: {
      setSize,
      addToppings,
      resetSelectedOptions,
    },
  };
};
