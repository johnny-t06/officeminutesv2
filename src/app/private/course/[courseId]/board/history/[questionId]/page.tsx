"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";

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
  const question = questions.find((q) => q.id === questionId);
  const router = useRouter();
  const user = useUserOrRedirect();
  if (!user) {
    return null;
  }
  const isUserTA = course.tas.includes(user.id);

  if (!question) {
    router.push(`/private/course/${courseId}/board/history`);
    return;
  }

  return (
    <div>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/board/history`}>
            <ArrowBack sx={{ marginLeft: "-10px", color: "#000" }} />
          </Link>
        }
      />
      <QuestionDetails
        courseId={courseId}
        question={question}
        fromTAQueue={false}
        isUserTA={isUserTA}
      />
    </div>
  );
};

export default Page;
