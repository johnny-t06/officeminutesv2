"use client";
import Header from "@components/Header";
import { ArrowBack } from "@mui/icons-material";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import Link from "next/link";
import { NewQuestionDetails } from "@components/NewQuestionDetails";
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

  if (!question || isLoading) {
    return null;
  }

  if (hasPassed(question)) {
    router.push(backUrl);
    return null;
  }

  const [joinGroup, setJoinGroup] = React.useState(
    question.group.includes(user!.id)
  );

  if (!user) {
    return null;
  }

  const onJoinGroup = async () => {
    if (joinGroup) {
      await leaveQuestionGroup(question, courseId, user.id);
    } else {
      await joinQuestionGroup(question, courseId, user.id);
    }
    setJoinGroup(!joinGroup);
  };

  const { fn: throttledOnJoinGroup } = useApiThrottle({ fn: onJoinGroup });

  return (
    <div>
      <Header
        leftIcon={
          <Link href={backUrl}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
      />
      {/* <QuestionDetails
        courseId={courseId}
        question={question}
        fromTAQueue={false}
      /> */}
      <NewQuestionDetails
        question={question}
        showGroup
        buttons={
          <JoinLeaveGroupButton
            question={question}
            inGroup={joinGroup}
            onJoinGroup={throttledOnJoinGroup}
          />
        }
      />
    </div>
  );
};

export default Page;
