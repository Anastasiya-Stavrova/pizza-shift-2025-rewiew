import React from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import { QueryProvider } from "@/context";

export const Providers = async ({ children }: React.PropsWithChildren) => {
  return (
    <QueryProvider>
      {children}
      <Toaster />
      <NextTopLoader />
    </QueryProvider>
  );
};
