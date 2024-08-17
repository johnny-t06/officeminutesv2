"use client";
import { Box, Button, Typography } from "@mui/material";
import theme from "theme";
import DisplayTas from "./tas";
import { IdentifiableUsers } from "@interfaces/type";
import { usePathname, useRouter } from "next/navigation";

interface DisplayCourseProps {
  tas: IdentifiableUsers;
}
const DisplayCourse = (props: DisplayCourseProps) => {
  const { tas } = props;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        marginTop: "24px",
        height: "100vh",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Announcement
        </Typography>
        <Box
          sx={{
            padding: "16px 16px",
            bgcolor: "#F8F9FF",
            borderRadius: "16px",
            marginY: "16px",
          }}
        >
          <Typography variant="body2" color={theme.palette.text.secondary}>
            No announcement yet
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Location & Hours
        </Typography>
        <Box
          sx={{
            padding: "16px 16px",
            gap: "10px",
            flexDirection: "column",
            display: "flex",
            marginTop: "16px",
          }}
        >
          <Typography variant="body2" color={theme.palette.text.primary}>
            JCC 4th floor huddle room
          </Typography>
          <Typography variant="body2" color={theme.palette.text.primary}>
            6 - 9 PM
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ fontWeight: "bold" }}
          >
            TAs
          </Typography>
          <Button
            style={{
              textTransform: "none",
              padding: 0,
            }}
            onClick={() => {
              router.push(`${pathname}/tas`);
            }}
          >
            <Typography variant="subtitle2">View All</Typography>
          </Button>
        </Box>
        <Box sx={{ padding: "16px, 16px", height: "48%", overflow: "auto" }}>
          <DisplayTas tas={tas} />
        </Box>
        <Button
          variant="contained"
          sx={{
            marginTop: "16px",
            bgcolor: theme.palette.primary.light,
            borderRadius: "16px",
            "&:hover": {
              bgcolor: theme.palette.primary.light,
            },
            "&:active": {
              bgcolor: theme.palette.primary.light,
            },
          }}
        >
          <Typography
            variant="subtitle2"
            color={theme.palette.text.secondary}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Show Support to TAs
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DisplayCourse;
