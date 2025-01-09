import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import DisplayUsersPage from "@components/DisplayUsersPage";

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
  const students = await getUsers(course.students);

  return (
    <div>
      <DisplayUsersPage students={students} />
    </div>
  );
};

export default Page;
