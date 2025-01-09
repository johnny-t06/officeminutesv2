"use client";

import MenuButton from "@components/buttons/MenuButton";
import Header from "@components/Header";
import CreateQuestion from "@components/queue/CreateQuestion";
import Queue from "@components/queue";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { getUserSessionOrRedirect, timeSince } from "@utils/index";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import Spinner from "@components/Spinner";
import theme from "theme";
import DisplayTas from "@components/tas";
import { QuestionDetails } from "@components/board/QuestionDetails";
import { getUsers } from "@services/client/user";
import { QuestionState } from "@interfaces/db";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { partialUpdateCourse } from "@services/client/course";

const Page = () => {
  const user = getUserSessionOrRedirect();
  const { course, questions } = useOfficeHour();
  const isUserTA = course.tas.includes(user.id);
  const [helpingQuestion, setHelpingQuestion] = React.useState<
    IdentifiableQuestion | undefined
  >(undefined);
  const [students, setStudents] = React.useState<IdentifiableUsers>([]);
  const [loading, setLoading] = React.useState(true);
  const [time, setTime] = React.useState(timeSince(helpingQuestion?.helpedAt));

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const helpingQuestion = questions.find(
          (question) =>
            question.helpedBy === user.id &&
            question.state === QuestionState.IN_PROGRESS
        );
        setHelpingQuestion(helpingQuestion);
        if (helpingQuestion) {
          setTime(timeSince(helpingQuestion.helpedAt));
          const studentData = await getUsers(helpingQuestion.group);
          setStudents(studentData);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questions]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeSince(helpingQuestion?.helpedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [helpingQuestion?.helpedAt]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spinner />
      </div>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap="18px"
      position="relative"
      paddingBottom="112px"
    >
      <Header
        leftIcon={<MenuButton isEdge />}
        title={course.name}
        alignCenter
      />
      {!helpingQuestion ? (
        <>
          {isUserTA ? (
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "initial",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingRight: 2.5,
                paddingLeft: 2.5,
                borderRadius: 4,
                position: "fixed",
                bottom: 70,
                right: 15,
                zIndex: 99,
              }}
              onClick={async () => {
                await partialUpdateCourse(course.id, {
                  isOpen: !course.isOpen,
                });
              }}
            >
              {course.isOpen ? <PauseIcon /> : <PlayArrowIcon />}
              <Box
                fontWeight={500}
                fontSize={16}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {course.isOpen ? "Close queue" : "Open queue"}
              </Box>
            </Button>
          ) : (
            <CreateQuestion />
          )}
          <Queue />
        </>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              width: "calc(100wh - 393px)",
              marginX: "-16px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.primary.light,
              paddingBlock: "16px",
            }}
          >
            <Typography>In-session</Typography>
            <Typography
              sx={{
                width: "4ch",
                textAlign: "center",
              }}
            >
              {time}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ fontWeight: "bold", marginTop: "20px" }}
          >
            Your Student(s)
          </Typography>
          <Box
            sx={{
              padding: "16px, 16px",
              maxHeight: "30vh",
              overflow: "auto",
            }}
          >
            <DisplayTas tas={students} />
          </Box>
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ fontWeight: "bold", marginTop: "20px", marginBottom: "20px" }}
          >
            Question
          </Typography>
          <QuestionDetails
            question={helpingQuestion}
            courseId={course.id}
            fromCurrentlyHelping
          />
        </Box>
      )}
    </Box>
  );
};

export default Page;
