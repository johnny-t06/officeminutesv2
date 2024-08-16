"use client";
import Board from "@components/board";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box, Button, Typography } from "@mui/material";
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

  const addOrRemoveTopic = (topic: string) => {
    setSelectedTopics((topics) => {
      if (topics.includes(topic)) {
        return topics.filter((other) => other !== topic);
      } else if (topic === SELECT_ALL) {
        return [SELECT_ALL];
      } else {
        return [...topics.filter((other) => other !== SELECT_ALL), topic];
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
      <Box display="flex" columnGap="16px" overflow="auto" paddingBottom="16px">
        {topics.map((topic) => (
          <Button
            key={topic}
            sx={{
              flexShrink: 0,
              padding: "4px 12px",
              color: "#1D192B",
              whiteSpace: "nowrap",
              minWidth: "content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: selectedTopics.includes(topic) ? "#D7E3F8" : "",
              columnGap: "8px",
              textTransform: "none",
              border: selectedTopics.includes(topic) ? 0 : 1,
              borderColor: "#73777F",
              borderRadius: "10px",
            }}
            onClick={() => addOrRemoveTopic(topic)}
          >
            <CheckIcon
              sx={{
                display: selectedTopics.includes(topic) ? "block" : "none",
              }}
            />
            <label style={{ display: "block", fontWeight: "bold" }}>
              {topic}
            </label>
          </Button>
        ))}
      </Box>
      <Board questions={getQuestionsByTopic(selectedTopics)} />
    </Box>
  );
};

export default Page;
