"use client";
import { Box, Button, Typography } from "@mui/material";
import theme from "theme";
import DisplayTas from "./tas";
import { IdentifiableUsers } from "@interfaces/type";
import { usePathname, useRouter } from "next/navigation";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { DisplayAnnouncements } from "./DisplayAnnouncements";
import React from "react";

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
      }}
    >
      <DisplayAnnouncements announcements={course.announcements} editable />
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
          <Box height="256px" overflow="scroll">
            <DisplayTas tas={students} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
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
          <Box maxHeight="256px" overflow="scroll">
            <DisplayTas tas={tas} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TADisplayCourse;
