export const ROUTES = {
  ROOT: "/",
  AUTH: "/auth",
  PROFILE: "/profile",
  ORDERS: "/orders",
  BASKET: "/basket",
  PAYMENT: "/payment",
  PIZZA: (id: string) => `/${id}`,
  PIZZA_ORDER: (id: string) => `${ROUTES.PIZZA(id)}/order`,
} as const;
