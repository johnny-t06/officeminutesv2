"use client";
import Board from "@components/board";
import Header from "@components/Header";
import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getExpiredQuestions } from "@utils/index";
import { useOfficeHourStore } from "@stores/useOfficeHourStore";
import Link from "next/link";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const { courseId } = props.params;
  const { questions } = useOfficeHourStore();
  const expiredQuestions = getExpiredQuestions(questions);

  return (
    <Box>
      <Header
        leftIcon={
          <Link href={`/private/course/${courseId}/board`}>
            <ArrowBack sx={{ marginRight: "10px", color: "#000" }} />
          </Link>
        }
        title="History"
      />
      <Typography
        variant="body1"
        marginBottom="8px"
        color="#625B71"
        fontWeight={400}
      >
        Posts will be permanently deleted after 3 weeks
      </Typography>
      <Board questions={expiredQuestions} />
    </Box>
  );
};

export default Page;
