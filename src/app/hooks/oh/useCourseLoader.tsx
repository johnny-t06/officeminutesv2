import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import { IdentifiableCourse } from "@interfaces/type";
import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { getCourse } from "services/client/course";
import { db } from "../../../../firebase";
import { courseConverter } from "services/firestore";

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
    
    // listener for course
    const unsubscribe = onSnapshot(
      doc(db, `courses/${props.courseId}`).withConverter(courseConverter),
      (snapshot) => {
        if (snapshot.exists()) {
          setValue({ id: snapshot.id, ...snapshot.data() });
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // TODO(lnguyen2693) - handle setError

  return { course: state };
};
