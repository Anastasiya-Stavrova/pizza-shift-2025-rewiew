import { mapPizzaIngredientsToName } from "@/constants";

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPizzaIngredientsDetails = (
  ingredients: PizzaIngredient[],
  isCapitalize: boolean = true
): string => {
  const details = ingredients
    .map(ingredient => mapPizzaIngredientsToName[ingredient.name])
    .join(", ");

  return isCapitalize ? capitalizeFirstLetter(details) : details;
};
