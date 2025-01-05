"use client";

import Board from "@components/board";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box, Button, Typography } from "@mui/material";
import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import { getActiveQuestions, getUserSessionOrRedirect } from "@utils/index";
import Link from "next/link";

import React from "react";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const { courseId } = props.params;
  const user = getUserSessionOrRedirect();
  const { questions } = useOfficeHour();
  const activeQuestions = getActiveQuestions(questions);

  const [loading, setLoading] = React.useState(true);
  const [isUserTA, setIsUserTA] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourse(courseId);
        const tasData = await getUsers(courseData.tas);
        setIsUserTA(tasData.some((ta) => ta.id === user.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

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
