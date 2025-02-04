import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 py-2 px-3 w-full rounded-[8px] border border-input hover:border-[#97A1AF] focus:border-ring focus:border-2 bg-white text-base font-normal transition-colors placeholder:text-input-placeholder focus-visible:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
