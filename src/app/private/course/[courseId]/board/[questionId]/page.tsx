"use client";
import { QuestionDetails } from "@components/board/QuestionDetails";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NewQuestionDetails } from "@components/NewQuestionDetails";
import React from "react";
import {
  joinQuestionGroup,
  leaveQuestionGroup,
} from "@services/client/question";
import theme from "theme";
import { CustomButton } from "@components/buttons/CustomButton";
import { Box } from "@mui/material";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { hasPassed } from "@utils/index";
import { JoinLeaveGroupButton } from "@components/JoinLeaveGroupButton";

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
  const { questions } = useOfficeHour();
  const question = questions.find((q) => q.id === questionId);
  const router = useRouter();

  if (!question) {
    router.push(`/private/course/${courseId}/board`);
    return;
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
          <Link href={`/private/course/${courseId}/board`}>
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
