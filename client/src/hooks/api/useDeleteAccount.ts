import { useCallback } from "react";
import { DELETE_ACCOUNT_API_URI } from "../../lib/constants";
import { useAPI } from "./useAPI";

export const useDeleteAccount = () => {
  const { makeRequest, loading } = useAPI();

  const deleteAccount = useCallback(async () => {
    await makeRequest(DELETE_ACCOUNT_API_URI, {
      method: "DELETE",
      toastSuccessMessage:
        "Account deleted successfully. Please refresh the page.",
      toastErrorMessage:
        "Account could not be deleted. Please try again later.",
    });
    window.location.href = "/";
  }, []);

  return { deleteAccount, loading };
};
