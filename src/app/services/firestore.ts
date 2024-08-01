import { Course, Question } from "@interfaces/db";
import {
  DocumentData,
  QueryDocumentSnapshot,
  PartialWithFieldValue,
} from "firebase/firestore";

export const courseConverter = {
  toFirestore(course: Course): DocumentData {
    return course;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Course {
    return snapshot.data(options) as Course;
  },
};

export const questionConverter = {
  toFirestore(question: Question): DocumentData {
    return question;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Question {
    return snapshot.data(options) as Question;
  },
};
