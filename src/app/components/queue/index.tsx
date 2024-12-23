import { Box, Fab, Stack, Typography } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useOfficeHourStore } from "@providers/OfficeHourProvider";
import { QuestionState } from "@interfaces/db";
import { getActiveQuestionsByState } from "@utils/index";
import QueueList from "./QueueList";

const Queue = () => {
  const course = useOfficeHourStore((state) => state.course);
  const questions = useOfficeHourStore((state) => state.questions);
  const {
    [QuestionState.PENDING]: pendingQuestions,
    [QuestionState.IN_PROGRESS]: inProgressQuestions,
  } = getActiveQuestionsByState(questions);

  const studentsEnqueued = pendingQuestions.length + inProgressQuestions.length;
  const queueClosed = course?.onDuty.length === 0;

  return (
    <>
      <Box>
        <Stack spacing="36px" display={queueClosed ? "none" : "block"}>
          <QueueList
            header="Currently Helping"
            displayEnqueued={false}
            questions={inProgressQuestions}
          />
          <QueueList
            header="Queue"
            displayEnqueued
            questions={pendingQuestions}
          />
        </Stack>
        {queueClosed ? (
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            marginTop="200px"
            color="#545F70"
            fontWeight={400}
          >
            <Typography fontSize={16}>The queue is not opened yet.</Typography>
            <Typography fontSize={16}>
              Visit Piazza if your TA is not present.
            </Typography>
          </Box>
        ) : studentsEnqueued === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            marginTop="200px"
            color="#545F70"
            fontWeight={400}
          >
            <Typography fontSize={16}>No one is on the queue yet.</Typography>
            <Typography fontSize={16}>
              Get help from a TA by joining the queue.
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box position="fixed" bottom={80} right={10}>
        <Fab
          aria-label="Join queue"
          variant="extended"
          color="primary"
          sx={{
            bgcolor: queueClosed ? "#545F70" : "",
            color: "#FFF",
            textTransform: "none",
            paddingY: "18px",
            paddingX: "16px",
            borderRadius: "16px",
            minHeight: "56px",
          }}
          disabled={queueClosed}
        >
          <ArrowForwardOutlinedIcon sx={{ marginRight: "12px" }} />
          <Typography fontWeight={500}>Join queue</Typography>
        </Fab>
      </Box>
    </>
  );
};

export default Queue;
