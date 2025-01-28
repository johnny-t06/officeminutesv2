import { Box, Button, Container } from "@mui/material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import { CustomModal } from "@components/CustomModal";
import { leaveQuestionGroup } from "@services/client/question";
import QuestionForm from "./form/QuestionForm";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import TaCard from "@components/tas/TaCard";
import { useCourseData } from "@hooks/useCourseData";
import Spinner from "@components/Spinner";
import { QuestionDetails } from "@components/board/QuestionDetails";
import { IdentifiableQuestion } from "@interfaces/type";
import { QuestionState } from "@interfaces/db";
import { StudentHelping } from "./StudentHelping";
import { StudentMissing } from "./StudentMissing";

interface editQuestionProps {
  queuePos: number;
  groupPos: number;
  currQuestion: IdentifiableQuestion;
  groupQuestion: IdentifiableQuestion;
}

export const EditQuestion = (props: editQuestionProps) => {
  const { queuePos, groupPos, currQuestion, groupQuestion } = props;
  const { course } = useOfficeHour();
  const { tas, loading } = useCourseData({
    fetchUsers: true,
  });
  const user = useUserOrRedirect();
  if (!user) {
    return null;
  }

  const [leaveQueueModal, setLeaveQueueModal] = React.useState<boolean>(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spinner />
      </div>
    );
  }

  if (currQuestion.state === QuestionState.IN_PROGRESS) {
    const ta = tas.find((myTa) => myTa.id === currQuestion.helpedBy);
    return (
      <StudentHelping currQuestion={currQuestion} course={course} ta={ta!} />
    );
  }
  if (currQuestion.state === QuestionState.MISSING) {
    return <StudentMissing currQuestion={currQuestion} course={course} />;
  }

  const leaveQueue = () => {
    leaveQuestionGroup(currQuestion, course.id, user.id);
    setLeaveQueueModal(false);
  };
  const leaveGroup = () => {
    leaveQuestionGroup(groupQuestion, course.id, user.id);
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
      {position === queuePos && (
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
        <Box sx={{ fontWeight: 700, fontSize: position === 0 ? 35 : 55 }}>
          {position === 0 ? "You're Next!" : position}
        </Box>
        {position !== 0 && (
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
              onClick={() =>
                position === queuePos ? setLeaveQueueModal(true) : leaveGroup()
              }
            >
              <KeyboardReturnOutlinedIcon style={{ fontSize: "14px" }} />
              {position === queuePos ? (
                <Box>Leave queue</Box>
              ) : (
                <Box>Leave group</Box>
              )}
            </Button>
          </Box>
          {position === queuePos && (
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
