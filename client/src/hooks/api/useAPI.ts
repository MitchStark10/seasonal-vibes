import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const makeRequest = useCallback(
    async (url: string, options: Record<string, any>) => {
      const response = { success: false };
      setLoading(true);
      try {
        const apiResponse = await fetch(url, options);

        const method = apiResponse.ok ? "success" : "error";
        const message = apiResponse.ok
          ? options.toastSuccessMessage
          : options.toastErrorMessage;
        toast[method](message);
        response.success = true;
      } finally {
        setLoading(false);
      }

      return response;
    },
    []
  );

  return { makeRequest, loading };
};
