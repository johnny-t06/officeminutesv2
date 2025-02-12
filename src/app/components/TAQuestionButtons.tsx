"use client";

import { sendEmail } from "@api/send-email/route.client";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { QuestionState } from "@interfaces/db";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Box } from "@mui/material";
import {
  getBatchedQuestions,
  partialUpdateQuestion,
} from "@services/client/question";
import { getUser, getUsers } from "@services/client/user";
import { getEmailTemplate } from "@utils/index";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { CustomButton } from "./buttons/CustomButton";
import React from "react";
import { useRouter } from "next/navigation";
import theme from "theme";
import useApiThrottle from "@hooks/useApiThrottle";

interface TAQuestionButtonsProps {
  courseId: string;
  question: IdentifiableQuestion;
}

export const TAQuestionButtons = (props: TAQuestionButtonsProps) => {
  const { courseId, question } = props;
  const user = useUserOrRedirect();
  const [groupUsers, setGroupUsers] = React.useState<IdentifiableUsers>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(question.group);
      setGroupUsers(fetchedUsers);
    };
    fetchUsers();
  }, [question]);

  if (!user) {
    return null;
  }

  const sendTopUserNotif = async () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const nowTimestamp = Timestamp.fromDate(now);

    const pendingQuestions = await getBatchedQuestions(
      courseId,
      2,
      QuestionState.PENDING,
      nowTimestamp
    );

    if (pendingQuestions.length > 1 && pendingQuestions[0].id === question.id) {
      pendingQuestions[1].group.forEach(async (userId) => {
        const user = await getUser(userId);
        if (user) {
          await sendEmail(getEmailTemplate("TOP_QUEUE", user.email));
        }
      });
    }
  };

  const onStartHelpingGroup = async () => {
    await sendTopUserNotif();
    await partialUpdateQuestion(question.id, courseId, {
      state: QuestionState.IN_PROGRESS,
      helpedBy: user.id,
      helpedAt: serverTimestamp(),
    });
    groupUsers.forEach(async (user, index) => {
      if (index === 0) {
        await sendEmail(getEmailTemplate("TA_LEADER_READY", user.email));
      } else {
        await sendEmail(getEmailTemplate("TA_MEMBER_READY", user.email));
      }
    });
    router.push(`/private/course/${courseId}/queue`);
  };

  const onMissingRemove = async () => {
    if (question.state === QuestionState.PENDING) {
      await sendTopUserNotif();
      await sendEmail(
        getEmailTemplate("STUDENT_MISSING", groupUsers[0]?.email ?? "")
      );
      await partialUpdateQuestion(question.id, courseId, {
        state: QuestionState.MISSING,
      });
    } else if (question.state === QuestionState.MISSING) {
      await partialUpdateQuestion(question.id, courseId, {
        state: QuestionState.RESOLVED,
      });
      router.push(`/private/course/${courseId}/queue`);
    }
  };

  const { fn: throttledOnStartHelpingGroup } = useApiThrottle({
    fn: onStartHelpingGroup,
  });

  const { fn: throttledOnMissingRemove } = useApiThrottle({
    fn: onMissingRemove,
  });

  const questionInProgess = question.state === QuestionState.IN_PROGRESS;
  const questionMissing = question.state === QuestionState.MISSING;

  return (
    <Box
      marginTop="8px"
      sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <CustomButton
        variant="contained"
        customColor={theme.palette.primary.main}
        disabled={questionInProgess}
        sx={{
          marginTop: "16px",
          paddingY: "10px",
          paddingX: "24px",
          borderRadius: "32px",
          textTransform: "none",
          width: "100%",
        }}
        onClick={async () => {
          await throttledOnStartHelpingGroup();
        }}
      >
        {questionInProgess ? "Already in progress" : "Start helping"}
      </CustomButton>

      {!questionInProgess && (
        <CustomButton
          variant="contained"
          customColor={theme.palette.primary.light}
          sx={{
            paddingY: "10px",
            paddingX: "24px",
            borderRadius: "32px",
            textTransform: "none",
            width: "100%",
            color: "#000",
          }}
          onClick={async () => {
            await throttledOnMissingRemove();
          }}
        >
          {questionMissing ? "Resolve or remove" : "Mark as missing"}
        </CustomButton>
      )}
    </Box>
  );
};
