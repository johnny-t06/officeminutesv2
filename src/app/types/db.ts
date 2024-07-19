import { CollectionReference } from "firebase/firestore";

//  TODO (lnguyen2693) - discuss and complete User interface and converter
export interface User {
  name: string;
  tufts_username: string;
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
  TAs: string[];
  onDuty: string[];
  tags: Tags;
  questions?: CollectionReference;
}

export interface Question {
  title: string;
  description: string;
  public: boolean;
  // should state be enum or boolean or string?
  state: string;
  timestamp: Date;
  group: [string];
  tags: [{ choice: string; color: string; colorFill: boolean }];
}
