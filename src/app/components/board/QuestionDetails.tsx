"use client";

import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Avatar, Box, Typography } from "@mui/material";
import {
  formatTimeDifference,
  getUserSessionOrRedirect,
  hasPassed,
  trimUserName,
} from "@utils/index";
import React from "react";
import theme from "theme";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { getUsers } from "@services/client/user";
import {
  joinQuestionGroup,
  leaveQuestionGroup,
  updateQuestion,
} from "@services/client/question";
import Spinner from "@components/Spinner";
import { CustomButton } from "@components/buttons/CustomButton";
import { QuestionState } from "@interfaces/db";
import { useRouter } from "next/navigation";

interface QuestionDetailsProps {
  question: IdentifiableQuestion;
  courseId: string;
  fromTAQueue: boolean;
}

export const QuestionDetails = (props: QuestionDetailsProps) => {
  const { question, courseId, fromTAQueue } = props;
  const user = getUserSessionOrRedirect();
  const router = useRouter();

  const [joinGroup, setJoinGroup] = React.useState<boolean>(
    question.group.includes(user.id)
  );

  const [loading, setLoading] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, [question]);

  React.useEffect(() => {
    setJoinGroup(question.group.includes(user.id));
  }, [question.group]);

  const onJoinGroup = async () => {
    if (joinGroup) {
      await leaveQuestionGroup(question, courseId, user.id);
      setUsers(users.filter((member) => member.id !== user.id));
    } else {
      await joinQuestionGroup(question, courseId, user.id);
      setUsers([...users, user]);
    }
    setJoinGroup(!joinGroup);
  };

  return (
    <Box>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <Spinner />
        </div>
      ) : (
        <>
          <Box
            marginTop="24px"
            height="48px"
            display="flex"
            flexDirection="row"
            gap="16px"
            alignItems="center"
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
          {fromTAQueue ? (
            <Box
              marginTop="8px"
              sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <CustomButton
                variant="contained"
                customColor={theme.palette.primary.main}
                sx={{
                  marginTop: "16px",
                  paddingY: "10px",
                  paddingX: "24px",
                  borderRadius: "32px",
                  textTransform: "none",
                  width: "100%",
                }}
                onClick={async () => {
                  const inProgressQuestion = {
                    ...question,
                    state: QuestionState.IN_PROGRESS,
                  };
                  await updateQuestion(inProgressQuestion, courseId);
                  router.push(`/private/course/${courseId}/queue`);
                }}
              >
                Start helping
              </CustomButton>
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
              >
                Mark as missing
              </CustomButton>
            </Box>
          ) : (
            <Box
              marginTop="8px"
              display={hasPassed(question) ? "none" : "flex"}
            >
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
                onClick={onJoinGroup}
              >
                {joinGroup ? "Leave group" : "Join group"}
              </CustomButton>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
