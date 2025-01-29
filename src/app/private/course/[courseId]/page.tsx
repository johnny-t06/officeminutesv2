"use client";

import Header from "@components/Header";
import StudentDisplayCourse from "@components/StudentDisplayCourse";
import TADisplayCourse from "@components/TADisplayCourse";
import MenuButton from "@components/buttons/MenuButton";
import React from "react";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { IdentifiableUsers } from "@interfaces/type";
import { getUsers } from "@services/client/user";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  const user = useUserOrRedirect();
  const { course } = useOfficeHour();
  const [tas, setTAs] = React.useState<IdentifiableUsers>([]);
  const [students, setStudents] = React.useState<IdentifiableUsers>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasData = await getUsers(course.tas);
        const studentData = await getUsers(course.students);
        setTAs(tasData);
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [course]);

  if (!user) {
    return null;
  }
  const isUserTA = course.tas.includes(user.id);
  return (
    <div>
      <Header leftIcon={<MenuButton isEdge />} title={courseId.toUpperCase()} />
      {isUserTA ? (
        <TADisplayCourse tas={tas} students={students} />
      ) : (
        <StudentDisplayCourse tas={tas} />
      )}
    </div>
  );
};

export default Page;
