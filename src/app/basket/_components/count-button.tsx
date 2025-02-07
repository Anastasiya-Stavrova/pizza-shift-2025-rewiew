import { cn } from "@/lib";

import { CountIconButton } from ".";

export interface CountButtonProps {
  value: number;
  className?: string;
  onClick: (type: "plus" | "minus") => void;
}

export const CountButton = ({
  value,
  className,
  onClick,
}: CountButtonProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-4 py-[10px] px-2 rounded-sm " +
          "bg-[#F3F4F6] max-h-9 max-w-[100px]",
        className
      )}
    >
      <CountIconButton
        onClick={() => onClick("minus")}
        disabled={value === 1}
        type="minus"
      />

      <p>{value}</p>

      <CountIconButton onClick={() => onClick("plus")} type="plus" />
    </div>
  );
};
