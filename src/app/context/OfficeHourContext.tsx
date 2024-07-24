"use client";

import { Course, Questions } from "@interfaces/db";
import { useCourseLoader } from "hooks/oh/useCourseLoader";
import { useQuestionsLoader } from "hooks/oh/useQuestionsLoader";
import { State } from "hooks/utils/useLoadingValue";
import React from "react";

interface OfficeHourProviderProps {
  courseId: string;
  children?: React.ReactNode;
}

/**
 * Getter and setter should only be used by hooks
 */
interface OfficeHourContext {
  course: Course;
  questions: Questions;
}

export const officeHourContext = React.createContext({} as OfficeHourContext);

const Provider = officeHourContext.Provider;

const OfficeHourProvider = (props: OfficeHourProviderProps) => {
  const { courseId } = props;
  const { course } = useCourseLoader({ courseId: courseId });
  const { questions } = useQuestionsLoader({ courseId: courseId });

  if (course.state === State.SUCCESS && questions.state === State.SUCCESS) {
    return (
      <Provider value={{ course: course.value, questions: questions.value }}>
        {props.children}
      </Provider>
    );
  } else {
    // TODO(nickbar01234) - Loading indicator + display error message
    return null;
  }
};

export default OfficeHourProvider;
