"use client";

import toast from "react-hot-toast";

import { cn } from "@/lib";
import { BasketItemState, useAuth, useBasketActions } from "@/context";
import { usePizzaOptions } from "@/hooks";
import { capitalizeFirstLetter, getPizzaIngredientsDetails } from "@/helpers";
import {
  API_URL,
  mapPizzaSizeToNumber,
  pizzaSizeNames,
  mapPizzaIngredientsToName,
} from "@/constants";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IngredientItem,
  PizzaImage,
  PizzaInfoPopover,
  ToggleGroup,
  Typography,
} from "..";

interface PizzaModalProps {
  pizza: Pizza;
  item?: BasketItemState;
  isOpen: boolean;
  className?: string;
  onClickOpenChange: () => void;
}

export const PizzaModal = ({
  pizza,
  item,
  isOpen,
  className,
  onClickOpenChange,
}: PizzaModalProps) => {
  const { authToken } = useAuth();
  const { addBasketItem, updateSelectedItem } = useBasketActions();
  const { states, functions } = usePizzaOptions(pizza, item);

  const handleClickAdd = () => {
    if (!authToken) {
      toast.error("Авторизируйтесь, чтобы добавить товар в корзину", {
        icon: "🛒",
      });
      onClickOpenChange();
      return;
    }

    if (item) {
      updateSelectedItem(
        item,
        states.size,
        states.selectedToppings,
        states.totalPrice
      );

      toast.success("Пицца успешно изменена!", {
        icon: "✅",
      });
    } else {
      const cartItem: BasketItemState = {
        name: pizza.name,
        img: pizza.img,
        pizzaSize: mapPizzaSizeToNumber[states.size],
        quantity: 1,
        price: states.totalPrice,
        toppings: states.selectedToppings,
      };

      addBasketItem(cartItem);
      functions.resetSelectedOptions();

      toast.success("Пицца успешно добавлена!", {
        icon: "✅",
      });
    }

    onClickOpenChange();
  };

  const handleChange = () => {
    if (item) {
      states.selectedToppings.forEach(topping =>
        functions.addToppings(topping)
      );
      Array.from(item.toppings).forEach(topping =>
        functions.addToppings(topping)
      );
      functions.setSize(
        mapPizzaNumberToSize[
          item.pizzaSize as keyof typeof mapPizzaNumberToSize
        ]
      );
    } else {
      functions.setSize("SMALL");
      states.selectedToppings.clear();
    }

    onClickOpenChange();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        handleChange();
      }}
    >
      <DialogTitle className="hidden" />
      <DialogContent
        className={cn(
          "w-full h-full max-w-[806px] max-h-[644px] p-0 pt-10",
          className
        )}
      >
        <div className="w-full h-full flex items-ctart justify-between py-6 px-16">
          <PizzaImage
            name={pizza.name}
            src={API_URL + pizza.img}
            size={mapPizzaSizeToNumber[states.size]}
          />

          <div className="flex flex-col justify-between gap-6 h-full w-full max-w-[426px]">
            <div className="flex flex-col gap-6 w-full px-4">
              <div className="flex flex-col gap-2">
                <div className="w-full flex gap-3 items-center justify-between">
                  <Typography
                    text={pizza.name}
                    size="xl"
                    className="text-[#292929]"
                  />

                  <PizzaInfoPopover
                    calories={pizza.calories}
                    protein={pizza.protein}
                    totalFat={pizza.totalFat}
                    carbohydrates={pizza.carbohydrates}
                  />
                </div>

                <Typography
                  text={`${
                    mapPizzaSizeToNumber[states.size]
                  } см, традиционное тесто`}
                  className="text-[#535353]"
                />

                <Typography
                  text={getPizzaIngredientsDetails(pizza.ingredients)}
                  size="md"
                  className="text-[#535353]"
                />
              </div>

              <ToggleGroup
                className="w-full"
                items={pizzaSizeNames}
                value={String(states.size)}
                onClick={value => functions.setSize(value as PizzaSizeName)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typography
                text=" Добавить по вкусу"
                size="md"
                className="font-medium px-4"
              />

              <div className="max-h-[236px] overflow-y-auto scrollbar p-4">
                <div className="grid grid-cols-3 gap-[11px]">
                  {pizza.toppings.map(topping => (
                    <IngredientItem
                      key={topping.name}
                      name={capitalizeFirstLetter(
                        mapPizzaIngredientsToName[topping.name]
                      )}
                      imageUrl={API_URL + topping.img}
                      price={topping.cost}
                      active={states.selectedToppings.has(topping.name)}
                      onClick={() => functions.addToppings(topping.name)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={() => handleClickAdd()}>
              {item
                ? `Изменить выбранный товар за ${states.totalPrice} ₽`
                : `Добавить в корзину за ${states.totalPrice} ₽`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
