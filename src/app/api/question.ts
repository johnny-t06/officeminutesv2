import { Question, QuestionState, TagOption } from "@interfaces/db";
import { IdentifiableQuestion } from "@interfaces/type";
import { addQuestion } from "@services/client/question";
import { Timestamp } from "firebase/firestore";

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
    helpedBy: "",
    helpedAt: Timestamp.now(),
  } as IdentifiableQuestion;
};

interface CreateQuestionProps {
  title: string;
  description: string;
  questionPublic: boolean;
  timestamp: Timestamp;
  group: string[];
  tags: TagOption[];
  courseId: string;
}
export const createQuestion = async (props: CreateQuestionProps) => {
  const {
    title,
    description,
    questionPublic,
    timestamp,
    group,
    tags,
    courseId,
  } = props;
  const question: Question = {
    title: title,
    description: description,
    questionPublic: questionPublic,
    state: QuestionState.PENDING,
    timestamp: timestamp,
    group: group,
    tags: tags,
    helpedBy: "",
    helpedAt: timestamp,
  };

  await addQuestion(question, courseId);
};
