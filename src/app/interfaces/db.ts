import { Timestamp } from "firebase/firestore";

//  TODO (lnguyen2693) - discuss and complete User interface and converter
export interface User {
  name: string;
  tufts_username: string;
  email: string;
  role: string;
  courses: string[];
}

export interface Tags {
  [key: string]: {
    options: TagOption[];
    required: boolean;
    multipleChoice: boolean;
    priority: number;
  };
}

export interface TagOption {
  choice: string;
  note: string;
  color: string;
  colorFill: boolean;
}

export interface Course {
  name: string;
  code: string;
  location: string;
  professors: string[];
  students: string[];
  tas: string[];
  onDuty: string[];
  tags: Tags;
  announcement: string;
}

export enum QuestionState {
  PENDING = 1,
  IN_PROGRESS,
  RESOLVED,
}

export interface Question {
  title: string;
  description: string;
  questionPublic: boolean;
  state: QuestionState;
  timestamp: Timestamp;
  group: string[];
  tags: TagOption[];
}

export type Questions = Question[];

export interface Feedback {
  recommendation: number;
  feedback: string;
  timestamp: Timestamp;
}
