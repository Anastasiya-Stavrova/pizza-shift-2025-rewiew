import { useShallow } from "zustand/react/shallow";

import { usePaymentStore } from "../_store";

export const usePayment = () => {
  const { userData, currentStage, setUserData, setCurrentStage, resetStage } =
    usePaymentStore(
      useShallow(state => ({
        userData: state.userData,
        currentStage: state.currentStage,
        setUserData: state.setUserData,
        setCurrentStage: state.setCurrentStage,
        resetStage: state.resetStage,
      }))
    );

  return {
    userData,
    currentStage,
    setUserData,
    setCurrentStage,
    resetStage,
  };
};
