"use client";
import Header from "@components/Header";
import { ArrowBack } from "@mui/icons-material";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import Link from "next/link";
import { QuestionDetails } from "@components/QuestionDetails";
import React from "react";
import {
  joinQuestionGroup,
  leaveQuestionGroup,
} from "@services/client/question";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { JoinLeaveGroupButton } from "@components/JoinLeaveGroupButton";
import { hasPassed } from "@utils/index";
import { useRouter } from "next/navigation";

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
  const user = useUserOrRedirect();
  const backUrl = `/private/course/${courseId}/board`;
  const router = useRouter();
  const { question, isLoading } = useQuestionAccessCheck(questionId, backUrl);

  const [inGroup, setInGroup] = React.useState<boolean>(
    question?.group.includes(user!.id) ?? false
  );

  React.useEffect(() => {
    setInGroup(question?.group.includes(user!.id) ?? false);
  }, [question, user]);

  const onJoinGroup = async () => {
    if (inGroup) {
      await leaveQuestionGroup(question!, courseId, user!.id);
    } else {
      await joinQuestionGroup(question!, courseId, user!.id);
    }
    setInGroup(!inGroup);
  };

  const { fn: throttledOnJoinGroup } = useApiThrottle({ fn: onJoinGroup });
  if (!question || isLoading || !user) {
    return null;
  }

  if (hasPassed(question)) {
    router.push(backUrl);
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
        question={question}
        showGroup
        buttons={
          <JoinLeaveGroupButton
            question={question}
            inGroup={inGroup}
            onJoinGroup={throttledOnJoinGroup}
          />
        }
      />
    </div>
  );
};

export default Page;
