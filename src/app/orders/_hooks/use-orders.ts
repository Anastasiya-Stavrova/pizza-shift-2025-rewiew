import { useShallow } from "zustand/react/shallow";

import { useOrdersStore } from "../_store";

export const useOrders = () => {
  const { currentStage, setCurrentStage } = useOrdersStore(
    useShallow(state => ({
      currentStage: state.currentStage,
      setCurrentStage: state.setCurrentStage,
    }))
  );

  return {
    currentStage,
    setCurrentStage,
  };
};
