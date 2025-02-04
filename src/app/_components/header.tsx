import Link from "next/link";

import { cn } from "@/lib";
import { ROUTES } from "@/constants";

import {
  BasketIcon,
  LogoIcon,
  NavLink,
  SigninIcon,
  TimeIcon,
  UserIcon,
} from "@/components";

export const Header = () => {
  const isLogged = true;

  return (
    <header className="sticky top-0 w-full h-fit bg-background border-b border-[#CED2DA] py-6 hidden sm:block">
      <div className="w-full max-w-[960px] px-0 sm:px-8 lg:px-0 flex flex-row gap-8 items-center mx-auto">
        <Link href="/">
          <LogoIcon />
        </Link>

        <nav
          className={cn("w-full flex gap-8 items-center justify-between", {
            "justify-end": !isLogged,
          })}
        >
          {isLogged ? (
            <>
              <div className="flex gap-8 items-center justify-start">
                <NavLink text="Профиль" href={ROUTES.PROFILE}>
                  <UserIcon />
                </NavLink>

                <NavLink text="Заказы" href={ROUTES.ORDERS}>
                  <TimeIcon />
                </NavLink>
              </div>

              <NavLink text="Корзина" href={ROUTES.BASKET}>
                <BasketIcon />
              </NavLink>
            </>
          ) : (
            <NavLink text="Войти" href={ROUTES.SIGNIN}>
              <SigninIcon />
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};
