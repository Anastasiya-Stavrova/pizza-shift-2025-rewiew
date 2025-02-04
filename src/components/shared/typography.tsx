import React from "react";

import { cn } from "@/lib";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface TypographyProps {
  size?: TitleSize;
  text: string;
  className?: string;
}

export const Typography = ({
  text,
  size = "sm",
  className,
}: TypographyProps) => {
  const mapClassNameByTag = {
    xs: "p",
    sm: "p",
    md: "p",
    lg: "h3",
    xl: "h2",
    "2xl": "h1",
  } as const;

  const mapClassNameByStyle = {
    xs: "text-xs text-[#637083] font-normal",
    sm: "text-sm text-foreground font-normal",
    md: "text-base text-foreground font-normal",
    lg: "text-xl text-foreground font-semibold",
    xl: "text-2xl text-foreground font-bold",
    "2xl": "",
  } as const;

  return React.createElement(
    mapClassNameByTag[size],
    { className: cn(mapClassNameByStyle[size], className) },
    text
  );
};
