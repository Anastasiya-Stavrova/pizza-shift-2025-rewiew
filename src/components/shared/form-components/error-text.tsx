import { cn } from "@/lib";

import { Typography } from "../typography";

interface ErrorTextProps {
  text: string;
  className?: string;
}

export const ErrorText = ({ text, className }: ErrorTextProps) => {
  return (
    <Typography text={text} className={cn("text-error-color", className)} />
  );
};
