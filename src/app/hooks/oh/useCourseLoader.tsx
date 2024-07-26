import { Course } from "@interfaces/db";
import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import React from "react";

interface UseCourseLoaderProps {
  courseId: string;
}

/**
 * Fetch course from database and implement logic to update course metadata.
 */
export const useCourseLoader = (props: UseCourseLoaderProps) => {
  const { state, setValue, setError } = useLoadingValue<Course>();

  React.useEffect(() => {
    setValue({
      courseId: "CS160",
      name: "Algorithms",
      location: "JCC huddle room",
      professors: [],
      students: [],
      tas: [],
      onDuty: [],
      tags: {},
    });
  }, []);

  return { course: state };
};
