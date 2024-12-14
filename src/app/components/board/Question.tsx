import Spinner from "@components/Spinner";
import { useUserSession } from "@context/UserSessionContext";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { getUsers } from "@services/client/user";
import { formatTimeDifference, hasPassed, trimName } from "@utils/index";
import { useRouter } from "next/navigation";
import React from "react";
import theme from "theme";

interface QuestionProps {
  question: IdentifiableQuestion;
}

const Question = (props: QuestionProps) => {
  const { question } = props;
  const router = useRouter();
  const { user } = useUserSession();
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [joinGroup] = React.useState<boolean>(
    question.group.includes(user!.id)
  );

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return loading ? (
    <div className="h-screen absolute top-[50vh] left-[calc(50vw-24px)]">
      <Spinner />
    </div>
  ) : (
    <Box sx={{ backgroundColor: "#F2F3FA" }} padding="16px" borderRadius="8px">
      <Box
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
        marginTop="16px"
        display={hasPassed(question) ? "none" : "flex"}
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          sx={{
            paddingY: "10px",
            paddingX: "24px",
            borderRadius: "32px",
            color: joinGroup ? "#000" : "#fff",
            textTransform: "none",
            marginTop: "16px",
            bgcolor: joinGroup
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            "&:hover": {
              bgcolor: joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            },
            "&:active": {
              bgcolor: joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            },
            "&:focus-visible": {
              bgcolor: joinGroup
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            },
          }}
          onClick={() =>
            router.push(`${window.location.pathname}/${question.id}`)
          }
        >
          {joinGroup ? "Leave group" : "Join group"}
        </Button>
      </Box>
    </Box>
  );
};

export default Question;
