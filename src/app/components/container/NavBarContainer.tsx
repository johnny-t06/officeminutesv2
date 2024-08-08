import { INavBar, NavBar } from "@components/NavBar";
import { Paper } from "@mui/material";

interface NavBarContainerProps extends INavBar {
  children: React.ReactNode;
}

const NavBarContainer = (props: NavBarContainerProps) => {
  const { children, buttons } = props;
  return (
    <div>
      <Paper
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <NavBar buttons={buttons} />
      </Paper>
      <div>{children}</div>
    </div>
  );
};

export default NavBarContainer;
