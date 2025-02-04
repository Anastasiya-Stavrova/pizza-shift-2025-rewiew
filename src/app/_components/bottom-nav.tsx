import { ROUTES } from "@/constants";

import {
  NavLink,
  UserIcon,
  PizzaIcon,
  SigninIcon,
  TimeIcon,
  BasketIcon,
} from "@/components";

export const BottomNav = () => {
  const isLogged = true;

  return (
    <nav className="flex sm:hidden w-full bg-background items-center justify-between fixed bottom-0 border-t border-[#CED2DA]">
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
        <NavLink text="Войти" href={ROUTES.SIGNIN}>
          <SigninIcon fill="#97A1AF" />
        </NavLink>
      )}
    </nav>
  );
};
