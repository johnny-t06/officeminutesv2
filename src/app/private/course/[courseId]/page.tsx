import Header from "@components/Header";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import DisplayCourse from "@components/DisplayCourse";
interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = async (props: PageProps) => {
  const {
    params: { courseId },
  } = props;
  const course = await getCourse(courseId);
  const tas = await getUsers(course.tas);
  return (
    <div>
      <Header
        leftIcon={
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        }
        title={courseId.toUpperCase()}
        alignCenter
      />
      <DisplayCourse tas={tas} />
    </div>
  );
};

export default Page;
