import React from "react";

import { AuthContextProvider, QueryProvider } from "@/context";
import { Api } from "@/api";

export const Providers = async ({ children }: React.PropsWithChildren) => {
  const getUserSessionResponce = await Api.user.getUserSession({
    config: { validateStatus: status => status < 600 },
  });

  return (
    <QueryProvider>
      <AuthContextProvider defaultUser={getUserSessionResponce.data.user}>
        {children}
      </AuthContextProvider>
    </QueryProvider>
  );
};
