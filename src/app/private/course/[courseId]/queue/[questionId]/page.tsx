"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
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
  const { course, questions } = useOfficeHour();
  const user = useUserOrRedirect();
  if (!user) {
    return null;
  }
  const isUserTA = course.tas.includes(user.id);
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    throw new Error();
  }

  return (
    <div>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/queue`}>
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
