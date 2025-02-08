import { create } from "zustand";

export interface UserDataState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

export type CurrentPaymentStage =
  | "SET_USER_DATA_STAGE"
  | "SET_USER_CART_STAGE"
  | "USER_PAYMENT_INFO_STAGE";

interface PaymentState {
  userData: UserDataState | null;
  currentStage: CurrentPaymentStage;

  setUserData: (userData: UserDataState) => void;
  setCurrentStage: (stage: CurrentPaymentStage) => void;
  resetStage: () => void;
}

export const usePaymentStore = create<PaymentState>(set => ({
  userData: null,
  currentStage: "SET_USER_DATA_STAGE",

  setUserData: (userData: UserDataState) => set({ userData }),

  setCurrentStage: (newCurrentStage: CurrentPaymentStage) =>
    set({ currentStage: newCurrentStage }),

  resetStage: () =>
    set({ userData: null, currentStage: "SET_USER_DATA_STAGE" }),
}));
