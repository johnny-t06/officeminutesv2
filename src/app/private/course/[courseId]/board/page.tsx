"use client";
import Board from "@components/board";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box, Button, Typography } from "@mui/material";
import { addQuestion } from "@services/client/question";
import { getActiveQuestions } from "@utils/index";
import Link from "next/link";

import React from "react";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const { courseId } = props.params;
  const { questions } = useOfficeHour();
  const activeQuestions = getActiveQuestions(questions);

  return (
    <Box>
      <Header
        title="Board"
        rightIcon={
          <Link href={`/private/course/${courseId}/board/history`}>
            <Button
              style={{
                textTransform: "none",
                padding: 0,
              }}
            >
              <Typography variant="subtitle2">View History</Typography>
            </Button>
          </Link>
        }
      />
      <Board questions={activeQuestions} />
    </Box>
  );
};

export default Page;
