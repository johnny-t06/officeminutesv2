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
}

export interface Announcement {
  message: string;
  createdAt: Timestamp;
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
  announcements: Announcement[];
  isOpen: boolean;
}

export enum QuestionState {
  PENDING = 1,
  IN_PROGRESS,
  RESOLVED,
  MISSING,
}

export interface Question {
  title: string;
  description: string;
  questionPublic: boolean;
  state: QuestionState;
  timestamp: Timestamp;
  group: string[];
  tags: TagOption[];
  helpedBy: string;
  helpedAt: Timestamp;
}

export type Questions = Question[];

export interface Feedback {
  recommendation: number;
  feedback: string;
  timestamp: Timestamp;
}
