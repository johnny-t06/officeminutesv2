import { Box, Stack, Typography } from "@mui/material";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { QuestionState } from "@interfaces/db";
import {
  getActiveQuestionsByState,
  sortQuestionsChronologically,
} from "@utils/index";
import QueueList from "./QueueList";
import { useCourseData } from "@hooks/useCourseData";

const Queue = () => {
  const { course, questions } = useOfficeHour();
  const {
    [QuestionState.PENDING]: pendingQuestions,
    [QuestionState.IN_PROGRESS]: inProgressQuestions,
  } = getActiveQuestionsByState(questions);

  const studentsEnqueued = pendingQuestions.length + inProgressQuestions.length;
  const queueClosed = course.onDuty.length === 0 || !course.isOpen;

  const { isUserTA } = useCourseData({ fetchUsers: false });

  return (
    <>
      <Box>
        <Stack spacing="36px" display={queueClosed ? "none" : "block"}>
          <QueueList
            header={isUserTA ? "Other TAs are helping" : "Currently Helping"}
            displayEnqueued={false}
            questions={sortQuestionsChronologically(inProgressQuestions)}
          />
          <QueueList
            header={isUserTA ? "Start helping" : "Queue"}
            displayEnqueued
            questions={sortQuestionsChronologically(pendingQuestions)}
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
    </>
  );
};

export default Queue;
