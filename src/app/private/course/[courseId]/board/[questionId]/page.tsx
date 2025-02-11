"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { ArrowBack } from "@mui/icons-material";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import Link from "next/link";

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
  const backUrl = `/private/course/${courseId}/board`;
  const { question, isLoading } = useQuestionAccessCheck(questionId, backUrl);

  if (!question || isLoading) {
    return null;
  }

  return (
    <div>
      <Header
        leftIcon={
          <Link href={backUrl}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
      />
      <QuestionDetails
        courseId={courseId}
        question={question}
        fromTAQueue={false}
      />
    </div>
  );
};

export default Page;
