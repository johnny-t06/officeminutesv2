import { create } from "zustand";
import { IdentifiableCourse, IdentifiableQuestions } from "@interfaces/type";
import { getCourse } from "@services/client/course";
import { getQuestions } from "@services/client/question";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "@project/firebase";
import { courseConverter, questionConverter } from "@services/firestore";

interface OfficeHourState {
  course: IdentifiableCourse | null;
  questions: IdentifiableQuestions;
  isLoading: boolean;
  error: string | null;
  setCourse: (course: IdentifiableCourse) => void;
  setQuestions: (questions: IdentifiableQuestions) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  initializeListeners: (courseId: string) => () => void;
}

export const useOfficeHourStore = create<OfficeHourState>((set) => ({
  course: null,
  questions: [],
  isLoading: true,
  error: null,
  setCourse: (course) => set({ course }),
  setQuestions: (questions) => set({ questions }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),
  initializeListeners: (courseId) => {
    set({ isLoading: true });

    // Load initial data
    Promise.all([getCourse(courseId), getQuestions(courseId)])
      .then(([course, questions]) => {
        set({
          course,
          questions,
          isLoading: false,
        });
      })
      .catch((error) => {
        set({
          error: error.message,
          isLoading: false,
        });
      });

    // Set up listeners
    const courseUnsubscribe = onSnapshot(
      doc(db, `courses/${courseId}`).withConverter(courseConverter),
      (snapshot) => {
        if (snapshot.exists()) {
          set({ course: { id: snapshot.id, ...snapshot.data() } });
        }
      },
      (error) => set({ error: error.message })
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
        set({ questions: questionsList });
      },
      (error) => set({ error: error.message })
    );

    // Return cleanup function
    return () => {
      courseUnsubscribe();
      questionsUnsubscribe();
    };
  },
}));
