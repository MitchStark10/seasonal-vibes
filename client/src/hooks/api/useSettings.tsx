import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SPOTIFY_REFRESH_TOKEN_HEADER_KEY } from "../../lib/constants";
import { getCookieValue } from "../../lib/getCookieValue";

const SETTINGS_API_URI = process.env.REACT_APP_SETTINGS_API_URI || "/settings";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-spotify-refresh-token": getCookieValue(SPOTIFY_REFRESH_TOKEN_HEADER_KEY),
});

export interface Settings {
  isSubscribed: boolean;
  nextPlaylistCreationDate: string;
}

// There's currently no need for state management, since the settings
// are only used in the Settings page. If the settings were used in other
// pages, then this will be updated to use a state management library.
export const useSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const navigate = useNavigate();

  const getSettings = useCallback(async () => {
    setLoading(true);
    try {
      const geSettingsApiResponse = await fetch(SETTINGS_API_URI, {
        headers: getHeaders(),
      });

      const settings = await geSettingsApiResponse.json();
      if (!geSettingsApiResponse.ok) {
        toast.error(
          "Unable to retrieve user settings. Please try again later."
        );
        navigate("/");
      }
      setSettings(settings);
    } catch (error) {
      console.error(error);
      toast.error("Unable to retrieve user settings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSettings = useCallback(async (settings: Settings) => {
    const prevSettings = { ...settings };
    setSettings(null);
    setLoading(true);
    try {
      const saveSettingsApiResponse = await fetch(SETTINGS_API_URI, {
        method: "POST",
        body: JSON.stringify(settings),
        headers: getHeaders(),
      });

      if (saveSettingsApiResponse.ok) {
        toast.success("User settings saved successfully.");
        setSettings(settings);
      } else {
        toast("Unable to save user settings. Please try again later.");
        setSettings(prevSettings);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to save user settings. Please try again later.");
      setSettings(prevSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!settings && !loading) {
      getSettings();
    }
  }, []);

  return {
    settings,
    getSettings,
    saveSettings,
  };
};
