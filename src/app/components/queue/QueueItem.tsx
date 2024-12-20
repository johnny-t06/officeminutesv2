import { IdentifiableQuestion } from "@interfaces/type";
import { Grid, Stack, Typography } from "@mui/material";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { trimName } from "@utils/index";

interface QueueItemProps {
  order: number;
  question: IdentifiableQuestion;
}

const QueueItem = (props: QueueItemProps) => {
  const { order, question } = props;
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
          {question.group.map(trimName).join(", ")}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <ArrowRightOutlinedIcon sx={{ color: "#49454F" }} />
      </Grid>
    </Grid>
  );
};

export default QueueItem;
