import { Metadata } from "next";

import { Api } from "@/api";

import { Typography } from "@/components";
import { PizzaCard } from "./_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | Главная страница",
};

export default async function Home() {
  const getPizzasCatalogResponse = await Api.pizza.getPizzasCatalog();

  if (!getPizzasCatalogResponse.data.success) {
    console.log(getPizzasCatalogResponse.data.reason);

    return (
      <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
        <Typography
          text="Не удалось загрузить пиццы"
          size="xl"
          className="p-4"
        />
      </div>
    );
  }

  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <Typography text="Пицца" size="xl" className="p-4 sm:hidden" />

      {getPizzasCatalogResponse.data.catalog && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
          {getPizzasCatalogResponse.data.catalog.map(pizza => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      )}
    </div>
  );
}
