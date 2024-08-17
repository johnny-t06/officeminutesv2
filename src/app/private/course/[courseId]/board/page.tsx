"use client";
import Board from "@components/board";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import React from "react";

interface PageProps {
  params: {
    courseId: string;
  };
}

const SELECT_ALL = "All";

const Page = (props: PageProps) => {
  const { course, questions } = useOfficeHour();
  const [selectedTopics, setSelectedTopics] = React.useState([SELECT_ALL]);

  const topics = [SELECT_ALL, ...Object.keys(course.tags).sort()];

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
    <Box>
      <Header
        title="Board"
        rightIcon={
          <Button
            style={{
              textTransform: "none",
              padding: 0,
            }}
          >
            <Typography variant="subtitle2">View History</Typography>
          </Button>
        }
      />
      <ToggleButtonGroup value={selectedTopics} onChange={addOrRemoveTopic}>
        <Stack
          spacing="16px"
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
      <Board questions={getQuestionsByTopic(selectedTopics)} />
    </Box>
  );
};

export default Page;
