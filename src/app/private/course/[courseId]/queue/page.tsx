"use client";

import Header from "@components/Header";
import Queue from "@components/queue";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import { useOfficeHourStore } from "@providers/OfficeHourProvider";

const Page = () => {
  const course = useOfficeHourStore((state) => state.course);

  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap="18px"
      position="relative"
      height="100%"
    >
      <Header
        leftIcon={
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        }
        title={course?.name}
        alignCenter
      />
      <Queue />
    </Box>
  );
};

export default Page;
