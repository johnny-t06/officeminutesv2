import { useUserSession } from "@context/UserSessionContext";
import { QuestionState } from "@interfaces/db";
import {
  IdentifiableQuestion,
  IdentifiableQuestions,
  IdentifiableUser,
} from "@interfaces/type";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const trimUserName = (user: IdentifiableUser | undefined) => {
  if (user === undefined) {
    return " "; // empty string to prevent error in rendering avatar character
  }
  const [firstName, lastName] = user.name.split(" ");
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

/* Not in place sorting */
export const sortQuestionsChronologically = (
  questions: IdentifiableQuestions
) => {
  return questions.toSorted(compareQuestions);
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

/**
 * A question has "expired" if it's a different date or it's been resolved
 */
export const hasPassed = (question: IdentifiableQuestion) => {
  const postedAt = question.timestamp.toDate().setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  return now > postedAt || question.state === QuestionState.RESOLVED;
};

export const getActiveQuestions = (questions: IdentifiableQuestions) =>
  questions.filter((question) => !hasPassed(question));

export const getActivePublicQuestion = (
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
    getActiveQuestions(questions),
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
  const router = useRouter();
  if (user === null) {
    router.push("/");
  }
  return user;
};
