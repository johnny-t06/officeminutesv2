import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import React from "react";
import { IdentifiableQuestions } from "@interfaces/type";
import { getQuestions } from "@services/client/question";

interface UseQuestionsLoaderProps {
  courseId: string;
}

/**
 * Fetch questions from database and implement logic to update questions
 * metadata.
 */
export const useQuestionsLoader = (props: UseQuestionsLoaderProps) => {
  const { state, setValue, setError } =
    useLoadingValue<IdentifiableQuestions>();

  React.useEffect(() => {
    getQuestions(props.courseId).then((value) => {
      setValue(value);
    });
  }, []);

  React.useEffect(() => {
    // set up listener to handle new changes
    if (state.state !== State.SUCCESS) {
      return;
    }
  }, []);

  return { questions: state };
};
