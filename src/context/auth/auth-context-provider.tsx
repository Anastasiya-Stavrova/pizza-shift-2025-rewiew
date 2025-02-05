"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { ROUTES } from "@/constants";
import { Api } from "@/api";
import { getCookie } from "@/utils";
import { AuthContext } from "./auth-context";

export const AuthContextProvider = ({
  defaultUser,
  defaultToken,
  children,
}: {
  defaultUser?: User;
  defaultToken?: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | undefined>(defaultUser);
  const [token, setToken] = React.useState<string | undefined>(defaultToken);

  const logout = () => {
    setToken(undefined);
    setUser(undefined);
    document.cookie = "authToken=";
    router.replace(ROUTES.ROOT);
    router.refresh();
  };

  const login = (token: string) => {
    setToken(token);
    document.cookie = `authToken=${token}`;
    Api.user
      .getUserSession({ config: { validateStatus: status => status < 600 } })
      .then(data => {
        console.log(token, data);
        setUser(data.data.user);
        router.replace(ROUTES.ROOT);
        router.refresh();
      });
  };

  const update = () => {
    Api.user
      .getUserSession({ config: { validateStatus: status => status < 600 } })
      .then(data => {
        setUser(data.data.user);
        setToken(getCookie("authToken"));
      });
  };

  React.useEffect(() => {
    const localToken = getCookie("authToken");

    if (localToken != token) {
      Api.user
        .getUserSession({ config: { validateStatus: status => status < 600 } })
        .then(data => {
          console.log(localToken, data);
          setUser(data.data.user);
        });

      setToken(localToken);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, logout, login, update }}
    >
      {children}
    </AuthContext.Provider>
  );
};
