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
  const tas = await getUsers(course.tas);
  const offDutyTas = tas.filter((ta) => !course.onDuty.includes(ta.id));
  const onDutyTas = tas.filter((ta) => course.onDuty.includes(ta.id));

  return (
    <div>
      <DisplayUsersPage onDutyTas={onDutyTas} offDutyTas={offDutyTas} />
    </div>
  );
};

export default Page;
