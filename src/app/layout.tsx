import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderWrapper from "@context/ThemeProviderWrapper";
import { UserSessionContextProvider } from "@context/UserSessionContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LoadingProvider } from "@context/LoadingContext";
import GlobalLoading from "@components/GlobalLoading";

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
            <LoadingProvider>
              <UserSessionContextProvider>
                <ThemeProviderWrapper>
                  <GlobalLoading />
                  {children}
                </ThemeProviderWrapper>
              </UserSessionContextProvider>
            </LoadingProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
