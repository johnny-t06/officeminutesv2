import Header from "@components/Header";
import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import DisplayCourse from "@components/DisplayCourse";
import MenuButton from "@components/buttons/MenuButton";

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
        leftIcon={<MenuButton isEdge={true} />}
        title={courseId.toUpperCase()}
        alignCenter
      />
      <DisplayCourse tas={tas} />
    </div>
  );
};

export default Page;
