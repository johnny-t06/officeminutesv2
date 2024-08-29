'use client'

import Header from "@components/Header";
import CreateQuestion from "@components/queue/CreateQuestion";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const Page = () => {
  return (
    <div>
      <Header
        leftIcon={
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        }
        title="Course Name"
        alignCenter
      />
      <CreateQuestion></CreateQuestion>
    </div>
  );
};

export default Page;
