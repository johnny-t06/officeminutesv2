import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import theme from "theme";

export interface ModalButton {
  text: string;
  onClick: () => void;
}

interface CustomModalProps {
  title: string;
  subtitle: string;
  buttons: ModalButton[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CustomModal = (props: CustomModalProps) => {
  const { title, subtitle, buttons, open, setOpen } = props;

  return (
    <Modal
      aria-modal="true"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            width: "75%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#ECEDF4",
            boxShadow: 24,
            px: 3,
            py: 4,
            borderRadius: "28px",
          }}
        >
          <Typography id="transition-modal-title" variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2, color: theme.palette.text.secondary }}
            variant="subtitle1"
          >
            {subtitle}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "36px",
              gap: "24px",
            }}
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                sx={{ textTransform: "none", padding: 0, minWidth: 0 }}
              >
                {button.text}
              </Button>
            ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
