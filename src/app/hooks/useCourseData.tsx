import { IdentifiableUsers } from "@interfaces/type";
import { getUsers } from "@services/client/user";
import React from "react";
import { useOfficeHour } from "./oh/useOfficeHour";
import { useUserOrRedirect } from "./useUserOrRedirect";
import { useLoading } from "@context/LoadingContext";

interface CourseDataProps {
  fetchUsers: boolean;
}

export const useCourseData = (props: CourseDataProps) => {
  const { fetchUsers } = props;

  const user = useUserOrRedirect();
  const { course } = useOfficeHour();
  const { loading, setLoading } = useLoading();

  const [tas, setTAs] = React.useState<IdentifiableUsers>([]);
  const [students, setStudents] = React.useState<IdentifiableUsers>([]);

  if (!user) {
    return {
      loading: false,
      isUserTA: false,
      tas: [],
      students: [],
    };
  }
  const isUserTA = course.tas.includes(user.id);

  if (!fetchUsers) {
    return {
      loading: false,
      isUserTA: course.tas.includes(user.id),
      tas: [],
      students: [],
    };
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (fetchUsers) {
          const tasData = await getUsers(course.tas);
          const studentData = await getUsers(course.students);
          setTAs(tasData);
          setStudents(studentData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [course]);

  return { tas, students, loading, isUserTA };
};
