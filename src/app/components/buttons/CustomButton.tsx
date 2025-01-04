import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import theme from "theme";

interface CustomButtonProps extends ButtonProps {
  customColor?: string;
  sx?: SxProps<Theme>;
}

export const CustomButton = (props: CustomButtonProps) => {
  const {
    customColor = theme.palette.primary.main,
    children,
    sx,
    ...buttonProps
  } = props;
  return (
    <Button
      sx={{
        ...sx,
        bgcolor: customColor,
        "&:hover": {
          bgcolor: customColor,
        },
        "&:active": {
          bgcolor: customColor,
        },
        "&:focus-visible": {
          bgcolor: customColor,
        },
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
