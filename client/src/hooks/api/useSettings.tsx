import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SPOTIFY_REFRESH_TOKEN_HEADER_KEY } from "../../lib/constants";
import { getCookieValue } from "../../lib/getCookieValue";

const SETTINGS_API_URI = process.env.SETTINGS_API_URI || "/settings";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-refresh-token": getCookieValue(SPOTIFY_REFRESH_TOKEN_HEADER_KEY),
});

interface Settings {
  isSubscribed: boolean;
  nextPlaylistCreationDate: string;
}

// There's currently no need for state management, since the settings
// are only used in the Settings page. If the settings were used in other
// pages, then this will be updated to use a state management library.
export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  const getSettings = useCallback(async () => {
    try {
      const geSettingsApiResponse = await fetch(SETTINGS_API_URI, {
        headers: getHeaders(),
      });
      const settings = await geSettingsApiResponse.json();
      setSettings(settings);
      toast("Settings fetched");
    } catch (error) {
      console.error(error);
      toast("Unable to retrieve user settings. Please try again later.");
    }
  }, []);

  const saveSettings = useCallback(async (settings: Settings) => {
    try {
      const saveSettingsApiResponse = await fetch(SETTINGS_API_URI, {
        method: "POST",
        body: JSON.stringify(settings),
        headers: getHeaders(),
      });

      if (saveSettingsApiResponse.ok) {
        toast("User settings saved successfully.");
        setSettings(settings);
      } else {
        toast("Unable to save user settings. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast("Unable to save user settings. Please try again later.");
    }
  }, []);

  useEffect(() => {
    if (!settings) {
      getSettings();
    }
  }, []);

  return {
    settings,
    getSettings,
    saveSettings,
  };
};
