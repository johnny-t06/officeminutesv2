'use client'

import Header from "@components/Header";
import CreateQuestion from "@components/queue/CreateQuestion";
import Queue from "@components/queue";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";

const Page = () => {
  const { course } = useOfficeHour();
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
        title={course.name}
        alignCenter
      />
      <CreateQuestion></CreateQuestion>
      <Queue />
    </Box>
  );
};

export default Page;
