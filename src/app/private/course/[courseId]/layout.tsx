"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { NavBarContainer } from "@components/container";
import { Box } from "@mui/material";
import { useOfficeHourStore } from "@providers/OfficeHourProvider";
import React from "react";

interface ILayout {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const Layout = (props: ILayout) => {
  const {
    children,
    params: { courseId },
  } = props;
  const initializeListeners = useOfficeHourStore((state) => state.initializeListeners);

  React.useEffect(() => {
    const cleanup = initializeListeners(courseId);
    return () => cleanup();
  }, [courseId, initializeListeners]);

  /* TODO(johnnyt-06) */
  // Call user context here
  // Perform role and class validation here

  const buttons = [
    {
      label: "Home",
      icon: <HomeOutlinedIcon />,
      href: `/private/course/${courseId}`,
    },
    {
      label: "Board",
      icon: <StickyNote2OutlinedIcon />,
      href: `/private/course/${courseId}/board`,
    },
    {
      label: "Queue",
      icon: <PeopleAltOutlinedIcon />,
      href: `/private/course/${courseId}/queue`,
    },
    {
      label: "Profile",
      icon: <PersonOutlineOutlinedIcon />,
      href: `/private/course/${courseId}/profile`,
    },
  ];

  return (
    <NavBarContainer buttons={buttons}>
      <Box paddingX="16px" display="flex" flexDirection="column" rowGap="16px">
        {children}
      </Box>
    </NavBarContainer>
  );
};

export default Layout;
