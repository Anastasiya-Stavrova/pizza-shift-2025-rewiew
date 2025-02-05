import React from "react";

import { AuthContextActions } from "./auth-context";

export const useAuthActions = () => {
  const authContextActions = React.useContext(AuthContextActions);

  if (!AuthContextActions) {
    throw new Error("Подключите AuthContextActionsProvider!");
  }

  return authContextActions;
};
