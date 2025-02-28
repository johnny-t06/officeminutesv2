import { CustomButton } from "@components/buttons/CustomButton";
import { useLoading } from "@context/LoadingContext";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { QuestionState } from "@interfaces/db";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Avatar, Box, Link, Typography } from "@mui/material";
import { getUsers } from "@services/client/user";
import {
  formatTimeDifference,
  hasPassed,
  isTimestampEqual,
  trimUserName,
} from "@utils/index";
import React from "react";
import theme from "theme";

interface QuestionProps {
  question: IdentifiableQuestion;
  isUserTA: boolean;
}

const Question = (props: QuestionProps) => {
  const { question, isUserTA } = props;

  const user = useUserOrRedirect();
  const { setLoading } = useLoading();

  const [users, setUsers] = React.useState<IdentifiableUsers>([]);
  const [joinGroup] = React.useState<boolean>(
    question.group.includes(user!.id)
  );
  const tagsToRender = isUserTA ? question.tags : question.tags.slice(0, -1);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const beingHelped = question.state === QuestionState.IN_PROGRESS;

  return (
    <Link href={`${window.location.pathname}/${question.id}`} underline="none">
      <Box
        sx={{
          backgroundColor: "#F2F3FA",
          outlineColor: beingHelped ? theme.palette.primary.main : null,
          outlineStyle: beingHelped ? "solid" : null,
          outlineWidth: "2px",
        }}
        padding="16px"
        borderRadius="8px"
      >
        <Box
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
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {question.description.map((line, index, arr) => (
              <React.Fragment key={index}>
                <br />
                {!isTimestampEqual(line.timestamp, question.timestamp) &&
                  line.text !== "" && (
                    <span style={{ color: "#8E8E93" }}>
                      {" "}
                      ({line.timestamp.toDate().toLocaleTimeString()})
                    </span>
                  )}
                <br />
                {line.text}
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box marginTop="32px">
          <Box display="flex" columnGap="16px" rowGap="8px" flexWrap="wrap">
            {tagsToRender.map((tag) => (
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
          marginTop="16px"
          display={hasPassed(question) || isUserTA ? "none" : "flex"}
          justifyContent="flex-end"
        >
          <CustomButton
            variant="contained"
            customColor={
              joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main
            }
            sx={{
              paddingY: "10px",
              paddingX: "24px",
              borderRadius: "32px",
              color: joinGroup ? "#000" : "#fff",
              textTransform: "none",
              marginTop: "16px",
            }}
          >
            {joinGroup ? "Leave group" : "Join group"}
          </CustomButton>
        </Box>
      </Box>
    </Link>
  );
};

export default Question;
