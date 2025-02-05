import { cookies } from "next/headers";
import Link from "next/link";

import { cn } from "@/lib";
import { ROUTES } from "@/constants";

import {
  NavLink,
  BasketIcon,
  LogoIcon,
  SigninIcon,
  TimeIcon,
  UserIcon,
} from ".";

export const Header = async () => {
  const isLogged = (await cookies()).get("authToken")?.value ? true : false;

  return (
    <header className="sticky top-0 z-50 w-full h-fit bg-background border-b border-[#CED2DA] py-6 hidden sm:block">
      <div className="custom-container gap-8 flex-row items-center">
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
