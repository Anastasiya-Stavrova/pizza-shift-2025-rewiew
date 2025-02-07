import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib";

import { Button } from "@/components";

interface CountIconButtonProps {
  type: "plus" | "minus";
  disabled?: boolean;
  onClick: () => void;
}

export const CountIconButton = ({
  type,
  disabled,
  onClick,
}: CountIconButtonProps) => {
  return (
    <Button
      className={cn(
        "p-0 w-fit h-fit bg-transparent text-[#141C24] hover:bg-transparent active:bg-transparent " +
          "hover:text-primary active:text-[#E64A19] disabled:text-[#637083]"
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {type === "plus" ? <Plus className="w-2" /> : <Minus className="w-2" />}
    </Button>
  );
};
