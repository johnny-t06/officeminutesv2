import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38608F", // Blue color
      light: "D3E4FF", // Light blue color
    },
    secondary: {
      main: "#ECEDF4", // Gray color
    },
    background: {},
    text: {
      primary: "#000000", // Black text
    },
  },
  typography: {},
});

export default theme;
