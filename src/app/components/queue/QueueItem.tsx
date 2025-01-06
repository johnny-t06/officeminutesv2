import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { Grid, Typography } from "@mui/material";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { trimUserName } from "@utils/index";
import React from "react";
import { getUsers } from "@services/client/user";

interface QueueItemProps {
  order: number;
  question: IdentifiableQuestion;
}

const QueueItem = (props: QueueItemProps) => {
  const { order, question } = props;
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);
  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [question]);
  return (
    <Grid container columnSpacing="2px" alignItems="center">
      <Grid item xs={1}>
        <Typography color="#545F70" fontWeight={700} fontSize="16px">
          {order}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          fontSize="16px"
          color="#191C20"
          noWrap
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {question.title}
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
      <Grid item xs={1}>
        <ArrowRightOutlinedIcon sx={{ color: "#49454F" }} />
      </Grid>
    </Grid>
  );
};

export default QueueItem;
