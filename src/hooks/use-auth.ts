import React from "react";
import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/store";

export const useAuth = () => {
  const { authToken, user, updateUser, signin, logout } = useAuthStore(
    useShallow(state => ({
      authToken: state.authToken,
      user: state.user,
      updateUser: state.updateUser,
      signin: state.signin,
      logout: state.logout,
    }))
  );

  React.useEffect(() => {
    updateUser();
  }, []);

  return {
    authToken,
    user,
    updateUser,
    signin,
    logout,
  };
};
