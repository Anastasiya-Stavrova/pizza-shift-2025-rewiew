import { cn } from "@/lib";

export type Variant = {
  name: string;
  value: string;
};

interface ToggleGroup {
  items: Variant[];
  value?: Variant["value"];
  className?: string;
  onClick?: (value: Variant["value"]) => void;
}

export const ToggleGroup = ({
  items,
  value,
  className,
  onClick,
}: ToggleGroup) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#F3F4F6] rounded-md p-[2px] select-none max-w-[394px]",
        className
      )}
    >
      {items.map(item => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[40px] px-[10px] py-4 flex-1 " +
              "rounded-sm transition-all duration-400 text-sm",
            {
              "bg-white text-[#141C24] font-normal": item.value === value,
              "text-[#637083] font-normal": item.value !== value,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
