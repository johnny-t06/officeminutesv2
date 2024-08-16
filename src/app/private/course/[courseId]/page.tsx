"use client";
import Header from "@components/Header";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "theme";
interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;
  // const theme = useTheme();
  return (
    <div>
      <Header
        leftIcon={
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        }
        title={courseId.toUpperCase()}
        alignCenter
      />
      <Box>
        <Typography variant="h6" color={theme.palette.text.primary}>
          Announcement{" "}
        </Typography>
        <Box
          sx={{
            padding: "16px 16px",
            bgcolor: "#F8F9FF",
            borderRadius: "16px",
            marginTop: "16px",
          }}
        >
          <Typography variant="body2" color={theme.palette.text.secondary}>
            No announcement yet
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
