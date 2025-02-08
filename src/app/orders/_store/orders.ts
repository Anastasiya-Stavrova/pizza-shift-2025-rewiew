import { create } from "zustand";

import { OrderTypeName } from "../_constants";

interface OrdersState {
  currentStage: OrderTypeName;

  setCurrentStage: (stage: OrderTypeName) => void;
}

export const useOrdersStore = create<OrdersState>(set => ({
  currentStage: "ACTIVE",

  setCurrentStage: stage => set({ currentStage: stage }),
}));
