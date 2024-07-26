import { Questions, QuestionState } from "@interfaces/db";
import { useLoadingValue } from "@hooks/utils/useLoadingValue";
import React from "react";

interface UseQuestionsLoaderProps {
  courseId: string;
}

/**
 * Fetch questions from database and implement logic to update questions
 * metadata.
 */
export const useQuestionsLoader = (props: UseQuestionsLoaderProps) => {
  const { state, setValue, setError } = useLoadingValue<Questions>();

  React.useEffect(() => {
    setValue([
      {
        title: "How to do amortization?",
        description: "Help moi",
        public: true,
        state: QuestionState.PENDING,
        timestamp: new Date(),
        group: ["nickbar01234"],
        tags: [],
      },
    ]);
  }, []);

  return { questions: state };
};
