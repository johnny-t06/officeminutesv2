import { Course, Feedback, Question, User } from "./db";

type Identifiable<T extends Object> = {
  id: string;
} & T;

export type IdentifiableCourse = Identifiable<Course>;

export type IdentifiableCourses = IdentifiableCourse[];

export type IdentifiableFeedback = Identifiable<Feedback>;

export type IdentifiableFeedbacks = IdentifiableFeedback[];

export type IdentifiableQuestion = Identifiable<Question>;

export type IdentifiableQuestions = IdentifiableQuestion[];

export type IdentifiableUser = Identifiable<User>;

export type IdentifiableUsers = Identifiable<User>[];
