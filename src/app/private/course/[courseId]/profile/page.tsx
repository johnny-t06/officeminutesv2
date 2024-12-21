"use client";
import MenuButton from "@components/buttons/MenuButton";
import Header from "@components/Header";
import { useUserSession } from "@context/UserSessionContext";
import { Button } from "@mui/material";

const Page = () => {
  const { onSignOut } = useUserSession();
  return (
    <div>
      <Header
        leftIcon={<MenuButton isEdge />}
        title="Profile"
        alignCenter
        rightIcon={<Button onClick={onSignOut}>Sign Out</Button>}
      />
    </div>
  );
};

export default Page;
