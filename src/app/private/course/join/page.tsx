"use client";

import Header from "@components/Header";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useRouter } from "next/navigation";
import { getCourseByCode, joinCourse } from "services/client/course";
import { useUserSession } from "@context/UserSessionContext";
import { CustomModal } from "@components/CustomModal";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";

const Page = () => {
  const router = useRouter();
  const { setUser } = useUserSession();
  const user = useUserOrRedirect();

  const [code, setCode] = React.useState("");
  const [enrolledError, setEnrolledError] = React.useState(false);
  const [notFoundError, setNotFoundError] = React.useState(false);

  const EnrolledButtons = [
    {
      text: "Ok",
      onClick: () => {
        setEnrolledError(false);
      },
    },
  ];

  const NotFoundButtons = [
    {
      text: "Visit Piazza",
      onClick: () => {
        router.push("https://piazza.com");
      },
    },
    {
      text: "Ok",
      onClick: () => {
        setNotFoundError(false);
      },
    },
  ];

  const joinClicked = async () => {
    try {
      if (code.length < 6 || code.length > 8) {
        return;
      }

      const course = await getCourseByCode(code);
      if (course && user) {
        if (
          course.students.includes(user.id) ||
          user.courses.includes(course.id)
        ) {
          setEnrolledError(true);
          return;
        }

        await joinCourse(course.id, user.id);
        router.push(`/private/course/${course.id}`);
        setUser({ ...user, courses: [...user.courses, course.id] });
      } else {
        setNotFoundError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { fetching, fn: throttledJoinClicked } = useApiThrottle({
    fn: joinClicked,
  });
  const joinDisabled =
    code.length < 6 ||
    code.length > 8 ||
    fetching ||
    enrolledError ||
    notFoundError;

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header
        leftIcon={
          <IconButton onClick={() => router.push("/private/course")}>
            <CloseIcon />
          </IconButton>
        }
        title="Join class"
        rightIcon={
          <Button
            className={`py-2.5 px-6 rounded-full mr-2 normal-case ${
              joinDisabled
                ? "bg-[#BCC6D4] cursor-not-allowed"
                : "bg-[#38608F] cursor-pointer"
            }`}
            onClick={throttledJoinClicked}
            disabled={joinDisabled}
          >
            <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
              Join
            </Typography>
          </Button>
        }
      />
      <Box className="mx-4 mt-12" sx={{ boxSizing: "none" }}>
        <Box>
          Ask your TA or professor for the class code, then enter it here.
        </Box>
        <TextField
          label="Class code"
          variant="outlined"
          className="w-full mt-4"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          autoComplete="off"
          InputProps={{
            style: {
              height: 54,
            },
          }}
        />
        <ul className="ps-5 text-[#545F70]">
          <li>
            Use a class code with 6-8 letters or numbers and no spaces or
            symbols
          </li>
          <li>
            If you have trouble joining a class, visit{" "}
            <span className="underline text-[#38608F]">Piazza</span>
          </li>
        </ul>
      </Box>
      <CustomModal
        title="Already enrolled"
        subtitle="You are already enrolled in this course!"
        buttons={EnrolledButtons}
        open={enrolledError}
        setOpen={setEnrolledError}
      />
      <CustomModal
        title="Class not found"
        subtitle="No class with that class code"
        buttons={NotFoundButtons}
        open={notFoundError}
        setOpen={setNotFoundError}
      />
    </div>
  );
};

export default Page;
