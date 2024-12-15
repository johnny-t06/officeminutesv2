"use client";

import React from "react";
import {
  useSidebarStateContext,
  useSidebarActionsContext,
} from "@context/SidebarContext";
import { Drawer, Box, Typography, List, ListItemButton } from "@mui/material";
import theme from "theme";
import { getCourses } from "@services/client/course";
import { useUserSession } from "@context/UserSessionContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { IdentifiableCourse } from "@interfaces/type";
import MenuButton from "./buttons/MenuButton";

const Sidebar = React.memo(() => {
  const [courses, setCourses] = React.useState<IdentifiableCourse[]>([]);
  const { isOpen } = useSidebarStateContext();
  const { closeSidebar } = useSidebarActionsContext();
  const { user } = useUserSession();
  const { courses: courseIds = [] } = user || {};
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const loadCourses = async () => {
      const allCourses = await getCourses();
      const filteredCourses = allCourses
        .filter((course) => courseIds.includes(course.id))
        .map((course) => course);
      setCourses(filteredCourses);
    };
    loadCourses();
  }, [user]);

  const handleCourseClick = (course: IdentifiableCourse) => {
    const isCourseRoute = /\/[a-zA-Z]+\d+/.test(pathname);

    const basePath = isCourseRoute
      ? pathname.replace(/\/[a-zA-Z]+\d+.*$/, "")
      : pathname;

    router.push(`${basePath}/${course.id}`);
    closeSidebar();
  };

  const formattedCourseName = (course: IdentifiableCourse) => {
    const formattedCourseId = course.id
      .toUpperCase()
      .replace(/([a-zA-Z]+)(\d+)/, "$1 $2");

    return `${formattedCourseId} ${course.name}`;
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={closeSidebar}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": { width: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            fontWeight="light"
          >
            My Classes
          </Typography>
          <MenuButton isOpen={false} />
        </Box>
        <List>
          {courses.map((course, i) => (
            <ListItemButton
              key={i}
              sx={{
                padding: "16px 12px",
                borderRadius: "9999px",
                "&:active": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
              onClick={() => handleCourseClick(course)}
            >
              <Typography variant="body2">
                {formattedCourseName(course)}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
});

export default Sidebar;
