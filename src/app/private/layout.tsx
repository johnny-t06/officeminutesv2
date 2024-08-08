import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { NavBarContainer } from "@components/container";
interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  /* TODO(johnnyt-06) */
  // Call user context here
  // Perform role and class validation here
  // Loading indicator
  const buttons = [
    {
      label: "Home",
      icon: <HomeOutlinedIcon />,
      href: "/private/course",
    },
    {
      label: "Board",
      icon: <StickyNote2OutlinedIcon />,
      href: "/private/board",
    },
    {
      label: "Queue",
      icon: <PeopleAltOutlinedIcon />,
      href: "/private/queue",
    },
    {
      label: "Profile",
      icon: <PersonOutlineOutlinedIcon />,
      href: "/private/profile",
    },
  ];

  return <NavBarContainer buttons={buttons}>{children}</NavBarContainer>;
};

export default Layout;
