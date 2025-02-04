export const ROUTES = {
  ROOT: "/",
  SIGNIN: "/signin",
  PROFILE: "/profile",
  ORDERS: "/orders",
  BASKET: "/basket",
  PAYMENT: "/payment",
  PIZZA: (id: string) => `/${id}`,
  PIZZA_ORDER: (id: string) => `${ROUTES.PIZZA(id)}/order`,
} as const;
