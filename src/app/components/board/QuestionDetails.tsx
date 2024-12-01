"use client";

import Header from "@components/Header";
import { QuestionState } from "@interfaces/db";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import { formatTimeDifference, hasPassed, trimName } from "@utils/index";
import { Timestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import theme from "theme";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { getUsers } from "@services/client/user";
import { updateQuestion } from "@services/client/question";
import { useUserSession } from "@context/UserSessionContext";

interface QuestionDetailsProps {
  question: {
    id: string;
    timestamp: Date;
    title: string;
    description: string;
    public: boolean;
    state: QuestionState;
    group: string[];
    tags: string[];
  };
  courseId: string;
}

export const QuestionDetails = (props: QuestionDetailsProps) => {
  const { question, courseId } = props;
  const { user } = useUserSession();

  const convertedQuestion = {
    ...question,
    timestamp: Timestamp.fromDate(new Date(question.timestamp)),
  } as IdentifiableQuestion;
  const [joinGroup, setJoinGroup] = React.useState<boolean>(
    convertedQuestion.group.includes(user!.id)
  );
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers(convertedQuestion.group);
        console.log("Fetched users:", fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const onJoinGroup = async () => {
    console.log("Users:", users);
    if (joinGroup) {
      await updateQuestion(
        {
          ...convertedQuestion,
          group: convertedQuestion.group.filter((id) => id !== user!.id),
        },
        courseId
      );
      setUsers(users.filter((member) => member.id !== user!.id));
    } else {
      await updateQuestion(
        { ...convertedQuestion, group: [...convertedQuestion.group, user!.id] },
        courseId
      );
      setUsers([...users, user!]);
    }

    setJoinGroup(!joinGroup);
  };

  return users.length === 0 ? (
    <div> loading </div>
  ) : (
    <Box>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/board`}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
      />
      <Box
        marginTop="24px"
        height="48px"
        display="flex"
        flexDirection="row"
        gap="16px"
        alignItems="center"
      >
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          {trimName(users[0].name[0]) ?? ""}
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
            {trimName(users[0].name) ?? ""}
          </Typography>
          <Typography
            style={{
              fontSize: 14,
              color: "#43474E",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {formatTimeDifference(convertedQuestion)}
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
              key={tag}
              border={1}
              borderColor="#73777F"
              borderRadius="10px"
              paddingY="4px"
              paddingX="14px"
              color="#43474E"
            >
              <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                {tag}
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
        <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary }}>
          {users.map((user) => trimName(user.name)).join(", ")}&nbsp;are in this
          group.
        </Typography>
      </Box>
      <Box
        marginTop="8px"
        display={hasPassed(convertedQuestion) ? "none" : "flex"}
      >
        <Button
          variant="contained"
          sx={{
            marginTop: "16px",
            paddingY: "10px",
            paddingX: "24px",
            bgcolor: joinGroup
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            "&:hover": {
              bgcolor: joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            }, // Prevent hover color from changing
            "&:active": {
              bgcolor: joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            }, // Prevent active color from changing
            "&:focus-visible": {
              bgcolor: joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            }, // Prevent focus-visible color from changing
            borderRadius: "32px",
            color: joinGroup ? "#000" : "#fff",
            textTransform: "none",
            width: "100%",
          }}
          onClick={onJoinGroup}
        >
          {joinGroup ? "Leave group" : "Join group"}
        </Button>
      </Box>
    </Box>
  );
};
