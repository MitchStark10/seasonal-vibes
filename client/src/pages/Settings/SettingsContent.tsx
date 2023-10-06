import { Checkbox, FormControlLabel, Typography, styled } from "@mui/material";
import React from "react";
import { Settings } from "../../hooks/api/useSettings";

interface Props {
  settings: Settings;
  handleSubscriptionChange: (isSubscribed: boolean) => void;
}

const SettingsContentContainer = styled("div")({
  padding: "10px",
});

export const SettingsContent: React.FC<Props> = ({
  settings,
  handleSubscriptionChange,
}) => {
  return (
    <SettingsContentContainer>
      {settings.isSubscribed && (
        <Typography>
          Your next playlist will be generated on:{" "}
          {new Date(settings.nextPlaylistCreationDate).toLocaleDateString(
            "en-US"
          )}
        </Typography>
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.isSubscribed}
            onChange={(e) => handleSubscriptionChange(e.target.checked)}
          />
        }
        label="Subscribed to monthly playlists"
      />
    </SettingsContentContainer>
  );
};
