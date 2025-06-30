import { useState, useCallback } from "react";
import { useLoading } from "../contexts/LoadingContext";

export const useLoadingState = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  const withLoading = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T> => {
      setLocalLoading(true);
      startLoading();

      try {
        const result = await asyncFn();
        return result;
      } finally {
        setLocalLoading(false);
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    localLoading,
    withLoading,
    startLoading,
    stopLoading,
  };
};
