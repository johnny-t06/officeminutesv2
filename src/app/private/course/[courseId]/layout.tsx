import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { NavBarContainer } from "@components/container";
import OfficeHourProvider from "@context/OfficeHourContext";
import { Box } from "@mui/material";
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
    <OfficeHourProvider courseId={courseId}>
      <NavBarContainer buttons={buttons}>
        <Box
          paddingX="16px"
          display="flex"
          flexDirection="column"
          rowGap="16px"
          height="100vh"
        >
          {children}
        </Box>
      </NavBarContainer>
    </OfficeHourProvider>
  );
};

export default Layout;
