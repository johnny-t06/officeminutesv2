"use client";
import Header from "@components/Header";
import { JoinLeaveGroupButton } from "@components/JoinLeaveGroupButton";
import { QuestionDetails } from "@components/QuestionDetails";
import { TAQuestionButtons } from "@components/TAQuestionButtons";
import { useQuestionAccessCheck } from "@hooks/oh/useQuestionAccessCheck";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
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
  const user = useUserOrRedirect();
  const backUrl = `/private/course/${courseId}/queue`;
  const { question, isLoading, isUserTA } = useQuestionAccessCheck(
    questionId,
    backUrl
  );

  const inGroup = question?.group.includes(user!.id) ?? false;

  const onJoinGroup = async () => {
    if (inGroup) {
      await leaveQuestionGroup(question!, courseId, user!.id);
    } else {
      await joinQuestionGroup(question!, courseId, user!.id);
    }
  };

  const { fn: throttledOnJoinGroup } = useApiThrottle({ fn: onJoinGroup });

  if (!user || !question || isLoading) {
    return null;
  }

  return (
    <Box>
      <Header
        leftIcon={
          <Link href={backUrl}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
      />

      <Box sx={{ padding: "8px" }}>
        {isUserTA ? (
          <QuestionDetails
            question={question}
            showGroup
            buttons={
              <TAQuestionButtons courseId={courseId} question={question} />
            }
          />
        ) : (
          <QuestionDetails
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
