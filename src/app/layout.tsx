import { cn } from "@/lib";
import { inter } from "./fonts/font";

import { Providers, Header, BottomNav } from "./_components";

import "./globals.css";

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
          <Providers>
            <Header />
            {children}
            <BottomNav />
          </Providers>
        </main>
      </body>
    </html>
  );
}
