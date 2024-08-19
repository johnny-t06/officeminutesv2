"use client";

import Header from "@components/Header";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useRouter } from "next/navigation";
import { getCourses, updateCourse } from "services/client/course";
import { useUserSession } from "@context/UserSessionContext";
import { updateUser } from "@services/client/user";

const Page = () => {
  const router = useRouter();
  const { user } = useUserSession();

  const [code, setCode] = React.useState("");
  const [enrolledError, setEnrolledError] = React.useState(false);
  const [notFoundError, setNotFoundError] = React.useState(false);

  const joinClicked = () => {
    try {
      if (code.length < 6 || code.length > 8) {
        return;
      }

      getCourses().then(async (courses) => {
        const course = courses.find((course) => course.code === code);

        if (course && user) {
          if (
            course.students.includes(user.id) ||
            user.courses.includes(course.id)
          ) {
            setEnrolledError(true);
            return;
          }

          course.students.push(user.id);
          await updateCourse(course);

          user.courses.push(course.id);
          await updateUser(user);

          router.push(`/private/course/${course.id}`);
        } else {
          setNotFoundError(true);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const errorModal = (
    title: string,
    subtitle: string,
    open: boolean,
    setOpen: (open: boolean) => void
  ) => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            width: "75%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#ECEDF4",
            boxShadow: 24,
            px: 3,
            py: 4,
            borderRadius: "28px",
          }}
        >
          <Typography id="transition-modal-title" variant="h5" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {subtitle}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "36px",
              gap: "24px",
            }}
          >
            <Button style={{ textTransform: "none", padding: 0, minWidth: 0 }}>
              <Typography color="#38608F" fontWeight={500}>
                Visit Piazza
              </Typography>
            </Button>
            <Button
              style={{ textTransform: "none", padding: 0, minWidth: 0 }}
              onClick={() => setOpen(false)}
            >
              <Typography color="#38608F" fontWeight={500}>
                OK
              </Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );

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
              code.length < 6 || code.length > 8
                ? "bg-[#BCC6D4] cursor-not-allowed"
                : "bg-[#38608F] cursor-pointer"
            }`}
            onClick={joinClicked}
            disabled={code.length < 6 || code.length > 8}
          >
            <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
              Join
            </Typography>
          </Button>
        }
      />
      <div className="mx-4 mt-12">
        <div>
          Ask your TA or professor for the class code, then enter it here.
        </div>
        <TextField
          label="Class code"
          variant="outlined"
          className="w-full mt-4"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          autoComplete="off"
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
      </div>
      {errorModal(
        "Already enrolled",
        "You are already enrolled in this course!",
        enrolledError,
        setEnrolledError
      )}
      {errorModal(
        "Class not found",
        "No class with that class code",
        notFoundError,
        setNotFoundError
      )}
    </div>
  );
};

export default Page;
