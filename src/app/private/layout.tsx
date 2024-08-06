import BottomNavigation from "@mui/material/BottomNavigation";
interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  /* TODO(johnnyt-06) */
  // Call user context here
  // Perform role and class validation here
  // Loading indicator

  return (
    <html lang="en">
      <BottomNavigation>
        <body>{children}</body>
      </BottomNavigation>
    </html>
  );
};

export default Layout;
