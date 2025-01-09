import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderWrapper from "@context/ThemeProviderWrapper";
import { UserSessionContextProvider } from "@context/UserSessionContext";
import { SidebarProvider } from "@context/SidebarContext";
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
            <UserSessionContextProvider>
              <ThemeProviderWrapper>
                <SidebarProvider>{children}</SidebarProvider>
              </ThemeProviderWrapper>
            </UserSessionContextProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
