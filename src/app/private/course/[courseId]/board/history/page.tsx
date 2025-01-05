"use client";
import Board from "@components/board";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
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
  const user = getUserSessionOrRedirect();
  const { questions } = useOfficeHour();
  const expiredQuestions = getExpiredQuestions(questions);

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
