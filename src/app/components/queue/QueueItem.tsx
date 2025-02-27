import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Grid, Typography } from "@mui/material";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { trimUserName } from "@utils/index";
import React from "react";
import { getUsers } from "@services/client/user";
import { useRouter } from "next/navigation";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { useLoading } from "@context/LoadingContext";

interface QueueItemProps {
  order: number;
  question: IdentifiableQuestion;
}

const QueueItem = (props: QueueItemProps) => {
  const { order, question } = props;
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);
  const { setLoading } = useLoading();

  const router = useRouter();
  const { course } = useOfficeHour();
  const user = useUserOrRedirect();

  if (!user) {
    return null;
  }
  const isUserTA = course.tas.includes(user.id);

  const isShowDetails =
    isUserTA || question.questionPublic || question.group[0] === user.id;

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, [question]);

  return (
    <Grid
      container
      columnSpacing="2px"
      alignItems="center"
      paddingX="8px"
      onClick={() => {
        if (isShowDetails) {
          router.push(`queue/${question.id}`);
        }
      }}
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <Grid item xs={1}>
        <Typography color="#545F70" fontWeight={700} fontSize="16px">
          {order}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography
          fontSize="16px"
          color="#191C20"
          noWrap
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {isShowDetails ? question.title : "Private"}
        </Typography>
        <Typography
          fontSize="14px"
          color="#43474E"
          noWrap
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {users.map(trimUserName).join(", ")}
        </Typography>
      </Grid>
      <Grid item xs={2} textAlign="center">
        {isShowDetails ? (
          <ArrowRightOutlinedIcon sx={{ color: "#49454F" }} />
        ) : (
          <LockOutlinedIcon sx={{ color: "#49454F", fontSize: "18px" }} />
        )}
      </Grid>
    </Grid>
  );
};

export default QueueItem;
