import { useCallback } from "react";
import { CREATE_PLAYLIST_API_URI } from "../../lib/constants";
import { getHeaders } from "../../lib/getHeaders";
import { useAPI } from "./useAPI";

interface PlaylistSettings {
  playlistName: string;
}

export const useCreatePlaylist = () => {
  const { makeRequest, loading } = useAPI();
  const createPlaylist = useCallback(
    async (playlistSettings: PlaylistSettings) => {
      const response = { success: false };
      const playlistCreationResponse = await makeRequest(
        CREATE_PLAYLIST_API_URI,
        {
          method: "POST",
          body: JSON.stringify(playlistSettings),
          headers: getHeaders(),
        }
      );

      if (playlistCreationResponse.ok) {
        response.success = true;
      }

      return response;
    },
    []
  );

  return { createPlaylist, loading };
};
