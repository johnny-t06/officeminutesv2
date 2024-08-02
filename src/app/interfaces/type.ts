import { Course, Question } from "./db";

type Identifiable<T extends Object> = {
  id: string;
} & T;

export type IdentifiableCourse = Identifiable<Course>;

export type IdentifiableQuestion = Identifiable<Question>;

export type IdentifiableQuestions = IdentifiableQuestion[];
