import { Api } from "@/api";
import { PizzaCard } from "./_components";

export default async function Home() {
  const getPizzasCatalogResponse = await Api.pizza.getPizzasCatalog();
  console.log(getPizzasCatalogResponse.data);

  return (
    <div className="w-full mx-auto">
      <PizzaCard pizza={getPizzasCatalogResponse.data.catalog[0]} />
    </div>
  );
}
