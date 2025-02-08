import { Metadata } from "next";

import { BasketSheet } from "./_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | Корзина",
};

export default async function BasketPage() {
  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <BasketSheet />
    </div>
  );
}
