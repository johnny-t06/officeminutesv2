"use client";
import Header from "@components/Header";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import { QuestionDetails } from "@components/QuestionDetails";

interface PageProps {
  params: {
    courseId: string;
    questionId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId, questionId },
  } = props;
  const backUrl = `/private/course/${courseId}/board/history`;
  const { question, isLoading } = useQuestionAccessCheck(
    questionId,
    backUrl,
    true
  );

  if (!question || isLoading) {
    return null;
  }

  return (
    <div>
      <Header
        leftIcon={
          <Link href={backUrl}>
            <ArrowBack sx={{ marginLeft: "-10px", color: "#000" }} />
          </Link>
        }
      />
      <QuestionDetails question={question} showGroup={true} />
    </div>
  );
};

export default Page;
