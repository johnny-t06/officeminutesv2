"use client";

import React from "react";
import {
  useSidebarStateContext,
  useSidebarActionsContext,
} from "@context/SidebarContext";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import theme from "theme";
import { getCoursesByIds } from "@services/client/course";
import { useRouter } from "next/navigation";
import { IdentifiableCourse } from "@interfaces/type";
import MenuButton from "./buttons/MenuButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useUserSession } from "@context/UserSessionContext";

const Sidebar = () => {
  const [courses, setCourses] = React.useState<IdentifiableCourse[]>([]);
  const { isOpen } = useSidebarStateContext();
  const { closeSidebar } = useSidebarActionsContext();
  const { user } = useUserSession();
  const router = useRouter();

  console.log(user);
  React.useEffect(() => {
    const loadCourses = async () => {
      if (user && user.courses.length > 0) {
        const courses = await getCoursesByIds(user.courses);
        setCourses(courses);
      } else {
        setCourses([]);
      }
    };
    loadCourses();
  }, [user]);

  const handleCourseClick = (course: IdentifiableCourse) => {
    router.push(`/private/course/${course.id}`);
    closeSidebar();
  };

  const handleManageCoursesClick = () => {
    if (courses.length > 0) {
      router.push(`/private/course/${courses[0].id}/profile/edit`);
    } else {
      router.push(`/private/course`);
    }
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
          padding: "30px 30px 0",
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
          <Typography variant="h6" color={theme.palette.text.primary}>
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
              <Typography variant="body1">
                {formattedCourseName(course)}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          paddingX: "30px",
        }}
      >
        <Divider sx={{ marginBottom: "12px" }} />
        <ListItemButton
          onClick={handleManageCoursesClick}
          sx={{
            padding: "12px 0 12px 4px",
            borderRadius: "9999px",
            gap: "8px",
            justifyContent: "flex-start",
            "&:hover": {
              background: "transparent",
            },
            "&:active": {
              background: "transparent",
            },
          }}
        >
          <ModeEditOutlinedIcon />
          <Typography variant="body1" fontWeight="light">
            Manage Classes
          </Typography>
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
