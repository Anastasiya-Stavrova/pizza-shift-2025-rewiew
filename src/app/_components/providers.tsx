import React from "react";

import { AuthContextProvider, QueryProvider } from "@/context";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import { Api } from "@/api";
import { BasketContextProvider } from "@/context/basket";

export const Providers = async ({ children }: React.PropsWithChildren) => {
  const getUserSessionResponce = await Api.user.getUserSession({
    config: { validateStatus: status => status < 600 },
  });

  return (
    <QueryProvider>
      <AuthContextProvider defaultUser={getUserSessionResponce.data.user}>
        <BasketContextProvider>{children}</BasketContextProvider>
        <Toaster />
        <NextTopLoader />
      </AuthContextProvider>
    </QueryProvider>
  );
};
