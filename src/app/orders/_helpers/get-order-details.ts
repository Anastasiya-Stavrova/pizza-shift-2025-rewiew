import {
  mapPizzaIngredientsToName,
  mapPizzaSizeToName,
  mapPizzaSizeToNumber,
} from "@/constants";

export interface OrderDetails {
  orderAddress: string;
  orderStructure: string[];
  totalAmount: number;
}

export const getOrderDetails = (
  address: ReceiverAddress,
  pizzas: OrderedPizza[],
  isFullDetails: boolean = false
): OrderDetails => {
  const orderAddress =
    `${address.street}, ${address.apartment}, ${address.house}`
      .replace(/^[,\s]+|[,\s]+$/g, "")
      .replace(/,[,\s]*,/g, ",");

  let orderStructure: string[];
  if (isFullDetails) {
    orderStructure = pizzas.map(pizza => {
      const details = [];

      details.push(`${pizza.name}, `);

      details.push(
        `${mapPizzaSizeToName[pizza.size.name]} ${
          mapPizzaSizeToNumber[pizza.size.name]
        } см, традиционное тесто`
      );

      if (pizza.toppings.length > 0) {
        details.push(" + ");

        details.push(
          Array.from(pizza.toppings)
            .map(topping => mapPizzaIngredientsToName[topping.name])
            .join(", ")
        );
      }

      return details.join("");
    });
  } else {
    orderStructure = pizzas.map(pizza => pizza.name);
  }

  const countsSimilarPizzas = orderStructure.reduce<Record<string, number>>(
    (counts, pizzaDetails) => {
      counts[pizzaDetails] = (counts[pizzaDetails] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>
  );

  orderStructure = Object.entries(countsSimilarPizzas).map(
    ([key, value]) => `${key} x ${value}`
  );

  const totalAmount = pizzas.reduce(
    (sum, pizza) =>
      sum +
      (pizza.size.price +
        pizza.toppings.reduce((sum, topping) => sum + topping.cost, 0)),
    0
  );

  return {
    orderAddress,
    orderStructure,
    totalAmount,
  };
};
