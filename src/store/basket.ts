import { create } from "zustand";

import { mapPizzaSizeToNumber } from "@/constants";

export interface BasketItemState {
  id: string;
  name: string;
  img: string;
  pizzaSize: number;
  quantity: number;
  price: number;
  toppings: Set<PizzaIngredientName>;
}

interface BasketState {
  totalAmount: number;
  basketItems: BasketItemState[];

  getBasketItems: () => void;
  updateItemQuantity: (cartItem: BasketItemState, quantity: number) => void;
  updateSelectedItem: (
    pizza: BasketItemState,
    pizzaSize: PizzaSizeName,
    pizzaToppings: Set<PizzaIngredientName>,
    pizzaPrice: number
  ) => void;
  addBasketItem: (cartItem: BasketItemState) => void;
  removeBasketItem: (cartItem: BasketItemState) => void;
}

export const useBasketStore = create<BasketState>((set, get) => ({
  totalAmount: 0,
  basketItems: [],

  getBasketItems: () => {
    const userBasket = localStorage.getItem("userBasket");

    if (userBasket && get().basketItems.length === 0) {
      const items = JSON.parse(userBasket).map((item: any) => {
        return {
          ...item,
          toppings: new Set(item.toppings),
        };
      });
      set({ basketItems: [...items] });
    } else if (get().basketItems.length > 0) {
      const items = get().basketItems.map(item => {
        return {
          ...item,
          toppings: Array.from(item.toppings),
        };
      });
      localStorage.setItem("userBasket", JSON.stringify(items));
    }

    const totalAmount = get().basketItems.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
      0
    );
    set({ totalAmount });
  },

  updateItemQuantity: (cartItem: BasketItemState, quantity: number) => {
    const item = get().basketItems.find(item => arePizzasEqual(item, cartItem));

    if (item) {
      item.quantity += quantity;
    }

    get().getBasketItems();
  },

  updateSelectedItem: (
    pizza: BasketItemState,
    pizzaSize: PizzaSizeName,
    pizzaToppings: Set<PizzaIngredientName>,
    pizzaPrice: number
  ) => {
    const item = get().basketItems.find(item => arePizzasEqual(item, pizza))!;

    const updatedItem = {
      ...item,
      pizzaSize: mapPizzaSizeToNumber[pizzaSize],
      toppings: pizzaToppings,
      price: pizzaPrice,
    };

    const similarItem = get().basketItems.find(item =>
      arePizzasEqual(item, updatedItem)
    );

    if (similarItem) {
      similarItem.quantity += item.quantity;
      set({
        basketItems: get().basketItems.filter(
          basketItem => !arePizzasEqual(basketItem, item)
        ),
      });
    } else {
      item.pizzaSize = updatedItem.pizzaSize;
      item.price = updatedItem.price;
      item.toppings = updatedItem.toppings;
    }

    get().getBasketItems();
  },

  removeBasketItem: (cartItem: BasketItemState) => {
    set({
      basketItems: get().basketItems.filter(
        item => !arePizzasEqual(item, cartItem)
      ),
    });

    if (get().basketItems.length === 0) {
      localStorage.removeItem("userBasket");
    }

    get().getBasketItems();
  },

  addBasketItem: (cartItem: BasketItemState) => {
    const item = get().basketItems.find(item => arePizzasEqual(item, cartItem));

    if (item) {
      get().updateItemQuantity(cartItem, 1);
    } else {
      set({ basketItems: [...get().basketItems, cartItem] });
    }

    get().getBasketItems();
  },
}));

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
  firstPizza: BasketItemState,
  secondPizza: BasketItemState
): boolean => {
  return (
    firstPizza.img === secondPizza.img &&
    firstPizza.name === secondPizza.name &&
    firstPizza.pizzaSize === secondPizza.pizzaSize &&
    firstPizza.price === secondPizza.price &&
    areSetsEqual(firstPizza.toppings, secondPizza.toppings)
  );
};
