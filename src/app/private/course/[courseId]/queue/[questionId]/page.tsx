"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useCourseData } from "@hooks/useCourseData";
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
  const { questions } = useOfficeHour();
  const question = questions.find((q) => q.id === questionId);
  const { isUserTA } = useCourseData({ fetchUsers: false });
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
