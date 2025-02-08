import React from "react";

interface UseSigninParams {
  retryDelay: number;
  setRetryDelay: (retryDelay: number) => void;
}

export const useTimer = (): UseSigninParams => {
  const [retryDelay, setRetryDelay] = React.useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (retryDelay > 0) {
      timer = setInterval(() => {
        setRetryDelay(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [retryDelay]);

  return {
    retryDelay,
    setRetryDelay,
  };
};
