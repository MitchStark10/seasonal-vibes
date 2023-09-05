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

export const Settings = () => {
  const { settings, saveSettings } = useSettings();

  const handleSubscriptionChange = (isSubscribed: boolean) => {
    if (settings) {
      saveSettings({ ...settings, isSubscribed });
    }
  };

  return (
    <SettingsContainer>
      <h1>Settings</h1>
      {settings ? (
        <SettingsContent
          settings={settings}
          handleSubscriptionChange={handleSubscriptionChange}
        />
      ) : (
        <CircularProgress />
      )}
    </SettingsContainer>
  );
};
