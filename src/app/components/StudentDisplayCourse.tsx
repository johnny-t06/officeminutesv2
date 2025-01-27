"use client";
import { Box, Button, Typography } from "@mui/material";
import theme from "theme";
import DisplayTas from "./tas";
import { IdentifiableUsers } from "@interfaces/type";
import { usePathname, useRouter } from "next/navigation";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { DisplayAnnouncements } from "./DisplayAnnouncements";
import { DisplayLocHours } from "./DisplayLocHours";

interface StudentDisplayCourseProps {
  tas: IdentifiableUsers;
}

const StudentDisplayCourse = (props: StudentDisplayCourseProps) => {
  const { tas } = props;
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
        height: "100vh",
      }}
    >
      <DisplayAnnouncements
        announcements={course.announcements}
        editable={false}
      />
      <DisplayLocHours location={course.location} editable={false} />
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
        <Box height="256px" overflow="scroll">
          <DisplayTas tas={tas} />
        </Box>
        {/* ToDO (johnnyt-06) Implement TA support wall*/}
        {/* <CustomButton
          variant="contained"
          sx={{
            marginTop: "16px",
            borderRadius: "16px",
          }}
          customColor={theme.palette.primary.light}
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
        </CustomButton> */}
      </Box>
    </Box>
  );
};

export default StudentDisplayCourse;
