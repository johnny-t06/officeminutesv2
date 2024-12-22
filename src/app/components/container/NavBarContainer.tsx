"use client";
import { INavBar, NavBar } from "@components/NavBar";
import { Paper } from "@mui/material";
import { usePathname } from "next/navigation";

interface NavBarContainerProps extends Omit<INavBar, "pathname"> {
  children?: React.ReactNode;
}

const NavBarContainer = (props: NavBarContainerProps) => {
  const pathName = usePathname();
  const { children, buttons } = props;
  return (
    <div>
      <div>{children}</div>
      <Paper className="fixed bottom-0 left-0 right-0" elevation={3}>
        <NavBar buttons={buttons} pathname={pathName} />
      </Paper>
    </div>
  );
};

export default NavBarContainer;
