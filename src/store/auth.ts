import { create } from "zustand";

import { Api } from "@/api";
import { getCookie } from "@/utils";

interface AuthState {
  user: User | null;
  authToken: string | null;

  updateUser: () => void;
  signin: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  authToken: null,

  updateUser: async () => {
    try {
      const getUserSessionResponse = await Api.user.getUserSession({
        config: { validateStatus: status => status < 600 },
      });
      set({
        user: getUserSessionResponse.data.user,
        authToken: getCookie("authToken"),
      });
    } catch (error) {
      console.log(error);
    }
  },

  signin: async (token: string) => {
    set({ authToken: token });
    document.cookie = `authToken=${token}`;

    try {
      const getUserSessionResponse = await Api.user.getUserSession({
        config: { validateStatus: status => status < 600 },
      });
      set({ user: getUserSessionResponse.data.user });
    } catch (error) {
      console.log(error);
    }
  },

  logout: () => {
    set({ authToken: null, user: null });
    document.cookie = "authToken=";
  },
}));
