import { QuestionDetails } from "@components/board/QuestionDetails";
import { getQuestion } from "@services/client/question";

interface PageProps {
  params: {
    courseId: string;
    questionId: string;
  };
}

const Page = async (props: PageProps) => {
  const {
    params: { courseId, questionId },
  } = props;

  const question = await getQuestion(courseId, questionId);
  const convertedQuestion = {
    ...question,
    timestamp: question.timestamp.toDate(),
  };
  return <QuestionDetails courseId={courseId} question={convertedQuestion} />;
};

export default Page;
