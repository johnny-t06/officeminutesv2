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
      primary: "#000000", // Black text
    },
    error: {
      main: "#FF0000", // Red color
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
