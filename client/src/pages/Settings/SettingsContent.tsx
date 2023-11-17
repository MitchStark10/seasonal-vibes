import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { ChangePayload } from ".";
import { useCreatePlaylist } from "../../hooks/api/useCreatePlaylist";
import { Settings } from "../../hooks/api/useSettings";
import { useOutsideClick } from "../../hooks/useClickOutside";
import { DeleteAccountModal } from "./DeleteAccountModal";

interface Props {
  settings: Settings;
  handleSettingsChange: (changePayload: ChangePayload) => void;
}

const SettingsContentContainer = styled("div")({
  padding: "10px",
});

const ConfigurableSettingsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const NewPlaylistFormContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
});

const DeleteButtonContainer = styled(Button)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

// TODO: Put this in a separate file
const Divider = styled("hr")({
  margin: "20px 0",
});

export const SettingsContent: React.FC<Props> = ({
  settings,
  handleSettingsChange,
}) => {
  const [isShowingNewPlaylistForm, setIsShowingNewPlaylistForm] =
    useState(false);
  const [isShowingDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const { createPlaylist, loading } = useCreatePlaylist();

  const resetNewPlaylistFormState = () => {
    setIsShowingNewPlaylistForm(false);
    setPlaylistName("");
  };

  const generatePlaylistContanerRef = useOutsideClick(
    resetNewPlaylistFormState
  );

  const handlePlaylistCreationClick = async () => {
    const response = await createPlaylist({ playlistName });
    if (response.success) {
      resetNewPlaylistFormState();
    }
  };

  return (
    <SettingsContentContainer>
      <ConfigurableSettingsContainer>
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
            <Switch
              checked={settings.isSubscribed}
              onChange={(e) =>
                handleSettingsChange({
                  key: "isSubscribed",
                  value: e.target.checked,
                })
              }
            />
          }
          label="Subscribed to monthly playlists"
        />
        <div>
          <FormControl sx={{ minWidth: "225px" }}>
            <InputLabel>Quantity of Songs per Playlist</InputLabel>
            <Select
              label="Quantity of Songs per Playlist"
              value={settings.quantityOfSongsPerPlaylist || 25}
              onChange={(ev) => {
                handleSettingsChange({
                  key: "quantityOfSongsPerPlaylist",
                  value: Number(ev.target.value),
                });
              }}
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {!isShowingNewPlaylistForm && (
            <Button
              onClick={() => setIsShowingNewPlaylistForm(true)}
              variant="contained"
              color="primary"
              sx={{ marginTop: "5px" }}
            >
              Generate Playlist Now
            </Button>
          )}
          {isShowingNewPlaylistForm && (
            <NewPlaylistFormContainer ref={generatePlaylistContanerRef}>
              <TextField
                label="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                size="small"
              />
              <Button
                onClick={handlePlaylistCreationClick}
                disabled={!playlistName || loading}
                variant="outlined"
                size="small"
              >
                {loading ? <CircularProgress size="20px" /> : "Create"}
              </Button>
              <Button
                onClick={resetNewPlaylistFormState}
                color="error"
                size="small"
              >
                Cancel
              </Button>
            </NewPlaylistFormContainer>
          )}
        </div>
      </ConfigurableSettingsContainer>
      <Divider />
      <div>
        <DeleteButtonContainer
          variant="outlined"
          color="error"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <DeleteIcon sx={{ marginRight: "10px" }} />
          Delete seasonalvibes account
        </DeleteButtonContainer>
        <Typography>
          Deleting your seasonalvibes account will not impact your Spotify
          account in any way.
        </Typography>
      </div>
      <DeleteAccountModal
        open={isShowingDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </SettingsContentContainer>
  );
};
