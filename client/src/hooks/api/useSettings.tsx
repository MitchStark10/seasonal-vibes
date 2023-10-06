import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SETTINGS_API_URI } from "../../lib/constants";
import { getHeaders } from "../../lib/getHeaders";

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

  const getSettings = useCallback(async () => {
    setLoading(true);
    try {
      const getSettingsApiResponse = await fetch(SETTINGS_API_URI, {
        headers: getHeaders(),
      });

      const settings = await getSettingsApiResponse.json();
      if (!getSettingsApiResponse.ok) {
        window.location.href = "/";
      }
      setSettings(settings);
    } catch (error) {
      console.error(error);
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
