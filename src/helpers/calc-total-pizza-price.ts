export const calcTotalPizzaPrice = (
  pizzaSize: PizzaSize,
  toppings: PizzaIngredient[],
  selectedToppings: Set<string>
): number => {
  const totalToppingsPrice = toppings
    .filter(topping => selectedToppings.has(topping.name))
    .reduce((sum, topping) => sum + topping.cost, 0);

  return pizzaSize.price + totalToppingsPrice;
};
