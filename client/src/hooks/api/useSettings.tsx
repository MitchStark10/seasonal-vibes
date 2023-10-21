import { useCallback, useEffect, useState } from "react";
import { SETTINGS_API_URI } from "../../lib/constants";
import { useAPI } from "./useAPI";

export interface Settings {
  isSubscribed: boolean;
  nextPlaylistCreationDate: string;
}

// There's currently no need for state management, since the settings
// are only used in the Settings page. If the settings were used in other
// pages, then this will be updated to use a state management library.
export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  const { makeRequest, loading } = useAPI();

  const getSettings = useCallback(async () => {
    const getSettingsApiResponse = await makeRequest(SETTINGS_API_URI);

    const settingsFromApi = await getSettingsApiResponse.json();
    if (!getSettingsApiResponse.ok) {
      window.location.href = "/";
    }
    setSettings(settingsFromApi);
  }, []);

  const saveSettings = useCallback(async (settings: Settings) => {
    const saveSettingsApiResponse = await makeRequest(SETTINGS_API_URI, {
      method: "POST",
      body: JSON.stringify(settings),
      toastSuccessMessage: "User settings saved successfully.",
      toastErrorMessage:
        "Unable to save user settings. Please try again later.",
    });

    if (saveSettingsApiResponse.ok) {
      setSettings(settings);
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
