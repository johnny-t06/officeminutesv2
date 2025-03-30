import { defaultQuestion } from "@api/question";
import { Announcement, QuestionState, Tags } from "@interfaces/db";
import {
  IdentifiableQuestion,
  IdentifiableQuestions,
  IdentifiableUser,
} from "@interfaces/type";
import { DocumentChange, DocumentData, Timestamp } from "firebase/firestore";

export const trimUserName = (user: IdentifiableUser | undefined | null) => {
  if (user === undefined || user === null) {
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

export const compareAnnouncements = (
  announcement1: Announcement,
  announcement2: Announcement
) => {
  const date1 =
    announcement1.createdAt instanceof Timestamp
      ? announcement1.createdAt.toDate()
      : new Date();
  const date2 =
    announcement2.createdAt instanceof Timestamp
      ? announcement2.createdAt.toDate()
      : new Date();
  return compareDate(date1, date2);
};

export const sortAnnouncements = (announcements: Announcement[]) => {
  return announcements.toSorted(compareAnnouncements);
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

export const getActiveQuestionsByState = (questions: IdentifiableQuestions) => {
  const activeQuestions = Object.groupBy(
    getActiveQuestions(questions),
    ({ state }) => state
  );
  return {
    [QuestionState.PENDING]: activeQuestions[QuestionState.PENDING] ?? [],
    [QuestionState.IN_PROGRESS]:
      activeQuestions[QuestionState.IN_PROGRESS] ?? [],
    [QuestionState.MISSING]: activeQuestions[QuestionState.MISSING] ?? [],
  };
};

export const getExpiredQuestions = (
  questions: IdentifiableQuestions,
  isPublic: boolean = true
) =>
  questions.filter(
    (question) => hasPassed(question) && question.questionPublic === isPublic
  );

export const timeSince = (timestamp: Timestamp | undefined) => {
  if (timestamp === undefined || timestamp === null) {
    return "00:00";
  }
  const date = timestamp.toDate();
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const totalSeconds = Math.floor(diffInMs / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

/*
  currQuestion: First active question (pending/in progress/missing)
  privQuestion: First pending private question
  groupQuestion: First pending group question
*/
export const getQueuePosition = (
  questions: IdentifiableQuestions,
  user: IdentifiableUser
) => {
  const activeQuestions = getActiveQuestions(questions);
  const sortedActiveQuestions = sortQuestionsChronologically(activeQuestions);
  const sortedPendingQuestions = sortedActiveQuestions.filter(
    (q) => q.state === QuestionState.PENDING
  );
  const position = sortedActiveQuestions.findIndex((q) =>
    q.group.includes(user.id)
  );
  const privPos = sortedPendingQuestions.findIndex(
    (q) => !q.questionPublic && q.group.includes(user.id)
  );
  const groupPos = sortedPendingQuestions.findIndex(
    (q) => q.questionPublic && q.group.includes(user.id)
  );
  const pendingPos = sortedPendingQuestions.findIndex(
    (q) => q.group[0] === user.id
  );

  return {
    queuePos: pendingPos,
    privPos: privPos,
    groupPos: groupPos,
    currQuestion: sortedActiveQuestions[position] ?? defaultQuestion(),
    privQuestion: sortedPendingQuestions[privPos] ?? defaultQuestion(),
    groupQuestion: sortedPendingQuestions[groupPos] ?? defaultQuestion(),
  };
};

// todo(nickbar01234): Why does always doc.doc.data() have type "Added"
export const groupDocChangesByType = <T>(
  docs: DocumentChange<T, DocumentData>[]
) =>
  Object.groupBy(
    docs.map((doc) => ({ ...doc.doc.data(), id: doc.doc.id, type: doc.type })),
    ({ type }) => type
  );

export const getEmailTemplate = (type: string, email: string) => {
  switch (type) {
    case "TOP_QUEUE":
      return {
        email,
        subject: "You are at the top of the queue!",
        body: "You will receive another notification when a TA is ready to help.",
      };
    case "TA_LEADER_READY":
      return {
        email,
        subject: "The TAs are ready to help!",
        body: "The TAs are ready to help you now! Please listen for your name.",
      };
    case "TA_MEMBER_READY":
      return {
        email,
        subject: "The TAs are ready to help!",
        body: "The TAs are ready to help a group that you joined! Please listen for your group.",
      };
    case "STUDENT_MISSING":
      return {
        email,
        subject: "You are marked as missing from the queue!",
        body: "Please let the TA know when you are back.",
      };
    case "GROUP_MISSING":
      return {
        email,
        subject: "Your group is marked as missing from the queue!",
        body: "Please let the TA know.",
      };
    default:
      return {
        email,
        subject: "",
        body: "",
      };
  }
};

export const getCourseTopicTags = (tags: Tags, tagKey: string): string[] => {
  return (tags[tagKey].options ?? []).map((option) => option.choice);
};
