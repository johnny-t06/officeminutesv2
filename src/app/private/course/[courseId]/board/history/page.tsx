"use client";
import Board from "@components/board";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getExpiredQuestions, getUserSessionOrRedirect } from "@utils/index";
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
  const user = getUserSessionOrRedirect();
  const isUserTA = course.tas.includes(user.id);
  const expiredQuestions = getExpiredQuestions(questions);

  return (
    <Box>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/board`}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
        title={isUserTA ? "Response History" : "History"}
      />
      <Typography
        variant="body1"
        marginBottom="8px"
        color="#625B71"
        fontWeight={400}
      >
        Posts will be permanently deleted after 3 weeks
      </Typography>
      <Board questions={expiredQuestions} isUserTA={isUserTA} />
    </Box>
  );
};

export default Page;
