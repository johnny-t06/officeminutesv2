import {
  AppBar,
  Button,
  IconButton,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

interface IHeader {
  leftIcon?: React.ReactNode;
  title?: string;
  rightIcon?: React.ReactNode;
  alignCenter?: boolean;
}

const Header = (props: IHeader) => {
  const { leftIcon, title, rightIcon, alignCenter } = props;
  const titleStyles: SxProps = {
    position: alignCenter ? "absolute" : "static",
    left: alignCenter ? "50%" : "auto",
    transform: alignCenter ? "translateX(-50%)" : "none",
    marginRight: rightIcon ? "auto" : "0",
  };
  const isButtonElement = (element: React.ReactNode) => {
    return (
      React.isValidElement(element) &&
      (element.type === "button" || element.type === Button)
    );
  };
  return (
    <AppBar position="static" elevation={0} color="inherit">
      <Toolbar>
        {leftIcon &&
          (isButtonElement(leftIcon) ? (
            leftIcon
          ) : (
            <IconButton edge="start" color="inherit" aria-label="left icon">
              {leftIcon}
            </IconButton>
          ))}
        <Typography variant="h6" component="div" sx={titleStyles}>
          {title}
        </Typography>
        {rightIcon &&
          (isButtonElement(rightIcon) ? (
            rightIcon
          ) : (
            <IconButton edge="end" color="inherit" aria-label="right icon">
              {rightIcon}
            </IconButton>
          ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
