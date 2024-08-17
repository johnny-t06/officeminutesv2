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
import { useAuth } from "@hooks";

const Page = () => {
  const router = useRouter();
  const { currUser } = useAuth();

  const [code, setCode] = React.useState("");
  const [errorModal, setErrorModal] = React.useState(false);

  const joinClicked = () => {
    if (code.length < 6 || code.length > 8) {
      alert("Please input a code of 6-8 characters");
    }

    getCourses().then(async (courses) => {
      const course = courses.find((course) => course.code === code);

      if (course && currUser) {
        console.log("course found!");

        course.students.push(currUser.uid);
        await updateCourse(course);

        // currUser.courses.push(course.id);
      } else {
        console.log("course not found!");
      }
    });
  };

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
            style={{ textTransform: "none" }}
            className="py-2.5 px-6 bg-[#38608F] rounded-full"
            onClick={() => setErrorModal(true)}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={errorModal}
        onClose={() => setErrorModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={errorModal}>
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
              Class not found
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              No class with that class code
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "36px",
                gap: "24px",
              }}
            >
              <Button
                style={{ textTransform: "none", padding: 0, minWidth: 0 }}
              >
                <Typography color="#38608F" fontWeight={500}>
                  Visit Piazza
                </Typography>
              </Button>
              <Button
                style={{ textTransform: "none", padding: 0, minWidth: 0 }}
                onClick={() => setErrorModal(false)}
              >
                <Typography color="#38608F" fontWeight={500}>
                  OK
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Page;
