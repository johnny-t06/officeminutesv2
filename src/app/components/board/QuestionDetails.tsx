"use client";

import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Avatar, Box, Typography } from "@mui/material";
import {
  formatTimeDifference,
  getEmailTemplate,
  hasPassed,
  trimUserName,
} from "@utils/index";
import React from "react";
import theme from "theme";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { getUser, getUsers } from "@services/client/user";
import {
  getBatchedQuestions,
  joinQuestionGroup,
  leaveQuestionGroup,
  partialUpdateQuestion,
} from "@services/client/question";
import { CustomButton } from "@components/buttons/CustomButton";
import { QuestionState } from "@interfaces/db";
import { useRouter } from "next/navigation";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { sendEmail } from "@api/send-email/route.client";

interface QuestionDetailsProps {
  question: IdentifiableQuestion;
  courseId: string;
  fromTAQueue?: boolean;
  fromCurrentlyHelping?: boolean;
  fromStudentCurrentHelping?: boolean;
}

export const QuestionDetails = (props: QuestionDetailsProps) => {
  const {
    question,
    courseId,
    fromTAQueue = false,
    fromCurrentlyHelping = false,
    fromStudentCurrentHelping = false,
  } = props;

  const user = useUserOrRedirect();
  const router = useRouter();

  const [joinGroup, setJoinGroup] = React.useState<boolean>(
    question.group.includes(user!.id)
  );
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [question]);

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

  const onMissingRemove = async () => {
    if (question.state === QuestionState.PENDING) {
      await sendTopUserNotif();
      await sendEmail(
        getEmailTemplate("STUDENT_MISSING", users[0]?.email ?? "")
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

  const onStartHelpingGroup = async () => {
    await sendTopUserNotif();
    await partialUpdateQuestion(question.id, courseId, {
      state: QuestionState.IN_PROGRESS,
      helpedBy: user.id,
      helpedAt: serverTimestamp(),
    });
    users.forEach(async (user, index) => {
      if (index === 0) {
        await sendEmail(getEmailTemplate("TA_LEADER_READY", user.email));
      } else {
        await sendEmail(getEmailTemplate("TA_MEMBER_READY", user.email));
      }
    });
    router.push(`/private/course/${courseId}/queue`);
  };

  const { fn: throttledOnJoinGroup } = useApiThrottle({
    fn: onJoinGroup,
  });

  const { fn: throttledOnMissingRemove } = useApiThrottle({
    fn: onMissingRemove,
  });

  const { fn: throttledOnStartHelpingGroup } = useApiThrottle({
    fn: onStartHelpingGroup,
  });

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

  const questionInProgess = question.state === QuestionState.IN_PROGRESS;
  const questionMissing = question.state === QuestionState.MISSING;
  const currentHelping = fromCurrentlyHelping || fromStudentCurrentHelping;

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: currentHelping ? "#F2F3FA" : "",
          borderRadius: currentHelping ? "12px" : "",
          padding: currentHelping ? "12px" : "",
        }}
      >
        <Box
          height="48px"
          display="flex"
          flexDirection="row"
          gap="16px"
          alignItems="center"
          sx={{
            marginTop: currentHelping ? "" : "24px",
          }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {trimUserName(users[0])[0]}
          </Avatar>
          <Box>
            <Typography
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#191C20",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {trimUserName(users[0])}
            </Typography>
            <Typography
              style={{
                fontSize: 14,
                color: "#43474E",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {formatTimeDifference(question)}
            </Typography>
          </Box>
        </Box>
        <Box marginTop="28px" fontWeight={400}>
          <Typography
            style={{
              fontSize: 16,
              color: "#191C20",
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontWeight: 500,
            }}
          >
            {question.title}
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              marginTop: "8px",
              color: "#43474E",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {question.description}
          </Typography>
        </Box>
        <Box marginTop="32px">
          <Box display="flex" columnGap="16px" rowGap="8px" flexWrap="wrap">
            {question.tags.map((tag) => (
              <Box
                key={tag.choice}
                border={1}
                borderColor="#73777F"
                borderRadius="10px"
                paddingY="4px"
                paddingX="14px"
                color="#43474E"
              >
                <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                  {tag.choice}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          marginTop="8px"
          display={"flex"}
          flexDirection={"row"}
          alignItems="center"
        >
          <PeopleAltIcon style={{ marginRight: 4 }} />
          <Typography
            sx={{ fontSize: 14, color: theme.palette.text.secondary }}
          >
            {users.map(trimUserName).join(", ")}&nbsp;
            {users.length === 1 ? "is" : "are"} in this group.
          </Typography>
        </Box>
      </Box>
      {fromCurrentlyHelping ? (
        <Box marginTop="8px" display={hasPassed(question) ? "none" : "flex"}>
          <CustomButton
            variant="contained"
            customColor={theme.palette.primary.main}
            sx={{
              marginTop: "4px",
              paddingY: "10px",
              paddingX: "24px",
              borderRadius: "32px",
              textTransform: "none",
              width: "100%",
            }}
            onClick={async () => {
              await partialUpdateQuestion(question.id, courseId, {
                state: QuestionState.RESOLVED,
              });
            }}
          >
            Mark as done
          </CustomButton>
        </Box>
      ) : fromTAQueue ? (
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
            onClick={throttledOnStartHelpingGroup}
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
              onClick={throttledOnMissingRemove}
            >
              {questionMissing ? "Resolve or remove" : "Mark as missing"}
            </CustomButton>
          )}
        </Box>
      ) : fromStudentCurrentHelping ? null : (
        <Box marginTop="8px" display={hasPassed(question) ? "none" : "flex"}>
          <CustomButton
            variant="contained"
            customColor={
              joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main
            }
            sx={{
              marginTop: "16px",
              paddingY: "10px",
              paddingX: "24px",
              borderRadius: "32px",
              textTransform: "none",
              width: "100%",
              color: joinGroup ? "#000" : "#fff",
            }}
            onClick={throttledOnJoinGroup}
          >
            {joinGroup ? "Leave group" : "Join group"}
          </CustomButton>
        </Box>
      )}
    </Box>
  );
};
