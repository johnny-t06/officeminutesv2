import { addQuestion } from "@services/client/question";
import { useUserSession } from "@context/UserSessionContext";
import { QuestionState } from "@interfaces/db";
import { IdentifiableQuestion, IdentifiableQuestions } from "@interfaces/type";
import { Timestamp } from "firebase/firestore";
import { redirect } from "next/navigation";

export const trimName = (name: string) => {
  if (name === undefined) {
    return "";
  }
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
  question: IdentifiableQuestion
): string => {
  const date = question.timestamp.toDate();

  if (hasPassed(question)) {
    return date.toLocaleDateString();
  }

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
    title: "",
    description: "",
    questionPublic: false,
    state: QuestionState.PENDING,
    timestamp: Timestamp.now(),
    group: [],
    tags: [],
  } as IdentifiableQuestion;
};

export const createQuestion = (
  title: string,
  description: string,
  questionPublic: boolean,
  timestamp: Timestamp,
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
/**
 * A question has "expired" if it's a different date or it's been resolved
 */
export const hasPassed = (question: IdentifiableQuestion) => {
  const postedAt = question.timestamp.toDate().setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  return now > postedAt || question.state === QuestionState.RESOLVED;
};

export const getActiveQuestions = (
  questions: IdentifiableQuestions,
  isPublic: boolean = true
) =>
  questions.filter(
    (question) => !hasPassed(question) && question.questionPublic === isPublic
  );

export const getActiveQuestionsByState = (
  questions: IdentifiableQuestions,
  isPublic: boolean = true
) => {
  const activeQuestions = Object.groupBy(
    getActiveQuestions(questions, isPublic),
    ({ state }) => state
  );
  return {
    [QuestionState.PENDING]: activeQuestions[QuestionState.PENDING] ?? [],
    [QuestionState.IN_PROGRESS]:
      activeQuestions[QuestionState.IN_PROGRESS] ?? [],
  };
};

export const getExpiredQuestions = (
  questions: IdentifiableQuestions,
  isPublic: boolean = true
) =>
  questions.filter(
    (question) => hasPassed(question) && question.questionPublic === isPublic
  );

export const getUserSessionOrRedirect = () => {
  const { user } = useUserSession();
  if (user === null) {
    redirect("/");
  }
  return user;
};
