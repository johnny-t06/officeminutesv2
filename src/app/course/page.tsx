import { getCourses } from "@services/client/course";
import { Header } from "../components/OldComponents/Header";
import CourseSelection from "@components/OldComponents/CourseSelection";

const Page = async () => {
  const courses = await getCourses();

  return (
    <div className="h-full w-full">
      <Header />
      <div className="mt-8 px-12">
        <h1 className="text-2xl text-[#393939]">My Classes</h1>
        <div className="flex gap-6 mt-5 flex-wrap">
          {courses.map((course) => (
            <CourseSelection key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
