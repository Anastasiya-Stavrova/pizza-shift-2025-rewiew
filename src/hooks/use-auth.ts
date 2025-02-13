import React from "react";
import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/store";

export const useAuth = () => {
  const authState = useAuthStore(useShallow((state) => state));

  React.useEffect(() => {
    authState.updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authState;
};
