import OfficeHourProvider from "@context/OfficeHourContext";

interface LayoutProps {
  children?: React.ReactNode;
  params: {
    courseId: string;
  };
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    params: { courseId },
  } = props;
  return (
    <OfficeHourProvider courseId={courseId}>{children}</OfficeHourProvider>
  );
};

export default Layout;
