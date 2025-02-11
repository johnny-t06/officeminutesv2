"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import { CustomModal } from "@components/CustomModal";
import { leaveQuestionGroup } from "@services/client/question";
import QuestionForm from "./form/QuestionForm";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { getUsers } from "@services/client/user";
import { useLoading } from "@context/LoadingContext";
import { QuestionState } from "@interfaces/db";
import { StudentHelping } from "./StudentHelping";
import { StudentMissing } from "./StudentMissing";

interface EditQuestionProps {
  queuePos: number;
  groupPos: number;
  currQuestion: IdentifiableQuestion;
  groupQuestion: IdentifiableQuestion;
}

export const EditQuestion = (props: EditQuestionProps) => {
  const { queuePos, groupPos, currQuestion, groupQuestion } = props;
  const { course } = useOfficeHour();
  const [tas, setTas] = React.useState<IdentifiableUsers>([]);
  const [leaveQueueModal, setLeaveQueueModal] = React.useState<boolean>(false);
  const { setLoading } = useLoading();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const tasData = await getUsers(course.tas);
      setTas(tasData);
      setLoading(false);
    };
    fetchData();
  }, [course]);

  const user = useUserOrRedirect();

  if (!user || tas.length === 0) {
    return null;
  }

  const leaveQueue = async () => {
    await leaveQuestionGroup(currQuestion, course.id, user.id);
    setLeaveQueueModal(false);
  };
  const leaveGroup = async () => {
    await leaveQuestionGroup(groupQuestion, course.id, user.id);
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

  // not in queue, not join any question,
  // and not have any IN_PROGRESS or MISSING question
  if (queuePos === -1 && groupPos === -1 && currQuestion.title === "") {
    return null;
  }

  const position =
    queuePos === -1
      ? groupPos
      : groupPos === -1
      ? queuePos
      : Math.min(queuePos, groupPos);

  const isAuthor = position === queuePos;

  if (currQuestion.state === QuestionState.IN_PROGRESS) {
    const ta = tas.find((myTa) => myTa.id === currQuestion.helpedBy);

    if (!ta) {
      return null;
    }

    return <StudentHelping currQuestion={currQuestion} ta={ta} />;
  }
  if (currQuestion.state === QuestionState.MISSING) {
    return <StudentMissing currQuestion={currQuestion} />;
  }

  return (
    <>
      {isAuthor && (
        <CustomModal
          title="Leave queue?"
          subtitle="You'll lose your place in line and
                  won't receive assistance until you join again."
          buttons={leaveQueueButtons}
          open={leaveQueueModal}
          setOpen={setLeaveQueueModal}
        />
      )}

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
        <Typography
          sx={{ fontWeight: 400, fontSize: "16px", color: "#545F70" }}
        >
          Your queue position
        </Typography>
        <Typography
          sx={{ fontWeight: 700, fontSize: "45px", textAlign: "center" }}
        >
          {position === 0 ? "You're next!" : position + 1}
        </Typography>

        <Box
          sx={{
            fontWeight: 400,
            fontSize: 12,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            color: "#545F70",
            alignItems: "center",
          }}
        >
          <NotificationAddOutlinedIcon style={{ fontSize: "16px" }} />
          <Typography sx={{ fontSize: "16px" }}>
            We'll notify you when it's your turn
          </Typography>
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
              onClick={() =>
                isAuthor ? setLeaveQueueModal(true) : leaveGroup()
              }
            >
              <KeyboardReturnOutlinedIcon style={{ fontSize: "14px" }} />
              {isAuthor ? "Leave queue " : "Leave group"}
            </Button>
          </Box>
          {isAuthor && (
            <Box sx={{ flexGrow: 1 }}>
              <QuestionForm
                triggerButton={editButton}
                title="Edit submission"
                currentQuestion={currQuestion}
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};
