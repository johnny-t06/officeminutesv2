import { IdentifiableQuestions } from "@interfaces/type";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Grid, Stack, Typography } from "@mui/material";
import QueueItem from "./QueueItem";

interface QueueListProps {
  header: string;
  displayEnqueued: boolean;
  questions: IdentifiableQuestions;
}

const QueueList = (props: QueueListProps) => {
  const { header, displayEnqueued, questions } = props;

  if (questions.length === 0) {
    return null;
  }

  return (
    <Box>
      <Grid
        container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Typography
            color="#545F70"
            fontWeight={700}
            fontSize={18}
            component="h2"
          >
            {header}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          columnGap="4px"
          paddingLeft="8px"
          visibility={displayEnqueued ? "visible" : "hidden"}
        >
          <PersonOutlineOutlined fontSize="small" />
          <Typography fontWeight={500}>{questions.length}</Typography>
        </Grid>
      </Grid>
      <Stack spacing="8px" marginTop="16px">
        {questions.map((question, index) => (
          <QueueItem key={question.id} order={index + 1} question={question} />
        ))}
      </Stack>
    </Box>
  );
};

export default QueueList;
