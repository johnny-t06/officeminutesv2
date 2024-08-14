import { FieldValue } from "firebase/firestore";

//  TODO (lnguyen2693) - discuss and complete User interface and converter
export interface User {
  name: string;
  tufts_username: string;
  email: string;
  role: string;
}

interface Tags {
  [key: string]: {
    options: TagOption[];
    required: boolean;
    multipleChoice: boolean;
  };
}

interface TagOption {
  choice: string;
  color: string;
  colorFill: boolean;
}

export interface Course {
  name: string;
  location: string;
  professors: string[];
  students: string[];
  tas: string[];
  onDuty: string[];
  tags: Tags;
}

export enum QuestionState {
  PENDING = 1,
  IN_PROGRESS,
  RESOLVED,
}

export interface Question {
  title: string;
  description: string;
  public: boolean;
  state: QuestionState;
  timestamp: FieldValue;
  group: string[];
  tags: TagOption[];
}

export type Questions = Question[];
