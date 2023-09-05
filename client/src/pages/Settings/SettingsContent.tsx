import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { Settings } from "../../hooks/api/useSettings";

interface Props {
  settings: Settings;
  handleSubscriptionChange: (isSubscribed: boolean) => void;
}

export const SettingsContent: React.FC<Props> = ({
  settings,
  handleSubscriptionChange,
}) => {
  return (
    <div>
      <Typography>
        Your next playlist will be generated on:{" "}
        {new Date(settings.nextPlaylistCreationDate).toLocaleDateString(
          "en-US"
        )}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.isSubscribed}
            onChange={(e) => handleSubscriptionChange(e.target.checked)}
          />
        }
        label="Subscribed to monthly playlists"
      />
    </div>
  );
};
