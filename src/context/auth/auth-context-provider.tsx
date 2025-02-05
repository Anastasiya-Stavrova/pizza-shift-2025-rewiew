"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { getCookie } from "@/utils";
import { AuthContext, AuthContextActions } from "./auth-context";
import { Api } from "@/api";
import { ROUTES } from "@/constants";

export const AuthContextProvider = ({
  defaultUser,
  defaultToken,
  children,
}: {
  defaultUser?: User;
  defaultToken?: string;
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | undefined>(defaultUser);
  const [authToken, setAuthToken] = React.useState<string | undefined>(
    defaultToken
  );

  const router = useRouter();

  const signin = React.useCallback(async (token: string) => {
    setAuthToken(token => token);
    document.cookie = `authToken=${token}`;

    try {
      const getUserSessionResponse = await Api.user.getUserSession({
        config: { validateStatus: status => status < 600 },
      });
      setUser(getUserSessionResponse.data.user);

      router.replace(ROUTES.PROFILE);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = React.useCallback(() => {
    setAuthToken(() => undefined);
    setUser(() => undefined);
    document.cookie = "authToken=";
    router.replace(ROUTES.ROOT);
    router.refresh();
  }, []);

  const updateUser = React.useCallback(() => {
    Api.user
      .getUserSession({ config: { validateStatus: status => status < 600 } })
      .then(data => {
        setUser(data.data.user);
        setAuthToken(getCookie("authToken"));
      });
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      authToken,
    }),
    [user, authToken]
  );

  const actions = React.useMemo(
    () => ({
      setAuthToken,
      setUser,
      updateUser,
      signin,
      logout,
    }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      <AuthContextActions.Provider value={actions}>
        {children}
      </AuthContextActions.Provider>
    </AuthContext.Provider>
  );
};
