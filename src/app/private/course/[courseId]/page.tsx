"use client";

import Header from "@components/Header";
import StudentDisplayCourse from "@components/StudentDisplayCourse";
import TADisplayCourse from "@components/TADisplayCourse";
import MenuButton from "@components/buttons/MenuButton";
import React from "react";
import Spinner from "@components/Spinner";
import { useCourseData } from "@hooks/useCourseData";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  const { tas, students, loading, isUserTA } = useCourseData({
    fetchUsers: true,
  });

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
