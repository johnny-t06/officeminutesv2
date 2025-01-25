"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  if (!question) {
    router.push(`/private/course/${courseId}/board`);
    return;
  }

  return (
    <div>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/board`}>
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
