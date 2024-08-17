import { IdentifiableQuestions } from "@interfaces/type";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Question from "./Question";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { compareQuestions } from "@utils/index";

interface BoardProps {
  questions: IdentifiableQuestions;
}

const SELECT_ALL = "All";

const _Board = (props: BoardProps) => {
  const questions = props.questions.sort(compareQuestions).reverse();

  if (questions.length === 0) {
    return (
      <Box
        paddingTop="200px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ color: "#625B71" }}
      >
        <p>No posts under this tag yet</p>
      </Box>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" rowGap="16px">
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </Box>
    );
  }
};

const Board = (props: BoardProps) => {
  const { questions } = props;
  const { course } = useOfficeHour();
  const topics = [SELECT_ALL, ...Object.keys(course.tags).sort()];

  const [selectedTopics, setSelectedTopics] = React.useState([SELECT_ALL]);

  const getQuestionsByTopic = (topics: string[]) => {
    if (topics.length === 0) {
      return [];
    } else if (topics.includes(SELECT_ALL)) {
      return questions;
    } else {
      return questions.filter((question) =>
        question.tags.find((tag) => topics.includes(tag))
      );
    }
  };

  const addOrRemoveTopic = (
    _e: React.MouseEvent<HTMLElement>,
    newTopics: string[]
  ) => {
    setSelectedTopics((currentSelectedTopics) => {
      if (currentSelectedTopics.includes(SELECT_ALL)) {
        return newTopics.filter((topic) => topic !== SELECT_ALL);
      } else if (newTopics.includes(SELECT_ALL)) {
        return [SELECT_ALL];
      } else {
        return newTopics;
      }
    });
  };
  return (
    <>
      <ToggleButtonGroup value={selectedTopics} onChange={addOrRemoveTopic}>
        <Stack
          columnGap="16px"
          direction="row"
          overflow="auto"
          paddingBottom="16px"
          marginBottom="16px"
          maxWidth="100vw"
        >
          {topics.map((topic) => (
            <ToggleButton
              id={topic}
              key={topic}
              value={topic}
              aria-label={topic}
              selected={selectedTopics.includes(topic)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#D7E3F8",
                  border: 0,
                },
                "@media (hover: none)": {
                  "&:hover": {
                    backgroundColor: `${
                      selectedTopics.includes(topic) ? "#D7E3F8" : "#FFF"
                    } !important`,
                  },
                },
              }}
            >
              <Box
                padding="4px 12px"
                color="#1D192B"
                whiteSpace="nowrap"
                minWidth="content"
                borderRadius="10px"
                textTransform="none"
                alignItems="center"
                justifyContent="center"
                columnGap="8px"
                borderColor="#73777F"
                display="flex"
                overflow="hidden"
              >
                <CheckIcon
                  sx={{
                    display: selectedTopics.includes(topic) ? "block" : "none",
                  }}
                />
                <label style={{ display: "block", fontWeight: "bold" }}>
                  {topic}
                </label>
              </Box>
            </ToggleButton>
          ))}
        </Stack>
      </ToggleButtonGroup>
      <_Board questions={getQuestionsByTopic(selectedTopics)} />
    </>
  );
};

export default Board;
