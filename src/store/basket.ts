import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { mapPizzaSizeToNumber } from "@/constants";

export interface BasketItem {
  name: string;
  pizzaSize: number;
  quantity: number;
  price: number;
  toppings: PizzaIngredientName[];
}

export type BasketItemState = [Pizza, BasketItem];

interface BasketState {
  totalAmount: number;
  basketItems: BasketItemState[];

  updateTotalAmount: () => void;
  addBasketItem: (cartItem: BasketItemState) => void;
  updateItemQuantity: (cartItem: BasketItemState, quantity: number) => void;
  updateSelectedItem: (
    pizza: BasketItemState,
    pizzaSize: PizzaSizeName,
    pizzaToppings: PizzaIngredientName[],
    pizzaPrice: number
  ) => void;
  removeBasketItem: (cartItem: BasketItemState) => void;
  clearBasket: () => void;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      totalAmount: 0,
      basketItems: [],

      updateTotalAmount: () =>
        set({
          totalAmount: get().basketItems.reduce(
            (sum, basketState) =>
              sum + basketState[1].price * basketState[1].quantity,
            0
          ),
        }),

      addBasketItem: (cartItem: BasketItemState) => {
        const item = get().basketItems.find(item =>
          arePizzasEqual(item[1], cartItem[1])
        );

        if (item) {
          get().updateItemQuantity(cartItem, 1);
        } else {
          set({ basketItems: [...get().basketItems, cartItem] });
        }

        get().updateTotalAmount();
      },

      updateItemQuantity: (cartItem: BasketItemState, quantity: number) => {
        get().basketItems.find(item =>
          arePizzasEqual(item[1], cartItem[1])
        )![1].quantity += quantity;

        get().updateTotalAmount();
      },

      updateSelectedItem: (
        pizza: BasketItemState,
        pizzaSize: PizzaSizeName,
        pizzaToppings: PizzaIngredientName[],
        pizzaPrice: number
      ) => {
        const item = get().basketItems.find(item =>
          arePizzasEqual(item[1], pizza[1])
        )!;

        const updatedItem = [
          item[0],
          {
            ...item[1],
            pizzaSize: mapPizzaSizeToNumber[pizzaSize],
            toppings: pizzaToppings,
            price: pizzaPrice,
          },
        ] as BasketItemState;

        const similarItem = get().basketItems.find(item =>
          arePizzasEqual(item[1], updatedItem[1])
        );

        if (similarItem) {
          similarItem[1].quantity += item[1].quantity;
          set({
            basketItems: get().basketItems.filter(
              basketItem => !arePizzasEqual(basketItem[1], item[1])
            ),
          });
        } else {
          item[1].pizzaSize = updatedItem[1].pizzaSize;
          item[1].price = updatedItem[1].price;
          item[1].toppings = updatedItem[1].toppings;
        }

        get().updateTotalAmount();
      },

      removeBasketItem: (cartItem: BasketItemState) => {
        set({
          basketItems: get().basketItems.filter(
            item => !arePizzasEqual(item[1], cartItem[1])
          ),
        });

        get().updateTotalAmount();
      },

      clearBasket: () => {
        set({ totalAmount: 0, basketItems: [] });
      },
    }),
    {
      name: "userBasket",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const areSetsEqual = (
  firstSet: Set<PizzaIngredientName>,
  secondSet: Set<PizzaIngredientName>
): boolean => {
  if (firstSet.size !== secondSet.size) return false;

  for (const elem of Array.from(firstSet)) {
    if (!secondSet.has(elem)) return false;
  }
  return true;
};

const arePizzasEqual = (
  firstPizza: BasketItem,
  secondPizza: BasketItem
): boolean => {
  return (
    firstPizza.name === secondPizza.name &&
    firstPizza.pizzaSize === secondPizza.pizzaSize &&
    firstPizza.price === secondPizza.price &&
    areSetsEqual(new Set(firstPizza.toppings), new Set(secondPizza.toppings))
  );
};
