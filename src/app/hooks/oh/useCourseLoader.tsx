import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import { IdentifiableCourse } from "@interfaces/type";
import React from "react";
import { getCourse } from "services/client/course";

interface UseCourseLoaderProps {
  courseId: string;
}

/**
 * Fetch course from database and implement logic to update course metadata.
 */
export const useCourseLoader = (props: UseCourseLoaderProps) => {
  const { state, setValue, setError } = useLoadingValue<IdentifiableCourse>();

  React.useEffect(() => {
    getCourse(props.courseId).then((value) => {
      setValue(value);
    });
  }, []);

  React.useEffect(() => {
    // set up listener to handle new changes
    if (state.state !== State.SUCCESS) {
      return;
    }
    // onSnapshot()
  }, []);
  // React.useEffect(() => {
  //   setValue({
  //     // courseId: "CS160",
  //     name: "Algorithms",
  //     location: "JCC huddle room",
  //     professors: [],
  //     students: [],
  //     tas: [],
  //     onDuty: [],
  //     tags: {},
  //   });
  // }, []);

  return { course: state };
};
