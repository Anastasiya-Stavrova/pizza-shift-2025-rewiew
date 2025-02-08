import { BasketItemState } from "@/store";
import { mapPizzaSizeToNumber } from "@/constants";

export const getOrderedPizzas = (
  basketItems: BasketItemState[]
): OrderedPizza[] => {
  const order: OrderedPizza[] = [];

  basketItems.forEach(item => {
    const sizeKey = (
      Object.entries(mapPizzaSizeToNumber) as [string, number][]
    ).find(([, value]) => value === item[1].pizzaSize)?.[0] as PizzaSizeName;

    const sizeInfo = item[0].sizes.find(size => size.name === sizeKey)!;

    const toppingsInfo = item[1].toppings.map(toppingName => {
      const topping = item[0].toppings.find(
        topping => topping.name === toppingName
      )!;

      return {
        name: topping.name,
        cost: topping.cost,
      };
    });

    for (let i = 0; i < item[1].quantity; ++i) {
      order.push({
        id: item[0].id,
        name: item[0].name,
        toppings: toppingsInfo,
        size: {
          name: sizeKey,
          price: sizeInfo.price,
        },
        doughs: { name: "THIN", price: 0 },
      });
    }
  });

  return order;
};
