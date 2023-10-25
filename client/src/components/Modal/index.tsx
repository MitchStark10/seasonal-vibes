import { Box, ModalProps, Modal as MuiModal } from "@mui/material";

const boxStyles = {
  maxWidth: "95vw",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  minWidth: "280px",
};

export const Modal: React.FC<ModalProps> = ({ children, ...modalProps }) => {
  return (
    <MuiModal {...modalProps}>
      <Box sx={boxStyles}>{children}</Box>
    </MuiModal>
  );
};
