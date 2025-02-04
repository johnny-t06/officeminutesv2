import { State, useLoadingValue } from "@hooks/utils/useLoadingValue";
import React from "react";
import { IdentifiableQuestions } from "@interfaces/type";
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  Unsubscribe,
  where,
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
    if (unsubscriber.current !== null) {
      unsubscriber.current();
      unsubscriber.current = null;
    }

    const oneDayAgo = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000);

    const q = query(
      collection(db, `courses/${courseId}/questions`).withConverter(
        questionConverter
      ),
      where("state", "!=", 3),
      where("timestamp", ">", oneDayAgo)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docByType = groupDocChangesByType(snapshot.docChanges());
      const removed = docByType["removed"] ?? [];
      const modified = docByType["modified"] ?? [];
      const added = docByType["added"] ?? [];
      console.log("changes", docByType);
      setValue((prev) => {
        const updated = prev
          .filter((doc) => !removed.some((d) => d.id === doc.id))
          .map((doc) => {
            return modified.find((d) => d.id === doc.id) ?? doc;
          });
        const addedDocs = added
          .filter((doc) => !prev.some((prevDoc) => prevDoc.id === doc.id))
          .map((doc) => ({
            ...doc,
            timestamp: doc.timestamp ?? Timestamp.now(),
          }));
        console.log("updated", updated);
        console.log("added", addedDocs);
        return [...updated, ...addedDocs];
      });
    });

    unsubscriber.current = unsubscribe;

    return () => {
      if (unsubscriber.current) {
        unsubscriber.current();
        unsubscriber.current = null;
      }
    };
  }, [courseId]);

  // TODO(lnguyen2693) - handle setError
  return { questions: state };
};
