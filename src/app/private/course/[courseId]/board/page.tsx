"use client";

import Board from "@components/board";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useCourseData } from "@hooks/useCourseData";
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
  const { questions } = useOfficeHour();
  const activeQuestions = getActivePublicQuestion(questions);
  const { loading, isUserTA } = useCourseData({ fetchUsers: false });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spinner />
      </div>
    );
  }

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
