'use client'

import MenuButton from "@components/buttons/MenuButton";
import Header from "@components/Header";
import CreateQuestion from "@components/queue/CreateQuestion";
import Queue from "@components/queue";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box } from "@mui/material";
import { EditQuestion } from "@components/queue/EditQuestion";

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
        leftIcon={<MenuButton isEdge />}
        title={course.name}
        alignCenter
      />
      <EditQuestion />
      <CreateQuestion/>
      <Queue />
    </Box>
  );
};

export default Page;
