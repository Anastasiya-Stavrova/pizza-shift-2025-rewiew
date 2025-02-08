import { Metadata } from "next";

import { Typography } from "@/components";
import { AuthForm } from "./_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | Авторизация",
};

export default async function AuthPage() {
  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <div className="w-full flex flex-col gap-6 px-4 sm:px-0">
        <Typography text="Авторизация" size="xl" />
        <AuthForm />
      </div>
    </div>
  );
}
