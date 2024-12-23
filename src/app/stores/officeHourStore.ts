import { createStore } from "zustand";
import { IdentifiableCourse, IdentifiableQuestions } from "@interfaces/type";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "@project/firebase";
import { courseConverter, questionConverter } from "@services/firestore";

interface OfficeHourState {
  course: IdentifiableCourse | null;
  questions: IdentifiableQuestions;
  initializeListeners: (courseId: string) => () => void;
}

export const createOfficeHourStore = () =>
  createStore<OfficeHourState>((set) => ({
    course: null,
    questions: [],
    initializeListeners: (courseId) => {
      const courseUnsubscribe = onSnapshot(
        doc(db, `courses/${courseId}`).withConverter(courseConverter),
        (snapshot) => {
          if (snapshot.exists()) {
            set((state) => ({
              ...state,
              course: { id: snapshot.id, ...snapshot.data() },
            }));
          }
        }
      );

      const questionsUnsubscribe = onSnapshot(
        collection(db, `courses/${courseId}/questions`).withConverter(
          questionConverter
        ),
        (snapshot) => {
          const questionsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          set((state) => ({
            ...state,
            questions: questionsList,
          }));
        }
      );

      return () => {
        courseUnsubscribe();
        questionsUnsubscribe();
      };
    },
  }));
