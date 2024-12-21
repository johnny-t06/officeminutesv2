"use client";

import Header from "@components/Header";
import { useUserSessionStore } from "@stores/useUserSessionStore";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton } from "@mui/material";

const Page = () => {
  const { onSignOut } = useUserSessionStore();

  return (
    <div>
      <Header
        leftIcon={
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        }
        title="Profile"
        alignCenter
        rightIcon={<Button onClick={onSignOut}>Sign Out</Button>}
      />
    </div>
  );
};

export default Page;
