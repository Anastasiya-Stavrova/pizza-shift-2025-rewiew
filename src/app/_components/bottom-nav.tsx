import { cookies } from "next/headers";

import { ROUTES } from "@/constants";

import {
  NavLink,
  BasketIcon,
  PizzaIcon,
  SigninIcon,
  TimeIcon,
  UserIcon,
} from ".";

export const BottomNav = async () => {
  const isLogged = (await cookies()).get("authToken")?.value ? true : false;

  return (
    <nav
      className={
        "flex sm:hidden w-full bg-background items-center justify-between " +
        "fixed bottom-0 border-t border-[#CED2DA]"
      }
    >
      <NavLink text="Пицца" href={ROUTES.ROOT}>
        <PizzaIcon fill="#97A1AF" />
      </NavLink>

      {isLogged && (
        <>
          <NavLink text="Заказы" href={ROUTES.ORDERS}>
            <TimeIcon fill="#97A1AF" />
          </NavLink>

          <NavLink text="Корзина" href={ROUTES.BASKET}>
            <BasketIcon fill="#97A1AF" />
          </NavLink>

          <NavLink text="Профиль" href={ROUTES.PROFILE}>
            <UserIcon fill="#97A1AF" />
          </NavLink>
        </>
      )}

      {!isLogged && (
        <NavLink text="Войти" href={ROUTES.AUTH}>
          <SigninIcon fill="#97A1AF" />
        </NavLink>
      )}
    </nav>
  );
};
