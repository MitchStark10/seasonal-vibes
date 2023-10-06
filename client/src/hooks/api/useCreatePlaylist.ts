import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CREATE_PLAYLIST_API_URI } from "../../lib/constants";
import { getHeaders } from "../../lib/getHeaders";

interface PlaylistSettings {
  playlistName: string;
}

export const useCreatePlaylist = () => {
  const [loading, setLoading] = useState(false);
  const createPlaylist = useCallback(
    async (playlistSettings: PlaylistSettings) => {
      setLoading(true);
      try {
        const playlistCreationResponse = await fetch(CREATE_PLAYLIST_API_URI, {
          method: "POST",
          body: JSON.stringify(playlistSettings),
          headers: getHeaders(),
        });

        const method = playlistCreationResponse.ok ? "success" : "error";
        toast[method]("Playlist created");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createPlaylist, loading };
};
