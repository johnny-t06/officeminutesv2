"use client";
import { createTheme } from "@mui/material/styles";

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
      primary: "#1D1B20", // Black text
      secondary: "#545F70", // Gray text
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
