"use client";
import { Box, Button, Fab, Typography } from "@mui/material";
import theme from "theme";
import DisplayTas from "./tas";
import { IdentifiableUsers } from "@interfaces/type";
import { usePathname, useRouter } from "next/navigation";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import AddIcon from "@mui/icons-material/Add";

interface TADisplayCourseProps {
  tas: IdentifiableUsers;
  students: IdentifiableUsers;
}
const TADisplayCourse = (props: TADisplayCourseProps) => {
  const { tas, students } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { course } = useOfficeHour();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        marginTop: "24px",
        height: "calc(100vh)",
        paddingBottom: "1130px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ fontWeight: "bold" }}
          >
            Announcement
          </Typography>
          <Typography color={"#38608F"} variant="subtitle2">
            Edit
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "16px 16px",
            bgcolor: "#F8F9FF",
            borderRadius: "16px",
            marginY: "16px",
          }}
        >
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {course.announcement}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexBasis: 0,
            flexGrow: 1,
            flexDirection: "column",
            gap: "10px",
            minHeight: "fit-content",
          }}
        >
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
              Students
            </Typography>
            <Button
              style={{
                textTransform: "none",
                padding: 0,
              }}
              onClick={() => {
                router.push(`${pathname}/students`);
              }}
            >
              <Typography variant="subtitle2">View All</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              padding: "16px, 16px",
              maxHeight: "30vh",
              overflow: "auto",
            }}
          >
            <DisplayTas tas={students} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexBasis: 0,
            flexGrow: 1,
            minHeight: "fit-content",
          }}
        >
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
          <Box
            sx={{
              padding: "16px, 16px",
              overflow: "auto",
              maxHeight: "30vh",
            }}
          >
            <DisplayTas tas={tas} />
          </Box>
          <Button
            variant="contained"
            sx={{
              marginTop: "16px",
              borderRadius: "16px",
              bgcolor: theme.palette.primary.light,
              "&:hover": {
                bgcolor: theme.palette.primary.light, // Prevent hover color from changing
              },
              "&:active": {
                bgcolor: theme.palette.primary.light, // Prevent active color from changing
              },
              "&:focus-visible": {
                bgcolor: theme.palette.primary.light, // Prevent focus-visible color from changing
              },
            }}
          >
            <Typography
              variant="subtitle2"
              color={theme.palette.text.primary}
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
      <Box position="fixed" bottom={80} right={10}>
        <Fab
          aria-label="Create Announcement"
          variant="extended"
          color="primary"
          sx={{
            color: "#FFF",
            textTransform: "none",
            paddingY: "18px",
            paddingX: "16px",
            borderRadius: "16px",
            minHeight: "56px",
          }}
        >
          <AddIcon sx={{ marginRight: "12px" }} />
          <Typography fontWeight={500}>Create Announcement</Typography>
        </Fab>
      </Box>
    </Box>
  );
};

export default TADisplayCourse;
