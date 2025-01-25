"use client";

import Board from "@components/board";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { Box, Button, Typography } from "@mui/material";
import { getActivePublicQuestion } from "@utils/index";
import Link from "next/link";

import React from "react";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const { courseId } = props.params;

  const { course, questions } = useOfficeHour();
  const user = useUserOrRedirect();
  if (!user) {
    return null;
  }
  const isUserTA = course.tas.includes(user.id);
  const activeQuestions = getActivePublicQuestion(questions);

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
              <Typography variant="subtitle2">
                View {isUserTA ? "Response" : null} History
              </Typography>
            </Button>
          </Link>
        }
      />

      <Board questions={activeQuestions} isUserTA={isUserTA} />
    </Box>
  );
};

export default Page;
