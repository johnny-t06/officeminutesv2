"use client";

import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebarActionsContext } from "@context/SidebarContext";

interface MenuButtonProps {
  isEdge?: boolean;
  isOpen?: boolean;
}

const MenuButton = React.memo((props: MenuButtonProps) => {
  const { openSidebar, closeSidebar } = useSidebarActionsContext();
  const { isEdge = false, isOpen = true } = props;

  return (
    <IconButton
      edge={isEdge ? "start" : undefined}
      onClick={isOpen ? openSidebar : closeSidebar}
    >
      <MenuIcon />
    </IconButton>
  );
});

export default MenuButton;
