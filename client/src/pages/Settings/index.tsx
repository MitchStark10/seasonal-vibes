import { CircularProgress, styled } from "@mui/material";
import { useSettings } from "../../hooks/api/useSettings";
import { SettingsContent } from "./SettingsContent";

const SettingsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

interface SubscriptionChangePayload {
  key: "isSubscribed";
  value: boolean;
}

interface QuantityOfSongsPerPlaylistChangePayload {
  key: "quantityOfSongsPerPlaylist";
  value: number;
}

export type ChangePayload =
  | SubscriptionChangePayload
  | QuantityOfSongsPerPlaylistChangePayload;

export const Settings = () => {
  const { settings, saveSettings } = useSettings();

  const handleSettingsChange = (changePayload: ChangePayload) => {
    if (settings) {
      saveSettings({ ...settings, [changePayload.key]: changePayload.value });
    }
  };

  return (
    <SettingsContainer>
      <h1>Account</h1>
      {settings ? (
        <SettingsContent
          settings={settings}
          handleSettingsChange={handleSettingsChange}
        />
      ) : (
        <CircularProgress aria-label="Loading settings" />
      )}
    </SettingsContainer>
  );
};
