import { SidebarProvider } from "@context/SidebarContext";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Layout;
