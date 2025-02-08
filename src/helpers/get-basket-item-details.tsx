import {
  mapPizzaNumberToSize,
  mapPizzaSizeToName,
  mapPizzaIngredientsToName,
} from "@/constants";

export const getBasketItemDetails = (
  pizzaSize: number,
  selectedToppings: Set<PizzaIngredientName>,
  quantity: number | null = null
) => {
  const details = [];

  const pizzaSizeName =
    mapPizzaNumberToSize[pizzaSize as keyof typeof mapPizzaNumberToSize];

  details.push(
    `${mapPizzaSizeToName[pizzaSizeName]} ${pizzaSize} см, традиционное тесто`
  );

  if (selectedToppings.size > 0) {
    details.push(" + ");

    details.push(
      Array.from(selectedToppings)
        .map(topping => mapPizzaIngredientsToName[topping])
        .join(", ")
    );
  }

  if (quantity) {
    details.push(` x ${quantity}`);
  }

  return details.join("");
};
