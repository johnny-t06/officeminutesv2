import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { ArrowBack } from "@mui/icons-material";
import { getQuestion } from "@services/client/question";
import Link from "next/link";

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

  return (
    <div>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/board`}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
      />
      <QuestionDetails courseId={courseId} question={convertedQuestion} />
    </div>
  );
};

export default Page;
