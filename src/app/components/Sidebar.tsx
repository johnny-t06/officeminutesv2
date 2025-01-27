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
  Button,
  Avatar,
} from "@mui/material";
import theme from "theme";
import { getCoursesByIds } from "@services/client/course";
import { useRouter } from "next/navigation";
import { IdentifiableCourse } from "@interfaces/type";
import MenuButton from "./buttons/MenuButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useUserSession } from "@context/UserSessionContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { trimUserName } from "@utils/index";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";

const Sidebar = () => {
  const [courses, setCourses] = React.useState<IdentifiableCourse[]>([]);
  const { isOpen } = useSidebarStateContext();
  const { closeSidebar } = useSidebarActionsContext();
  const user = useUserOrRedirect();
  const { onSignOut } = useUserSession();
  const router = useRouter();

  React.useEffect(() => {
    const loadCourses = async () => {
      if (user && user.courses.length > 0) {
        const fetchCourses = await getCoursesByIds(user.courses);
        setCourses(fetchCourses);
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
      router.push(`/private/course/${courses[0].id}/profile/`);
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
        "& .MuiDrawer-paper": { width: "70%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "30px 30px 0",
          height: "100vh",
          overflow: "hidden",
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
          {!isOpen && <MenuButton isOpen={false} />}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <List>
            {courses.map((course, index) => (
              <ListItemButton
                key={index}
                sx={{
                  padding: "8px 12px",
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
          <Divider sx={{ marginBottom: "12px" }} />
          <Button
            sx={{
              justifyContent: "flex-start",
              gap: "8px",
              textTransform: "none",
              color: "inherit",
              marginBottom: "12px",
            }}
            onClick={handleManageCoursesClick}
          >
            <ModeEditOutlinedIcon />
            <Typography variant="body1">Manage Classes</Typography>
          </Button>
        </Box>

        <Box
          sx={{
            flexDirection: "column",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "auto",
            marginBottom: "10%",
          }}
        >
          <Divider sx={{ marginBottom: "12px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  height: 40,
                  width: 40,
                }}
              >
                {user ? user.name[0] : ""}
              </Avatar>
              <Box width="100%" overflow="scroll">
                <Typography variant="subtitle1">
                  {trimUserName(user)}
                </Typography>
                <Typography variant="caption">
                  {user ? user.email : ""}
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{
                textTransform: "none",
                color: "inherit",
                justifyContent: "flex-start",
                gap: "8px",
                marginTop: { xs: "24px", sm: "0px" },
              }}
              onClick={onSignOut}
            >
              <LogoutIcon />
              <Typography variant="body1">Log Out</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
