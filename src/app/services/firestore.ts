import { Course, Question } from "@interfaces/db";
import {
  DocumentData,
  QueryDocumentSnapshot,
  PartialWithFieldValue,
} from "firebase/firestore";

export const courseConverter = {
  toFirestore(course: PartialWithFieldValue<Course>): DocumentData {
    return {
      name: course.name,
      location: course.location,
      professors: course.professors,
      students: course.students,
      tas: course.tas,
      onDuty: course.onDuty,
      tags: course.tags,
      // questions: course.questions,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Course {
    const data = snapshot.data(options);
    if (!data) {
      throw new Error("No data found in snapshot");
    }
    return {
      name: data.name,
      location: data.location,
      professors: data.professors,
      students: data.students,
      tas: data.tas,
      onDuty: data.onDuty,
      tags: data.tags,
      // questions: data.questions,
    } as Course;
  },
};

export const questionConverter = {
  toFirestore(question: PartialWithFieldValue<Question>): DocumentData {
    return {
      title: question.title,
      description: question.description,
      public: question.public,
      state: question.state,
      timestamp: question.timestamp,
      group: question.group,
      tags: question.tags,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Question {
    const data = snapshot.data(options);
    if (!data) {
      throw new Error("No data found in snapshot");
    }
    return {
      title: data.title,
      description: data.description,
      public: data.public,
      state: data.state,
      timestamp: data.timestamp,
      group: data.group,
      tags: data.tags,
    } as Question;
  },
};
