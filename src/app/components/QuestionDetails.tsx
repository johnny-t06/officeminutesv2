"use client";

import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Avatar, Box, Typography } from "@mui/material";
import {
  formatTimeDifference,
  trimUserName,
  isTimestampEqual,
  getCourseTopicTags,
} from "@utils/index";
import React from "react";
import theme from "theme";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { getUsers } from "@services/client/user";

interface QuestionDetailsProps {
  question: IdentifiableQuestion;
  showGroup?: boolean;
  buttons?: React.ReactNode;
}

export const QuestionDetails = (props: QuestionDetailsProps) => {
  const { question, showGroup = false, buttons } = props;
  const user = useUserOrRedirect();
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

  return (
    <Box>
      <Box>
        <Box height="48px" display="flex" flexDirection="row" gap="16px" alignItems="center">
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{trimUserName(users[0])[0]}</Avatar>
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
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {question.description.map((line, index, arr) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                {line.text}
                {!isTimestampEqual(line.timestamp, question.timestamp) && (
                  <span style={{ color: "#8E8E93" }}>
                    {" "}
                    ({line.timestamp.toDate().toLocaleTimeString()})
                  </span>
                )}
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box marginTop="32px">
          <Box display="flex" columnGap="8px" rowGap="8px" flexWrap="wrap">
            {getCourseTopicTags(question.tags).map((tag) => (
              <Box
                key={tag}
                border={1}
                borderColor="#73777F"
                borderRadius="8px"
                paddingY="4px"
                paddingX="14px"
                color="#43474E"
              >
                <Typography sx={{ fontWeight: 500, fontSize: 14 }}>{tag}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {showGroup && (
          <Box marginTop="12px" display={"flex"} flexDirection={"row"} alignItems="center">
            <PeopleAltIcon style={{ marginRight: 4 }} />
            <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary }}>
              {users.map(trimUserName).join(", ")}&nbsp;
              {users.length === 1 ? "is" : "are"} in this group.
            </Typography>
          </Box>
        )}
      </Box>
      {buttons}
    </Box>
  );
};
