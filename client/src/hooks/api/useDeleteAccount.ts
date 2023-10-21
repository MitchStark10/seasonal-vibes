import { useCallback } from "react";
import { DELETE_ACCOUNT_API_URI } from "../../lib/constants";
import { useAPI } from "./useAPI";

export const useDeleteAccount = () => {
  const { makeRequest, loading } = useAPI();

  const deleteAccount = useCallback(
    () => makeRequest(DELETE_ACCOUNT_API_URI, { method: "DELETE" }),
    []
  );

  return { deleteAccount, loading };
};
