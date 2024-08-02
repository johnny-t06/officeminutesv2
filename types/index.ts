export enum Status {
  WAITING,
  IN_PROGRESS,
  DONE,
}

export interface OfficeHour {
  questions: Question[];
  tas: Student[];
  location: string;
}

export interface Student {
  name: string;
  id: string;
}

export interface Question {
  question: string;
  tags: string[];
  students: Student[];
  description: String;
  private: boolean;
  status: Status;
  time: String;
}
