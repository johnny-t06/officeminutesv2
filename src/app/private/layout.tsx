import { SidebarProvider } from "@context/SidebarContext";
import { redirect } from "next/navigation";

interface LayoutProps {
  children?: React.ReactNode;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://yourdomain.com"
    : "http://localhost:3000";

const queryParamString = new URLSearchParams("loggedOut=true").toString();
const Layout = async ({ children }: LayoutProps) => {
  const response = await fetch(`${baseUrl}/api/auth`, {
    method: "GET",
  });

  if (!response.ok) {
    redirect(`${baseUrl}/login?${queryParamString}`);
  }
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Layout;
