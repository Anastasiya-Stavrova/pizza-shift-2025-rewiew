import { Metadata } from "next";

import { Typography } from "@/components";
import { ProfileForm } from "./_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | Профиль",
};

export default async function ProfilePage() {
  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <div className="w-full flex flex-col gap-6 px-4 sm:px-0">
        <Typography text="Профиль" size="xl" />
        <ProfileForm />
      </div>
    </div>
  );
}
