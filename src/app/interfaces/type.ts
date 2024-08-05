import { Course, Question, User } from "./db";

type Identifiable<T extends Object> = {
  id: string;
} & T;

export type IdentifiableCourse = Identifiable<Course>;

export type IdentifiableCourses = IdentifiableCourse[];

export type IdentifiableQuestion = Identifiable<Question>;

export type IdentifiableQuestions = IdentifiableQuestion[];

export type IdentifiableUser = Identifiable<User>;
