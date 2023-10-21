import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useCreatePlaylist } from "../../hooks/api/useCreatePlaylist";
import { Settings } from "../../hooks/api/useSettings";
import { useOutsideClick } from "../../hooks/useClickOutside";
import { DeleteAccountModal } from "./DeleteAccountModal";

interface Props {
  settings: Settings;
  handleSubscriptionChange: (isSubscribed: boolean) => void;
}

const SettingsContentContainer = styled("div")({
  padding: "10px",
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
  handleSubscriptionChange,
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
            />
            <Button
              onClick={handlePlaylistCreationClick}
              disabled={!playlistName || loading}
              variant="outlined"
            >
              {loading ? <CircularProgress /> : "Create"}
            </Button>
            <Button onClick={resetNewPlaylistFormState} color="error">
              Cancel
            </Button>
          </NewPlaylistFormContainer>
        )}
      </div>
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
