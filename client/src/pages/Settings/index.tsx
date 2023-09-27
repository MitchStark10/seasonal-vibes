import { CircularProgress, styled } from "@mui/material";
import { Settings, useSettings } from "../../hooks/api/useSettings";
import { SettingsContent } from "./SettingsContent";

const SettingsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const SettingsPage = () => {
  const { settings, saveSettings } = useSettings();

  const handleSettingsChange = (settings: Settings) => {
    if (settings) {
      saveSettings({ ...settings });
    }
  };

  return (
    <SettingsContainer>
      <h1>Settings</h1>
      {settings ? (
        <SettingsContent
          settings={settings}
          handleSettingsChange={handleSettingsChange}
        />
      ) : (
        <CircularProgress />
      )}
    </SettingsContainer>
  );
};
