import { Metadata } from "next";

import { PaymentSheet } from "./_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | Оплата",
};

export default async function PaymentPage() {
  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <PaymentSheet />
    </div>
  );
}
