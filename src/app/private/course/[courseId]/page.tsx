import Header from "@components/Header";
import { IconButton } from "@mui/material";
import OfficeHourProvider from "../../../context/OfficeHourContext";
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
      </div>
    </OfficeHourProvider>
  );
};

export default Page;
