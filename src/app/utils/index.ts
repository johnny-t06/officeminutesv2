import { Question, QuestionState, TagOption } from "@interfaces/db";
import { IdentifiableQuestion } from "@interfaces/type";
import { addQuestion } from "@services/client/question";
import { FieldValue, serverTimestamp, Timestamp } from "firebase/firestore";

export const trimName = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  if (lastName !== undefined && lastName.length > 0) {
    return firstName + " " + lastName[0];
  } else {
    return firstName;
  }
};

export const compareDate = (date1: Date, date2: Date) => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};

export const compareQuestions = (
  question1: IdentifiableQuestion,
  question2: IdentifiableQuestion
) => {
  const date1 =
    question1.timestamp instanceof Timestamp
      ? question1.timestamp.toDate()
      : new Date();
  const date2 =
    question2.timestamp instanceof Timestamp
      ? question2.timestamp.toDate()
      : new Date();
  return compareDate(date1, date2);
};

export const formatTimeDifference = (
  timestamp: FieldValue | Timestamp
): string => {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date();

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds <= 15) {
    return "a few seconds ago";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes === 1) {
    return "a minute ago";
  } else if (diffInMinutes <= 5) {
    return `${diffInMinutes} minutes ago`;
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const defaultQuestion = () => {
  return {
    id: "",
    title: "abc",
    description: "hahaha",
    questionPublic: true,
    state: QuestionState.PENDING,
    timestamp: serverTimestamp(),
    group: [],
    tags: [
      { choice: "Big O", color: "orange", colorFill: false, note: "" },
      { choice: "Confused", color: "orange", colorFill: false, note: "" },
    ],
  } as IdentifiableQuestion;
};

export const createQuestion = (
  title: string,
  description: string,
  questionPublic: boolean,
  timestamp: FieldValue,
  group: string[],
  tags: TagOption[],
  courseId: string
) => {
  const question: Question = {
    title: title,
    description: description,
    questionPublic: questionPublic,
    state: QuestionState.PENDING,
    timestamp: timestamp,
    group: group,
    tags: tags,
  };

  addQuestion(question, courseId);
};
