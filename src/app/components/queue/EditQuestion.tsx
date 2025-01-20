import { Box, Button, Container } from "@mui/material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { getQueuePosition, getUserSessionOrRedirect } from "@utils/index";
import React from "react";
import { CustomModal } from "@components/CustomModal";
import { deleteQuestion } from "@services/client/question";
import QuestionForm from "./form/QuestionForm";

export const EditQuestion = () => {
  const { course, questions } = useOfficeHour();
  const user = getUserSessionOrRedirect();
  if (!user) {
    return null;
  }
  const { queuePos, currQuestion } = getQueuePosition(questions, user);
  const [leaveQueueModal, setLeaveQueueModal] = React.useState<boolean>(false);
  if (queuePos === -1) {
    return null;
  }
  const leaveQueue = () => {
    deleteQuestion(course.id, currQuestion.id);
    setLeaveQueueModal(false);
  };

  const leaveQueueButtons = [
    {
      text: "Stay",
      onClick: () => setLeaveQueueModal(false),
    },
    {
      text: "Leave",
      onClick: leaveQueue,
    },
  ];

  const editButton = (
    <Button
      sx={{
        fontWeight: 500,
        fontSize: 14,
        textTransform: "initial",
        borderRadius: "100px",
        flexGrow: 1,
      }}
      fullWidth
      variant="outlined"
    >
      Edit submission
    </Button>
  );

  return (
    <>
      <CustomModal
        title="Leave queue?"
        subtitle="You'll lose your place in line and 
                  won't receive assistance until you join again."
        buttons={leaveQueueButtons}
        open={leaveQueueModal}
        setOpen={setLeaveQueueModal}
      />

      <Container
        sx={{
          bgcolor: "primary.light",
          padding: "16px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          rowGap: "12px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box sx={{ fontWeight: 700, fontSize: queuePos === 0 ? 35 : 55 }}>
          {queuePos === 0 ? "You're Next!" : queuePos}
        </Box>
        {queuePos !== 0 && (
          <Box sx={{ fontWeight: 500, fontSize: 10, color: "#545F70" }}>
            Queues ahead of you
          </Box>
        )}
        <Box
          sx={{
            fontWeight: 400,
            fontSize: 12,
            display: "flex",
            flexDirection: "row",
            columnGap: 0.5,
            color: "#545F70",
          }}
        >
          <NotificationAddOutlinedIcon style={{ fontSize: "16px" }} />
          <Box> We'll notify you when it's your turn</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 1,
            columnGap: "8px",
            fontWeight: 500,
            fontSize: "14px",
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="contained"
              sx={{
                fontWeight: 500,
                fontSize: 14,
                textTransform: "initial",
                borderRadius: "100px",
                display: "flex",
                flexDirection: "row",
                columnGap: 1,
              }}
              style={{ boxShadow: "none" }}
              fullWidth
              onClick={() => setLeaveQueueModal(true)}
            >
              <KeyboardReturnOutlinedIcon style={{ fontSize: "14px" }} />
              <Box>Leave queue</Box>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <QuestionForm
              triggerButton={editButton}
              title="Edit submission"
              currentQuestion={currQuestion}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
