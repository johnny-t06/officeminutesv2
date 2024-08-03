import { IdentifiableQuestion } from "@interfaces/type";

export const trimName = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return firstName + " " + lastName + ".";
};

export const compareDate = (date1: Date, date2: Date) => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};

export const compareQuestions = (
  question1: IdentifiableQuestion,
  question2: IdentifiableQuestion
) => {
  return compareDate(question1.timestamp, question2.timestamp);
};
