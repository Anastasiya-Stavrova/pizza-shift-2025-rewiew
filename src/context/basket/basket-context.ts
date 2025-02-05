"use client";

import React from "react";

export interface BasketItemState {
  name: string;
  img: string;
  pizzaSize: number;
  quantity: number;
  price: number;
  toppings: Set<PizzaIngredientName>;
}

interface BasketContext {
  totalAmount: number | undefined;
  basketItems: BasketItemState[] | undefined;
  loading: boolean | undefined;
}

interface BasketContextActions {
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

export const BasketContext = React.createContext<BasketContext>({
  totalAmount: 0,
  basketItems: [],
  loading: false,
});

export const BasketContextActions = React.createContext<BasketContextActions>({
  getBasketItems: () => {},
  updateItemQuantity: () => {},
  updateSelectedItem: () => {},
  addBasketItem: () => {},
  removeBasketItem: () => {},
});
