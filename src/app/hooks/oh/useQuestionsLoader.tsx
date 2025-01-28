import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import React from "react";
import { IdentifiableQuestions } from "@interfaces/type";
import { getQuestions } from "services/client/question";
import {
  collection,
  onSnapshot,
  Timestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@project/firebase";
import { questionConverter } from "@services/firestore";
import { groupDocChangesByType } from "@utils/index";

interface UseQuestionsLoaderProps {
  courseId: string;
}

/**
 * Fetch questions from database and implement logic to update questions
 * metadata.
 */
export const useQuestionsLoader = (props: UseQuestionsLoaderProps) => {
  const { courseId } = props;
  const { state, setValue, setError } = useLoadingValue<IdentifiableQuestions>({
    init: [],
  });
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  React.useEffect(() => {
    getQuestions(props.courseId).then((value) => {
      setValue(value);
    });
  }, [props.courseId]);

  React.useEffect(() => {
    if (state.state !== State.SUCCESS) {
      if (unsubscriber.current !== null) {
        unsubscriber.current();
        unsubscriber.current = null;
      }
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, `courses/${courseId}/questions`).withConverter(
        questionConverter
      ),
      (snapshot) => {
        const docByType = groupDocChangesByType(snapshot.docChanges());
        const removed = docByType["removed"] ?? [];
        const modified = docByType["modified"] ?? [];
        const added = docByType["added"] ?? [];
        setValue((prev) => {
          const updated = prev
            .filter((doc) => !removed.some((d) => d.id === doc.id))
            .map((doc) => {
              return modified.find((d) => d.id === doc.id) ?? doc;
            });
          return [
            ...updated,
            ...added.map((doc) => ({
              ...doc,
              timestamp: doc.timestamp ?? Timestamp.now(),
            })),
          ];
        });
      }
    );

    unsubscriber.current = unsubscribe;

    return () => {
      if (unsubscriber.current) {
        unsubscriber.current();
        unsubscriber.current = null;
      }
    };
  }, [state.state, courseId]);

  // TODO(lnguyen2693) - handle setError
  return { questions: state };
};
