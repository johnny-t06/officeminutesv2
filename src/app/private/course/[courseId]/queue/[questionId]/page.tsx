"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import GlobalLoading from "@components/GlobalLoading";
import Header from "@components/Header";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import { ArrowBack } from "@mui/icons-material";
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
  const backUrl = `/private/course/${courseId}/queue`;
  const { isUserTA, question, isLoading } = useQuestionAccessCheck(
    questionId,
    backUrl
  );

  if (isLoading) {
    <GlobalLoading />;
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
        fromTAQueue={isUserTA}
      />
    </div>
  );
};

export default Page;
