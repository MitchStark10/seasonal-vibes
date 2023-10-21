import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getHeaders } from "../../lib/getHeaders";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const makeRequest = useCallback(
    async (
      url: string,
      options?: Record<string, any>
    ): ReturnType<typeof fetch> => {
      const requestOptions = options || {};
      if (!requestOptions.headers) {
        requestOptions.headers = getHeaders();
      }

      setLoading(true);
      const responsePromise = fetch(url, requestOptions);
      responsePromise
        .then((apiResponse) => {
          const method = apiResponse.ok ? "success" : "error";
          const message = apiResponse.ok
            ? requestOptions.toastSuccessMessage
            : requestOptions.toastErrorMessage;

          if (message) {
            toast[method](message);
          }
        })
        .catch((error) => {
          console.error(error);

          if (requestOptions.toastErrorMessage) {
            toast.error(requestOptions.toastErrorMessage);
          }
        })
        .finally(() => setLoading(false));

      return responsePromise;
    },
    []
  );

  return { makeRequest, loading };
};
