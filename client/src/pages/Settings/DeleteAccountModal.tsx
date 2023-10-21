import { Button } from "@mui/material";
import { Modal } from "../../components/Modal";
import { useDeleteAccount } from "../../hooks/api/useDeleteAccount";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<Props> = ({ open, onClose }) => {
  const { deleteAccount } = useDeleteAccount();
  const handleDeleteAccount = () => {
    deleteAccount();
    onClose();
  };

  return (
    <Modal open={open}>
      <>
        Are you sure you want to delete your account? This action cannot be
        undone.
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAccount}
          >
            Yes, delete my account
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
};
