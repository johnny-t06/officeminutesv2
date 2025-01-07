import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

interface IHeader {
  leftIcon?: React.ReactNode;
  title?: string;
  rightIcon?: React.ReactNode;
  alignCenter?: boolean;
}

const Header = (props: IHeader) => {
  const { title, leftIcon, rightIcon, alignCenter } = props;
  return (
    <AppBar position="static" elevation={0} color="inherit">
      <Toolbar disableGutters sx={{ marginLeft: "1%" }}>
        {leftIcon}
        <Typography
          variant="h6"
          component="div"
          className={`flex-grow ${alignCenter ? "text-center" : "text-start"}`}
          sx={{ fontWeight: 400, marginLeft: alignCenter ? "0" : "5%" }}
        >
          {title}
        </Typography>

        {alignCenter && !rightIcon ? <Box className="w-[40px]" /> : rightIcon}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
