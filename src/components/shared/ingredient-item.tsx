import Image from "next/image";
import { CircleCheck } from "lucide-react";

import { cn } from "@/lib";

import { Typography } from "./typography";

interface IngredientItemProps {
  name: string;
  imageUrl: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const IngredientItem = ({
  name,
  imageUrl,
  price,
  active,
  onClick,
}: IngredientItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-3 p-2 rounded-md text-center relative " +
          "cursor-pointer item-shadow bg-white mx-auto w-full h-full max-w-[170px] lg:max-w-[124px] min-h-[192px]",
        { "border border-primary": active }
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}

      <Image src={imageUrl} alt={name} width={108} height={108} />

      <div className="h-full flex flex-col items-center justify-between gap-1">
        <Typography text={name} size="xs" className="text-[#292929]" />
        <Typography
          text={`${price} ₽`}
          size="sm"
          className="text-[#292929] font-medium"
        />
      </div>
    </div>
  );
};
