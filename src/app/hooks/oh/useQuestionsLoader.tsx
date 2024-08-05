import { Questions, QuestionState } from "@interfaces/db";
import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import React from "react";
import { IdentifiableQuestions } from "@interfaces/type";
import { getQuestion, getQuestions } from "services/client/question";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../../../../firebase";
import { questionConverter } from "services/firestore";

interface UseQuestionsLoaderProps {
  courseId: string;
}

/**
 * Fetch questions from database and implement logic to update questions
 * metadata.
 */
export const useQuestionsLoader = (props: UseQuestionsLoaderProps) => {
  const { courseId } = props;
  const { state, setValue, setError } =
    useLoadingValue<IdentifiableQuestions>();
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  React.useEffect(() => {
    getQuestions(props.courseId).then((value) => {
      setValue(value);
    });
  });

  React.useEffect(() => {
    if (state.state !== State.SUCCESS) {
      if (unsubscriber.current !== null) {
        unsubscriber.current();
      }
      unsubscriber.current = null;
      return;
    }

    // listener for list of questions
    const unsubscribe = onSnapshot(
      collection(db, `courses/${courseId}/questions`).withConverter(
        questionConverter
      ),
      (snapshot) => {
        let questionsList: IdentifiableQuestions = [];
        snapshot.docs.map((doc) => {
          questionsList.push({ id: doc.id, ...doc.data() });
        });

        setValue(questionsList);
      }
    );

    unsubscriber.current = unsubscribe;

    return unsubscriber.current();
  }, [state.state]);

  // TODO(lnguyen2693) - handle setError

  return { questions: state };
};
