import { Box } from "@mui/material";

interface RoundedTileProps {
  children?: React.ReactNode;
}

export const RoundedTile = (props: RoundedTileProps) => {
  const { children } = props;
  return (
    <Box
      sx={{
        padding: "16px 16px",
        bgcolor: "#F8F9FF",
        borderRadius: "16px",
      }}
    >
      {children}
    </Box>
  );
};
