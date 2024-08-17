import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import DisplayTasPage from "@components/DisplayTasPage";

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
      <DisplayTasPage onDutyTas={onDutyTas} offDutyTas={offDutyTas} />
    </div>
  );
};

export default Page;
