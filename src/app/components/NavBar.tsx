import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import { BottomNavigationAction } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface INavBarItem {
  label: string;
  icon: React.ReactElement<SvgIconComponent>;
  href: string;
}

export interface INavBar {
  buttons: INavBarItem[];
}

export const NavBar = ({ buttons }: INavBar) => {
  return (
    <BottomNavigation showLabels style={{ backgroundColor: "#ECEDF4" }}>
      {buttons.map((button) => (
        <BottomNavigationAction
          key={button.label}
          label={button.label}
          icon={button.icon}
          href={button.href}
        ></BottomNavigationAction>
      ))}
    </BottomNavigation>
  );
};
