"use client";

import Header from "@components/Header";
import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import StudentDisplayCourse from "@components/StudentDisplayCourse";
import TADisplayCourse from "@components/TADisplayCourse";
import MenuButton from "@components/buttons/MenuButton";
import { getUserSessionOrRedirect } from "@utils/index";
import React from "react";
import { IdentifiableUsers } from "@interfaces/type";
import Spinner from "@components/Spinner";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  const user = getUserSessionOrRedirect();

  const [tas, setTAs] = React.useState<IdentifiableUsers>([]);
  const [students, setStudents] = React.useState<IdentifiableUsers>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourse(courseId);
        const tasData = await getUsers(courseData.tas);
        const studentData = await getUsers(courseData.students);
        setTAs(tasData);
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const isUserTA = tas.some((ta) => ta.id === user.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Header
        leftIcon={<MenuButton isEdge />}
        title={courseId.toUpperCase()}
        alignCenter
      />
      {isUserTA ? (
        <TADisplayCourse tas={tas} students={students} />
      ) : (
        <StudentDisplayCourse tas={tas} />
      )}
    </div>
  );
};

export default Page;
