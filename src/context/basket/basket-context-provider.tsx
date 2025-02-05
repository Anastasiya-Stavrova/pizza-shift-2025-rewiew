"use client";

import React from "react";

import {
  BasketContext,
  BasketContextActions,
  BasketItemState,
} from "./basket-context";

export const BasketContextProvider = ({
  defaultTotalAmount,
  defaultBasketItems,
  defaultLoading,
  children,
}: {
  defaultTotalAmount?: number;
  defaultBasketItems?: BasketItemState[];
  defaultLoading?: boolean;
  children: React.ReactNode;
}) => {
  const [totalAmount, setTotalAmount] = React.useState<number | undefined>(
    defaultTotalAmount
  );
  const [basketItems, setBasketItems] = React.useState<
    BasketItemState[] | undefined
  >(defaultBasketItems);
  const [loading, setLoading] = React.useState<boolean | undefined>(
    defaultLoading
  );

  const getBasketItems = React.useCallback(() => {
    setLoading(loading => !loading);

    const userBasket = localStorage.getItem("userBasket");

    if (userBasket && basketItems?.length === 0) {
      const items = JSON.parse(userBasket).map((item: any) => {
        return {
          ...item,
          toppings: new Set(item.toppings),
        };
      });
      setBasketItems(() => [...items]);
    } else if (basketItems && basketItems?.length > 0) {
      const items = basketItems.map(item => {
        return {
          ...item,
          toppings: Array.from(item.toppings),
        };
      });
      localStorage.setItem("userBasket", JSON.stringify(items));
    }

    const totalAmount = basketItems?.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
      0
    );

    setLoading(loading => !loading);
    setTotalAmount(() => totalAmount);
  }, []);

  const updateItemQuantity = React.useCallback(
    (cartItem: BasketItemState, quantity: number) => {
      setLoading(loading => !loading);

      const item = basketItems?.find(item => arePizzasEqual(item, cartItem));

      if (item) {
        item.quantity += quantity;
      }

      getBasketItems();
    },
    []
  );

  const updateSelectedItem = React.useCallback(
    (
      pizza: BasketItemState,
      pizzaSize: PizzaSizeName,
      pizzaToppings: Set<PizzaIngredientName>,
      pizzaPrice: number
    ) => {
      setLoading(loading => !loading);

      const item = basketItems?.find(item => arePizzasEqual(item, pizza))!;

      const updatedItem = {
        ...item,
        pizzaSize: mapPizzaSizeToNumber[pizzaSize],
        toppings: pizzaToppings,
        price: pizzaPrice,
      };

      const similarItem = basketItems?.find(item =>
        arePizzasEqual(item, updatedItem)
      );

      if (similarItem) {
        similarItem.quantity += item.quantity;
        setBasketItems(items =>
          items?.filter(basketItem => !arePizzasEqual(basketItem, item))
        );
      } else {
        item.pizzaSize = updatedItem.pizzaSize;
        item.price = updatedItem.price;
        item.toppings = updatedItem.toppings;
      }

      getBasketItems();
    },
    []
  );

  const removeBasketItem = React.useCallback((basketItem: BasketItemState) => {
    setLoading(loading => !loading);
    setBasketItems(items =>
      items?.filter(item => !arePizzasEqual(item, basketItem))
    );

    if (basketItems?.length === 0) {
      localStorage.removeItem("userBasket");
    }

    getBasketItems();
  }, []);

  const addBasketItem = React.useCallback((cartItem: BasketItemState) => {
    setLoading(loading => !loading);

    const item = basketItems?.find(item => arePizzasEqual(item, cartItem));

    if (item) {
      updateItemQuantity(cartItem, 1);
    } else {
      setBasketItems(items => [...(items ?? []), cartItem]);
    }

    getBasketItems();
  }, []);

  const value = React.useMemo(
    () => ({
      totalAmount,
      basketItems,
      loading,
    }),
    [totalAmount, basketItems, loading]
  );

  const actions = React.useMemo(
    () => ({
      getBasketItems,
      updateItemQuantity,
      updateSelectedItem,
      addBasketItem,
      removeBasketItem,
    }),
    []
  );

  return (
    <BasketContext.Provider value={value}>
      <BasketContextActions.Provider value={actions}>
        {children}
      </BasketContextActions.Provider>
    </BasketContext.Provider>
  );
};

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
