"use client";
import Header from "@components/Header";
import { JoinLeaveGroupButton } from "@components/JoinLeaveGroupButton";
import { NewQuestionDetails } from "@components/NewQuestionDetails";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import { ArrowBack } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  joinQuestionGroup,
  leaveQuestionGroup,
} from "@services/client/question";
import Link from "next/link";
import React from "react";

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

  const backUrl = `/private/course/${courseId}/queue`;
  const { isUserTA, question, isLoading } = useQuestionAccessCheck(
    questionId,
    backUrl
  );
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
  console.log("joinGroup", inGroup);
  return (
    <Box>
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
        fromTAQueue={isUserTA}
      /> */}
      <Box sx={{ padding: "8px" }}>
        {isUserTA ? (
          <NewQuestionDetails question={question} showGroup />
        ) : (
          <NewQuestionDetails
            question={question}
            showGroup
            buttons={
              question.questionPublic && (
                <JoinLeaveGroupButton
                  question={question}
                  inGroup={inGroup}
                  onJoinGroup={throttledOnJoinGroup}
                />
              )
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default Page;
