"use client";
import { createTheme } from "@mui/material/styles";
const { palette } = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#38608F", // Blue color
      light: "#D3E4FF", // Light blue color
    },
    secondary: {
      main: "#ECEDF4", // Gray color
    },
    text: {
      primary: "#000000", // Black text
    },
    error: {
      main: "#FF0000", // Red color
    },
  },
});

export default theme;
