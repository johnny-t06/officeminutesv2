import { Course, Feedback, Question, User } from "@interfaces/db";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

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

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return user;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): User {
    return snapshot.data(options) as User;
  },
};

export const feedbackConverter = {
  toFirestore(feedback: Feedback): DocumentData {
    return feedback;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Feedback {
    return snapshot.data(options) as Feedback;
  },
};
