import type { Metadata } from "next";

import { cn } from "@/lib";
import { inter } from "./fonts/font";

import { Providers } from "./_components";

import "./globals.css";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link data-rh="true" rel="icon" href="/logo.svg" />
      </head>
      <body className={cn("h-full w-full", inter.className)}>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
