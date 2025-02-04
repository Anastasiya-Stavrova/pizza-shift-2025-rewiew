export const getMinPizzaPrice = (sizes: PizzaSize[]): number => {
  const minProductPrice: number = sizes.reduce((prev, current) => {
    return prev.price < current.price ? prev : current;
  }, sizes[0]).price;

  return minProductPrice;
};
