import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderWrapper from "@context/ThemeProviderWrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const metadata: Metadata = {
  title: "OfficeMinutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root">
        <div id="__next">
          <AppRouterCacheProvider>
            <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
