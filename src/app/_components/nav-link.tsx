"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib";

import { Typography } from "@/components";

interface NavLinkProps {
  children: React.ReactNode;
  text: string;
  href: string;
}

export const NavLink = ({ children, text, href }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={
          "h-[59px] sm:h-fit w-[90px] sm:w-fit flex flex-col sm:flex-row " +
          "items-center justify-center gap-[2px] sm:gap-4"
        }
      >
        {isActive
          ? React.cloneElement(children as React.ReactElement<any>, {
              className: "active-icon",
            })
          : children}
        <Typography
          text={text}
          className={cn(
            "text-[10px] text-[#637083] sm:text-base sm:text-[#141C24] sm:font-medium",
            { "text-[#F4511E] sm:text-[#F4511E]": isActive }
          )}
        />
      </div>
    </Link>
  );
};
