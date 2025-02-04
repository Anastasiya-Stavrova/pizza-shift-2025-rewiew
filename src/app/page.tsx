import { BasketIcon, Button, Input, NavLink, PizzaIcon } from "@/components";

import { useMedia } from "react-use";

export default function Home() {
  return (
    <div className="w-full mx-auto p-10">
      <NavLink text="Заказы" href={"/orders"}>
        <BasketIcon />
      </NavLink>
    </div>
  );
}
