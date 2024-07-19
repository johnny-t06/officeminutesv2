import { Course, Question } from "../types/db";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const courseConverter = {
  toFirestore(course: Course): DocumentData {
    return {
      name: course.name,
      location: course.location,
      professors: course.professors,
      students: course.students,
      TAs: course.TAs,
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
      TAs: data.TAs,
      onDuty: data.onDuty,
      tags: data.tags,
      // questions: data.questions,
    };
  },
};

export const questionConverter = {
  toFirestore(question: Question): DocumentData {
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
    }
  }
};
