"use client";
import { Box } from "@mui/material";
import QuestionForm from "./form/QuestionForm";
import { defaultQuestion } from "@api/question";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { CustomFloatingButton } from "@components/buttons/CustomFloatingButton";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import { CustomModal } from "@components/CustomModal";
import { useRouter } from "next/navigation";

const CreateQuestion = () => {
  const { course } = useOfficeHour();
  const [isModalVisible, setisModalVisible] = React.useState(false);
  const router = useRouter();
  const ModalButtons = [
    {
      text: "Visit Piazza",
      onClick: () => {
        router.push("https://piazza.com/");
      },
    },
    {
      text: "Ok",
      onClick: () => setisModalVisible(false),
    },
  ];
  if (!course.isOpen) {
    return (
      <Box>
        <CustomFloatingButton
          text="Join queue"
          icon={<ArrowForwardOutlinedIcon />}
          onClick={() => {
            setisModalVisible(true);
          }}
        />
        <CustomModal
          title="Queue is currently closed"
          subtitle="Please wait until the TA is on duty or visit Piazza"
          open={isModalVisible}
          setOpen={setisModalVisible}
          buttons={ModalButtons}
        />
      </Box>
    );
  }
  const triggerButton = (
    <CustomFloatingButton
      text="Join queue"
      icon={<ArrowForwardOutlinedIcon />}
      onClick={() => {}}
    />
  );
  return (
    <Box>
      <QuestionForm
        triggerButton={triggerButton}
        title="Join queue"
        currentQuestion={defaultQuestion()}
      />
    </Box>
  );
};

export default CreateQuestion;
