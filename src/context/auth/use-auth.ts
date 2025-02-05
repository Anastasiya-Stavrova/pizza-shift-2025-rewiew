import React from "react";

import { AuthContext } from "./auth-context";

export const useAuth = () => {
  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    throw new Error("Подключите AuthContextProvider!");
  }

  return authContext;
};
