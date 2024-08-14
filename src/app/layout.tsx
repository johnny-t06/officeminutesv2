import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@context/ThemeProviderWrapper";
import { UserSessionContextProvider } from "@context/UserSessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OfficeMinutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserSessionContextProvider>
      <ThemeProviderWrapper>
        <html lang="en">
          <body className={inter.className} id="root">
            <div id="__next">{children}</div>
          </body>
        </html>
      </ThemeProviderWrapper>
    </UserSessionContextProvider>
  );
}
