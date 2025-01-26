import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

interface IHeader {
  leftIcon?: React.ReactNode;
  title?: string;
  rightIcon?: React.ReactNode;
}

const Header = (props: IHeader) => {
  const { title, leftIcon, rightIcon } = props;

  return (
    <AppBar position="static" elevation={0} color="inherit">
      <Toolbar
        disableGutters
        sx={{
          marginX: "1%",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          {leftIcon}
          {rightIcon ? (
            <Box display="flex" alignItems="center">
              <Typography variant="h6" textAlign="left">
                {title}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" textAlign="center" flexGrow={1}>
              {title}
            </Typography>
          )}
        </Box>

        {!rightIcon ? <Box width="32px" /> : rightIcon}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
