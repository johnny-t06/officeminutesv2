import { Button, Typography } from "@mui/material";

interface CustomButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
export const CustomFloatingButton = (props: CustomButtonProps) => {
  const { text, icon, onClick, disabled = false } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled}
      sx={{
        textTransform: "initial",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1.5,
        paddingTop: 1.5,
        paddingBottom: 1.5,
        paddingRight: 2.5,
        paddingLeft: 2.5,
        borderRadius: 4,
        position: "fixed",
        bottom: 70,
        right: 15,
        zIndex: 99,
      }}
      onClick={onClick}
    >
      {icon}
      <Typography fontWeight={500}>{text}</Typography>
    </Button>
  );
};
