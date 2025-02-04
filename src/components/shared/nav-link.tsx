import React from "react";
import Link from "next/link";

import { Typography } from "./typography";

interface NavLinkProps {
  children: React.ReactNode;
  text: string;
  href: string;
}

export const NavLink = ({ children, text, href }: NavLinkProps) => {
  return (
    <Link href={href}>
      <div className="h-[59px] sm:h-fit w-[90px] sm:w-fit flex flex-col sm:flex-row items-center justify-center gap-[2px] sm:gap-4">
        {children}
        <Typography
          text={text}
          className="text-[10px] text-[#637083] sm:text-base sm:text-[#141C24] sm:font-medium"
        />
      </div>
    </Link>
  );
};
