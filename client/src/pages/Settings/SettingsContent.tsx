import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { PlaylistVisibility, Settings } from "../../hooks/api/useSettings";

interface Props {
  settings: Settings;
  handleSettingsChange: (settings: Settings) => void;
}

const SettingsContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const PlaylistVisibilityFormControl = styled(FormControl)({
  width: "200px",
});

export const SettingsContent: React.FC<Props> = ({
  settings,
  handleSettingsChange,
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
            onChange={(e) =>
              handleSettingsChange({
                ...settings,
                isSubscribed: e.target.checked,
              })
            }
          />
        }
        label="Subscribed to monthly playlists"
      />
      <PlaylistVisibilityFormControl>
        <InputLabel>Playlist Visibility</InputLabel>
        <Select
          label="Playlist Visibility"
          value={settings.playlistVisibilityType}
          onChange={(e) =>
            handleSettingsChange({
              ...settings,
              playlistVisibilityType: e.target.value as PlaylistVisibility,
            })
          }
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>
      </PlaylistVisibilityFormControl>
    </SettingsContentContainer>
  );
};
