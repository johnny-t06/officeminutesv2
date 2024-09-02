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
  pathname: string;
}

export const NavBar = ({ buttons, pathname }: INavBar) => {
  return (
    <BottomNavigation
      showLabels
      className="bg-gray"
      value={buttons.findIndex((b) => b.href === pathname)}
    >
      {buttons.map((button) => (
        <BottomNavigationAction
          key={button.label}
          label={button.label}
          icon={button.icon}
          href={button.href}
        />
      ))}
    </BottomNavigation>
  );
};
