"use client";

import { Theme, createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#38608F", // Blue color
      light: "#D3E4FF", // Light blue color
    },
    secondary: {
      main: "#ECEDF4", // Gray color
    },
    text: {
      primary: "#1D192B", // Black text
      secondary: "#43474E", // Gray text
    },
    error: {
      main: "#FF0000", // Red color
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
});

export default theme;
