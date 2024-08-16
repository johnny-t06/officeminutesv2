import Header from "@components/Header";
import OfficeHourProvider from "@context/OfficeHourContext";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  return (
    <OfficeHourProvider courseId={courseId}>
      {/* TODO(nickbar01234) - Display UI */}
      <div>
        <Header
          leftIcon={
            <IconButton edge="start">
              <MenuIcon />
            </IconButton>
          }
          title="Course Name"
          alignCenter
        />
        <text>{`this is the ${courseId} page`}</text>
      </div>
    </OfficeHourProvider>
  );
};

export default Page;
