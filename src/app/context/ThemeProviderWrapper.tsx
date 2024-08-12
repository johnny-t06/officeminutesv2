// components/ThemeProviderWrapper.js
"use client"; // This is a client component

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme"; // Import the theme
import { ScopedCssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <ScopedCssBaseline>{children}</ScopedCssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
