"use client";
import Board from "@components/board";
import Header from "@components/Header";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getExpiredQuestions } from "@utils/index";
import { getQuestions } from "@services/client/question";
import Link from "next/link";
import React from "react";
import { IdentifiableQuestions } from "@interfaces/type";
import { useLoading } from "@context/LoadingContext";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const { courseId } = props.params;
  const { course } = useOfficeHour();
  const { setLoading } = useLoading();
  const [expiredQuestions, setExpiredQuestions] =
    React.useState<IdentifiableQuestions>([]);
  const user = useUserOrRedirect();

  React.useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const allQuestions = await getQuestions(courseId);
      const expiredQuestions = getExpiredQuestions(allQuestions);
      setExpiredQuestions(expiredQuestions);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  if (!user) {
    return null;
  }

  const isUserTA = course.tas.includes(user.id);

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
