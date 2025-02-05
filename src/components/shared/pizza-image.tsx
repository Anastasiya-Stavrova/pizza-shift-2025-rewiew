import { cn } from "@/lib";

interface PizzaImageProps {
  name: string;
  src: string;
  size: 25 | 30 | 35;
  className?: string;
}

export const PizzaImage = ({ name, src, size, className }: PizzaImageProps) => {
  return (
    <div className="w-full max-w-[220px]">
      <div
        className={cn(
          "flex items-center justify-center flex-1 relative " +
            "w-full h-full max-h-[220px]",
          className
        )}
      >
        <img
          src={src}
          alt={name}
          className={cn(
            "relative left-2 top-2 transition-all z-10 duration-300",
            {
              "size-[160px]": size === 25,
              "size-[190px]": size === 30,
              "size-[220px]": size === 35,
            }
          )}
        />

        <div
          className={
            "absolute left-[51%] top-[50.5%] -translate-x-1/2 -translate-y-1/2 " +
            "border-dashed border-2 rounded-full border-gray-200 size-[200px]"
          }
        />
        <div
          className={
            "absolute left-[51%] top-[50.5%] -translate-x-1/2 -translate-y-1/2 " +
            "border-dotted border-2 rounded-full border-gray-100 size-[170px]"
          }
        />
      </div>
    </div>
  );
};
