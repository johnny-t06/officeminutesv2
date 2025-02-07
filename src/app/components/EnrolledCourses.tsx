"use client";

import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { IdentifiableCourses } from "@interfaces/type";
import { useRouter } from "next/navigation";
import Header from "./Header";
import MenuButton from "./buttons/MenuButton";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { getUserCourses } from "@services/client/course";
import { CourseCard } from "./CourseCard";
import { useLoading } from "@context/LoadingContext";

export const EnrolledCourses = () => {
  const router = useRouter();
  const user = useUserOrRedirect();
  const [courses, setCourses] = React.useState<IdentifiableCourses>([]);
  const { setLoading } = useLoading();

  React.useEffect(() => {
    const fetchCourses = async () => {
      if (user && user.courses.length > 0) {
        setLoading(true);
        const fetchedCourses = await getUserCourses(user);
        setCourses(fetchedCourses);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);
  if (!user) {
    return null;
  }
  return (
    <Box className="flex flex-col h-screen">
      <Header
        leftIcon={<MenuButton />}
        title="Enrolled Classes"
        rightIcon={<IconButton />}
      />
      <Box className="flex flex-col justify-center items-center">
        {courses.length > 0 ? (
          <Box className="flex flex-col gap-4 w-full mt-4 items-center">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            <Button
              variant="contained"
              className="py-2.5 px-6 rounded-full normal-case my-4"
              onClick={() => router.push("/private/course/join")}
            >
              <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
                Join class
              </Typography>
            </Button>
          </Box>
        ) : (
          <Box className="flex flex-col justify-center items-center gap-4 h-[90vh]">
            <Typography variant="subtitle1">
              Add a class to get started
            </Typography>
            <Button
              variant="contained"
              className="py-2.5 px-6 rounded-full normal-case"
              onClick={() => router.push("/private/course/join")}
            >
              <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
                Join class
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
